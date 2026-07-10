import { supabase } from './supabase';
// ==========================================
// 1. SERVICES UTK DATA MASTER & UTILITY
// ==========================================

/**
 * Mengambil semua departemen (Subbag) beserta pilihan keluhannya (Help Topics).
 * Digunakan untuk chained dropdown di form pengajuan tiket frontend.
 */
export const getDepartmentsAndTopics = async () => {
  const { data, error } = await supabase
    .from('departments')
    .select(`
      id,
      name,
      help_topics (
        id,
        topic_name
      )
    `);

  if (error) {
    console.error('Gagal mengambil data master departemen:', error.message);
    return null;
  }
  return data;
};


// ==========================================
// 2. SERVICES UNTUK MANAJEMEN TIKET (CRUD)
// ==========================================

interface CreateTicketInput {
  clientId: string;      // ID User pembimbing/pelapor (UUID dari auth.users)
  departmentId: number;  // ID Subbag terpilih
  helpTopicId: number;   // ID Topik keluhan terpilih
  subject: string;       // Judul keluhan singkat
}

/**
 * Membuat tiket baru di awal.
 * Status otomatis ter-set sebagai 'submit' di database.
 */
export const createTicket = async (ticketData: CreateTicketInput) => {
  const { data, error } = await supabase
    .from('tickets')
    .insert([
      {
        client_id: ticketData.clientId,
        department_id: ticketData.departmentId,
        help_topic_id: ticketData.helpTopicId,
        subject: ticketData.subject,
        status: 'submit' // default awal
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Gagal membuat tiket baru:', error.message);
    throw error;
  }
  return data;
};

/**
 * Mengambil daftar tiket milik USER tertentu (untuk Dashboard Mahasiswa/Pegawai).
 * Di-filter berdasarkan client_id agar aman.
 */
export const getUserTickets = async (clientId: string) => {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      id,
      ticket_number,
      subject,
      status,
      created_at,
      departments(name),
      help_topics(topic_name)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Gagal mengambil tiket user:', error.message);
    return [];
  }
  return data;
};

/**
 * Mengambil SEMUA tiket yang masuk ke sistem (untuk Dashboard Admin).
 */
export const getAdminTickets = async () => {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      id,
      ticket_number,
      subject,
      status,
      created_at,
      profiles!tickets_client_id_fkey(full_name, nim_nip, unit),
      departments(name),
      help_topics(topic_name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Gagal mengambil semua tiket admin:', error.message);
    return [];
  }
  return data;
};

/**
 * Mengubah status tiket dan menunjuk admin penanggung jawab.
 * Digunakan ketika admin klik "Accept", "Resolved", atau "Closed".
 */
export const updateTicketStatus = async (
  ticketId: string,
  newStatus: 'submit' | 'accepted' | 'in progress' | 'resolved' | 'closed',
  agentId?: string // Diisi UUID admin saat status berubah jadi 'accepted'
) => {
  const updatePayload: any = { 
    status: newStatus,
    updated_at: new Date().toISOString()
  };
  
  if (agentId) {
    updatePayload.agent_id = agentId;
  }

  const { data, error } = await supabase
    .from('tickets')
    .update(updatePayload)
    .eq('id', ticketId)
    .select()
    .single();

  if (error) {
    console.error('Gagal mengupdate status tiket:', error.message);
    throw error;
  }
  return data;
};


// ==========================================
// 3. SERVICES UNTUK FITUR UTAS / DISCUSSION (MESSAGES)
// ==========================================

/**
 * Mengambil seluruh riwayat chat/tanggapan berdasarkan ID Tiket tertentu.
 */
export const getTicketMessages = async (ticketId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id,
      message,
      created_at,
      sender_id,
      profiles(full_name, role_id(role_name))
    `)
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true }); // Diurutkan dari yang paling lama ke baru

  if (error) {
    console.error('Gagal mengambil riwayat pesan:', error.message);
    return [];
  }
  return data;
};

/**
 * Mengirim pesan baru ke dalam utas tiket.
 * Bisa berupa deskripsi kendala awal dari user atau balasan dari admin.
 */
export const sendTicketMessage = async (
  ticketId: string,
  senderId: string,
  messageText: string
) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        ticket_id: ticketId,
        sender_id: senderId,
        message: messageText
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Gagal mengirim pesan:', error.message);
    throw error;
  }
  return data;
};