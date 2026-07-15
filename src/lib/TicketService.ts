import { supabase } from './supabase';

// 1. SERVICES: DATA MASTER & UTILITY

/**
 * Mengambil semua data departemen (Subbag) beserta pilihan topik keluhannya.
 * Digunakan untuk menangani chained dropdown pada form pengajuan tiket di frontend.
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

/**
 * Mengunggah file bukti/lampiran kendala ke Supabase Storage Bucket.
 * @param file - Objek file yang dipilih dari input file frontend
 * @returns String URL publik dari file yang berhasil diunggah
 */
export const uploadTicketAttachment = async (file: File) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('attachments')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('attachments')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error: any) {
    console.error('Gagal upload lampiran:', error.message);
    throw error;
  }
};


// 2. SERVICES: MANAJEMEN TIKET (CRUD)

interface CreateTicketInput {
  clientId: string;             // UUID pengguna pelapor (dari tabel auth.users)
  departmentId: number;         // ID Subbag tujuan keluhan
  helpTopicId: number;          // ID Topik keluhan spesifik
  subject: string;              // Judul atau ringkasan keluhan
  description: string;          // Penjelasan detail mengenai kendala
  attachmentUrl?: string | null; // URL berkas lampiran pendukung (opsional)
}

/**
 * Membuat data tiket baru ke dalam database.
 * Status tiket default secara otomatis akan diatur sebagai 'submit'.
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
        description: ticketData.description,
        attachment_url: ticketData.attachmentUrl || null,
        status: 'submit'
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
 * Mengambil seluruh daftar tiket milik pengguna tertentu (Mahasiswa/Pegawai).
 * Data difilter berdasarkan client_id untuk keamanan hak akses data.
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
 * Mengambil seluruh data tiket yang masuk ke dalam sistem.
 * Digunakan khusus untuk kebutuhan halaman utama Dashboard Admin.
 */
export const getAdminTickets = async () => {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      id,
      ticket_number,
      subject,
      description,
      status,
      created_at,
      attachment_url,
      profiles(full_name, nim_nip, unit),
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
 * Memperbarui status penanganan tiket sekaligus mencatat admin penanggung jawabnya.
 * Dipanggil saat admin melakukan aksi pemrosesan tiket (Accept, Resolve, Close).
 */
export const updateTicketStatus = async (
  ticketId: string,
  newStatus: 'submit' | 'accepted' | 'in progress' | 'resolved' | 'closed',
  adminId?: string
) => {
  const updatePayload: any = {
    status: newStatus,
    updated_at: new Date().toISOString()
  };

  if (adminId) {
    updatePayload.admin_id = adminId;
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


// 3. SERVICES: FITUR UTAS / DISCUSSION BALASAN (MESSAGES)

/**
 * Mengambil seluruh riwayat obrolan atau tanggapan berdasarkan ID Tiket tertentu.
 * Diurutkan secara kronologis dari pesan terlama hingga pesan paling baru.
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
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Gagal mengambil riwayat pesan:', error.message);
    return [];
  }
  return data;
};

/**
 * Mengirim dan menyimpan pesan tanggapan baru ke dalam utas diskusi tiket.
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

/**
 * Real-time Listener untuk mendengarkan pesan baru secara instan.
 * Fungsi ini akan digunakan oleh Frontend di dalam useEffect agar chat langsung muncul tanpa refresh.
 */
export const subscribeToTicketMessages = (ticketId: string, onNewMessage: (payload: any) => void) => {
  return supabase
    .channel(`ticket-chat-${ticketId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `ticket_id=eq.${ticketId}`
      },
      async (payload) => {
        // Ambil data profil pengirim untuk melengkapi data real-time (Nama & Role)
        const { data: senderProfile } = await supabase
          .from('profiles')
          .select(`
            full_name, 
            role_id (
              role_name
            )
          `)
          .eq('id', payload.new.sender_id)
          .single();

        const fullPayload = {
          ...payload.new,
          profiles: senderProfile
        };

        onNewMessage(fullPayload);
      }
    )
    .subscribe();
};