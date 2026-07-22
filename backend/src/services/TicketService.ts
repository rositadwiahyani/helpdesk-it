import { supabase } from '../config/supabase';

// ============================================================================
// 1. INTERFACE & TYPES (DISESUAIKAN DENGAN SKEMA POSTGRES & PROPOSAL)
// ============================================================================

export type ReporterType = 'Mahasiswa' | 'Dosen' | 'Tendik' | 'Alumni' | 'Masyarakat';
export type PriorityType = 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
export type TicketStatusType = 'OPEN' | 'Diproses' | 'Selesai/close' | 'Ditolak/Dibatalkan' | 'Dibuka Kembali/Reopen';

export interface CreateTicketWAInput {
  phone: string;
  reporter_name: string;
  reporter_type: ReporterType;
  nim_nip?: string | null;
  unit?: string | null;
  dept_id?: number | null;
  category_id?: number | null;
  subject?: string | null;
  description: string;
  attachment?: string | null;
  priority?: PriorityType;
}

export interface TicketFilterOptions {
  dept_id?: number | null;
  status?: TicketStatusType;
  priority?: PriorityType;
  tech_id?: string;
  search?: string;
}

// ============================================================================
// 2. DATA MASTER (DEPARTEMEN & KATEGORI)
// ============================================================================

/**
 * Mengambil master data departemen (subbag) beserta kategori layanannya.
 * Dipakai untuk menu bot WhatsApp maupun dropdown filter di Dashboard Staf.
 */
export const getDepartmentsAndCategories = async () => {
  const { data, error } = await supabase
    .from('departments')
    .select(`
      id,
      name,
      categories (
        id,
        name
      )
    `);

  if (error) {
    console.error('Gagal mengambil master departemen & kategori:', error.message);
    throw error;
  }
  return data;
};

// ============================================================================
// 3. GENERATOR NOMOR TIKET OTOMATIS (Sesuai Proposal)
// ============================================================================

/**
 * Menggenerasi nomor tiket unik berdasarkan tanggal harian (contoh: T-20260721-001)
 */
export const generateTicketNumber = async (): Promise<string> => {
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  const dateStr = today.replace(/-/g, '');

  // Ambil atau update nomor urut harian di tabel daily_ticket_seq
  const { data: seqData } = await supabase
  .from('daily_ticket_seq')
  .select('last_seq')
  .eq('date', today)
  .maybeSingle();

  let nextSeq = 1;

  if (seqData) {
    nextSeq = seqData.last_seq + 1;
    await supabase
      .from('daily_ticket_seq')
      .update({ last_seq: nextSeq })
      .eq('date', today);
  } else {
    await supabase
      .from('daily_ticket_seq')
      .insert([{ date: today, last_seq: nextSeq }]);
  }

  const paddedSeq = String(nextSeq).padStart(3, '0');
  return `T-${dateStr}-${paddedSeq}`;
};

// ============================================================================
// 4. MANAJEMEN TIKET (CREATION & READ)
// ============================================================================

/**
 * Membuat tiket baru dari alur percakapan WhatsApp (Tanpa Login Pelapor)
 */
export const createTicketFromWA = async (input: CreateTicketWAInput) => {
  try {
    const ticketNum = await generateTicketNumber();

    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          ticket_num: ticketNum,
          phone: input.phone,
          reporter_name: input.reporter_name,
          reporter_type: input.reporter_type || 'Masyarakat',
          nim_nip: input.nim_nip || null,
          unit: input.unit || null,
          dept_id: input.dept_id || null,
          category_id: input.category_id || null,
          subject: input.subject || `Keluhan via WA oleh ${input.reporter_name}`,
          description: input.description,
          attachment: input.attachment || null,
          priority: input.priority || 'Sedang',
          status: 'OPEN'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Catat ke Audit Log Tiket
    await supabase.from('ticket_logs').insert([
      {
        ticket_id: data.id,
        action: 'CREATED_VIA_WA',
        notes: `Tiket otomatis dibuat via WhatsApp oleh ${input.reporter_name}`
      }
    ]);

    return data;
  } catch (error: any) {
    console.error('Gagal membuat tiket baru:', error.message);
    throw error;
  }
};

/**
 * Cek status tiket berdasarkan Nomor Tiket / Kode Tracking (Untuk Pelapor via WA / Web Track)
 */
export const getTicketByNum = async (ticketNum: string) => {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      *,
      departments(name),
      categories(name)
    `)
    .eq('ticket_num', ticketNum.toUpperCase().trim())
    .single();

  if (error) {
    console.warn(`Tiket dengan nomor ${ticketNum} tidak ditemukan:`, error.message);
    return null;
  }
  return data;
};

/**
 * Mengambil daftar tiket untuk Dashboard Staf (Filter sesuai RBAC & Departemen)
 */
export const getTicketsForDashboard = async (
  staffDeptId?: number | null,
  filters?: TicketFilterOptions
) => {
  let query = supabase
    .from('tickets')
    .select(`
      *,
      departments(name),
      categories(name),
      staff_profiles:tech_id(id, name, role)
    `)
    .order('created_at', { ascending: false });

  // Filter berdasarkan Departemen (Staf Operator/Teknisi hanya melihat unitnya)
  if (staffDeptId) {
    query = query.eq('dept_id', staffDeptId);
  }

  // Filter Tambahan (Status, Prioritas, Pencarian)
  if (filters?.status) query = query.eq('status', filters.status);
  if (filters?.priority) query = query.eq('priority', filters.priority);
  if (filters?.tech_id) query = query.eq('tech_id', filters.tech_id);
  if (filters?.search) {
    query = query.or(`ticket_num.ilike.%${filters.search}%,reporter_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Gagal mengambil daftar tiket dashboard:', error.message);
    return [];
  }
  return data;
};

// ============================================================================
// 5. UPDATE TIKET, DISPOSISI & PENANGANAN (STAF & ADMIN)
// ============================================================================

/**
 * Update Status / Disposisi Teknisi / Prioritas oleh Staf Internal
 */
export const updateTicketByStaff = async (
  ticketId: string,
  staffUserId: string,
  payload: {
    status?: TicketStatusType;
    tech_id?: string | null;
    priority?: PriorityType;
    category_id?: number | null;
    dept_id?: number | null;
  },
  actionNote?: string
) => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .update({
        ...payload,
        updated_at: new Date().toISOString()
      })
      .eq('id', ticketId)
      .select()
      .single();

    if (error) throw error;

    // Catat Audit Log
    await supabase.from('ticket_logs').insert([
      {
        ticket_id: ticketId,
        actor_id: staffUserId,
        action: payload.status ? `STATUS_CHANGED_${payload.status}` : 'TICKET_UPDATED',
        notes: actionNote || `Memperbarui data tiket.`
      }
    ]);

    return data;
  } catch (error: any) {
    console.error('Gagal memperbarui data tiket:', error.message);
    throw error;
  }
};

// ============================================================================
// 6. UTAS PESAN & KOMUNIKASI (DASHBOARD <-> WHATSAPP)
// ============================================================================

/**
 * Mengambil riwayat percakapan tiket
 */
export const getTicketMessages = async (ticketId: string) => {
  const { data, error } = await supabase
    .from('ticket_messages')
    .select(`
      id,
      sender_type,
      message,
      attachment,
      created_at,
      staff_profiles:sender_id(name, role)
    `)
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Gagal mengambil riwayat pesan tiket:', error.message);
    return [];
  }
  return data;
};

/**
 * Mengirim balasan dari Staf di Dashboard ke Tiket
 */
export const sendStaffResponse = async (
  ticketId: string,
  staffUserId: string,
  messageText: string,
  attachmentUrl?: string
) => {
  const { data, error } = await supabase
    .from('ticket_messages')
    .insert([
      {
        ticket_id: ticketId,
        sender_type: 'STAFF',
        sender_id: staffUserId,
        message: messageText,
        attachment: attachmentUrl || null
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Gagal mengirim balasan staf:', error.message);
    throw error;
  }
  return data;
};