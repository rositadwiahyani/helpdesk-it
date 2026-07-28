import { supabase } from '../config/supabase';
import { sendMessage } from './wasender';

interface WASession {
  phone: string;
  step: string;
  data: {
    category_id?: number;
    current_parent_id?: number | null;
    current_parent_name?: string | null;
    category_path?: string;
    subject_description?: string;
    reporter_name?: string;
    nim_nip?: string;
    unit?: string;
    user_info?: string;
  } | null;
  updated_at?: string;
}

export async function handleIncomingMessage(sender: string, messageText: string) {
  const cleanInput = messageText.trim();

  // 0. Cek apakah pengguna diblokir
  const { data: reporter } = await supabase
    .from('reporters')
    .select('status, name, nim_nip, unit, reporter_type')
    .eq('phone', sender)
    .single();

  if (reporter?.status === 'Terblokir') {
    return sendMessage(sender, "⚠️ Maaf, nomor Anda saat ini diblokir dari sistem IT Helpdesk karena pelanggaran ketentuan layanan.");
  }

  // 1. GLOBAL TRIGGER: HaloDesk / MENU / BATAL
  if (['halodesk', 'batal', 'menu'].includes(cleanInput.toLowerCase())) {
    await supabase.from('wa_sessions').upsert({
      phone: sender,
      step: 'MAIN_MENU',
      data: {},
      updated_at: new Date().toISOString()
    });
    return showMainMenu(sender);
  }

  // 2. Ambil Session User dari Supabase
  let { data: session } = await supabase
    .from('wa_sessions')
    .select('*')
    .eq('phone', sender)
    .single<WASession>();

  // 3. Jika User Baru & BELUM ketik "HaloDesk"
  if (!session) {
    const greetingName = reporter?.name ? `, ${reporter.name}` : '';
    return sendMessage(sender, `👋 Halo${greetingName}! Silakan ketik *HaloDesk* untuk memulai layanan IT Helpdesk.`);
  }

  const currentData = session.data || {};

  // 4. State Machine Alur
  switch (session.step) {
    case 'MAIN_MENU':
      await handleMainMenu(sender, cleanInput);
      break;

    case 'SELECT_CATEGORY':
      await handleDynamicCategorySelect(sender, cleanInput, currentData.current_parent_id || null, currentData.current_parent_name || null, currentData);
      break;

    case 'INPUT_TICKET_DETAIL':
      await handleInputTicketDetail(sender, cleanInput, currentData);
      break;

    case 'ASK_REUSE_INFO':
      await handleAskReuseInfo(sender, cleanInput, currentData);
      break;

    case 'INPUT_USER_INFO':
      await handleInputUserInfo(sender, cleanInput, currentData);
      break;

    case 'CONFIRM_TICKET':
      await handleConfirmTicket(sender, cleanInput, currentData);
      break;

    case 'CHECK_TICKET_STATUS':
      await handleCheckTicketStatus(sender, cleanInput);
      break;

    default:
      await sendMessage(sender, "Ketik *HaloDesk* untuk kembali ke menu utama.");
      break;
  }
}

// ==========================================
// STEP 1: GREETINGS & MENU UTAMA
// ==========================================
async function showMainMenu(sender: string) {
  const { data: reporter } = await supabase.from('reporters').select('name').eq('phone', sender).single();
  const greetingName = reporter?.name ? ` ${reporter.name}` : '';
  
  // Ambil template pesan
  const { data: template } = await supabase.from('bot_templates').select('message_text').eq('template_key', 'greeting_menu').single();
  
  let text = '';
  if (template && template.message_text) {
    // Replace placeholder {{name}}
    text = template.message_text.replace('{{name}}', greetingName);
  } else {
    // Fallback if template doesn't exist
    text = `👋 *Halo${greetingName}, Selamat datang di IT Helpdesk!*\n\n`;
    text += `Silakan pilih menu layanan di bawah ini:\n`;
    text += `1. 📝 Buat Tiket Pengaduan\n`;
    text += `2. 🔍 Cek Status Tiket\n\n`;
    text += `_Balas angka pilihan Anda (Contoh: 1)_`;
  }

  await sendMessage(sender, text);
}

async function handleMainMenu(sender: string, input: string) {
  if (input === '1') {
    await supabase.from('wa_sessions').update({
      step: 'SELECT_CATEGORY',
      data: {},
      updated_at: new Date().toISOString()
    }).eq('phone', sender);

    await showDynamicCategoryMenu(sender, null, null, {});

  } else if (input === '2') {
    // 💡 UPDATE STEP DI SINI KE 'CHECK_TICKET_STATUS'
    await supabase.from('wa_sessions').update({
      step: 'CHECK_TICKET_STATUS',
      data: {},
      updated_at: new Date().toISOString()
    }).eq('phone', sender);

    await sendMessage(sender, "🔍 Silakan ketikkan *Nomor Tiket* Anda (Contoh: TKT-123456):");
  } else {
    await sendMessage(sender, "❌ Pilihan tidak valid. Balas angka *1* (Buat Tiket) atau *2* (Cek Status). Ketik *HaloDesk* untuk reset.");
  }
}

// ==========================================
// KATEGORI (DINAMIS N-LEVEL)
// ==========================================
async function showDynamicCategoryMenu(sender: string, parentId: number | null, parentName: string | null, currentData: any) {
  let query = supabase.from('categories').select('id, name').eq('is_active', true).order('sort_order', { ascending: true }).order('name', { ascending: true });
  
  if (parentId === null) {
    query = query.is('parent_id', null);
  } else {
    query = query.eq('parent_id', parentId);
  }

  const { data: categories, error } = await query;

  if (error || !categories || categories.length === 0) {
    // Kategori tidak punya anak, artinya ini adalah LEAF NODE
    // Langsung pindah ke INPUT_TICKET_DETAIL
    await supabase.from('wa_sessions').update({
      step: 'INPUT_TICKET_DETAIL',
      data: { ...currentData, category_id: parentId, category_path: currentData.category_path || parentName },
      updated_at: new Date().toISOString()
    }).eq('phone', sender);

    return promptTicketDetail(sender);
  }

  // Ada anak, tampilkan sebagai menu
  let text = parentName ? `📂 *Sub-Kategori - ${parentName}:*\n\n` : `📋 *PILIH KATEGORI LAYANAN*\n\n`;
  categories.forEach((cat: any, index: number) => {
    text += `${index + 1}. ${cat.name}\n`;
  });
  text += "\n_Balas angka pilihan Anda, atau ketik *HaloDesk* untuk kembali._";

  await sendMessage(sender, text);
}

async function handleDynamicCategorySelect(sender: string, input: string, parentId: number | null, parentName: string | null, currentData: any) {
  let query = supabase.from('categories').select('id, name').eq('is_active', true).order('sort_order', { ascending: true }).order('name', { ascending: true });
  
  if (parentId === null) {
    query = query.is('parent_id', null);
  } else {
    query = query.eq('parent_id', parentId);
  }

  const { data: categories } = await query;

  const selectedIndex = parseInt(input) - 1;

  if (!categories || isNaN(selectedIndex) || !categories[selectedIndex]) {
    return sendMessage(sender, "❌ Pilihan tidak valid. Silakan jawab dengan nomor angka yang ada.");
  }

  const selectedCat = categories[selectedIndex];
  const newPath = currentData.category_path ? `${currentData.category_path} > ${selectedCat.name}` : selectedCat.name;

  const newData = { ...currentData, current_parent_id: selectedCat.id, current_parent_name: selectedCat.name, category_path: newPath };

  await supabase.from('wa_sessions').update({
    step: 'SELECT_CATEGORY',
    data: newData,
    updated_at: new Date().toISOString()
  }).eq('phone', sender);

  await showDynamicCategoryMenu(sender, selectedCat.id, selectedCat.name, newData);
}

// ==========================================
// STEP SETELAH TIER: DETAIL KENDALA -> DATA DIRI -> KONFIRMASI
// ==========================================
async function promptTicketDetail(sender: string) {
  let text = `✏️ *SUBJEK & DESKRIPSI KENDALA*\n\n`;
  text += `Silakan isi subjek dan detail kendala dengan format berikut:\n`;
  text += `- Baris pertama: Subjek Tiket\n`;
  text += `- Baris kedua dst: Detail Kendala\n\n`;
  text += `*Contoh:*\n`;
  text += `Gagal Login SSO\n`;
  text += `Halo, saya tidak bisa login ke SSO meskipun password sudah benar...`;

  await sendMessage(sender, text);
}

async function handleInputTicketDetail(sender: string, input: string, currentData: any) {
  const lines = input.split('\n');
  const subjectInput = lines[0].trim();
  const descriptionInput = lines.length > 1 ? lines.slice(1).join('\n').trim() : '-';

  const updatedData = {
    ...currentData,
    subject_input: subjectInput,
    subject_description: descriptionInput
  };

  const { data: reporter } = await supabase
    .from('reporters')
    .select('name, nim_nip, unit')
    .eq('phone', sender)
    .single();

  if (reporter && reporter.name) {
    await supabase.from('wa_sessions').update({
      step: 'ASK_REUSE_INFO',
      data: updatedData,
      updated_at: new Date().toISOString()
    }).eq('phone', sender);

    let text = `Kami menemukan data Anda sebelumnya:\n`;
    text += `Nama: ${reporter.name}\n`;
    text += `NIP/NIM: ${reporter.nim_nip}\n`;
    text += `Unit: ${reporter.unit}\n\n`;
    text += `Apakah Anda ingin menggunakan data diri ini untuk tiket Anda?\n`;
    text += `1. ✅ Ya, gunakan data ini\n`;
    text += `2. 🔄 Tidak, isi data baru\n\n`;
    text += `_Balas angka 1 atau 2_`;

    await sendMessage(sender, text);
  } else {
    await supabase.from('wa_sessions').update({
      step: 'INPUT_USER_INFO',
      data: updatedData,
      updated_at: new Date().toISOString()
    }).eq('phone', sender);

    let text = `👤 *INPUT DATA DIRI*\n\n`;
    text += `Silakan masukkan Data Diri Anda.\n`;
    text += `*Format:* Nama - NIP/NIM - Unit Kerja/Fakultas\n\n`;
    text += `_Contoh: Budi - 19901234 - Bagian Keuangan_`;

    await sendMessage(sender, text);
  }
}

async function handleAskReuseInfo(sender: string, input: string, currentData: any) {
  if (input === '1') {
    const { data: reporter } = await supabase
      .from('reporters')
      .select('name, nim_nip, unit, reporter_type')
      .eq('phone', sender)
      .single();
      
    if (reporter) {
      const updatedData = {
        ...currentData,
        user_info: `${reporter.name} - ${reporter.nim_nip} - ${reporter.unit}`,
        reporter_name: reporter.name,
        nim_nip: reporter.nim_nip,
        unit: reporter.unit,
        reporter_type: reporter.reporter_type
      };
      
      await supabase.from('wa_sessions').update({
        step: 'CONFIRM_TICKET',
        data: updatedData,
        updated_at: new Date().toISOString()
      }).eq('phone', sender);
      
      await showConfirmTicketSummary(sender, updatedData);
    }
  } else if (input === '2') {
    await supabase.from('wa_sessions').update({
      step: 'INPUT_USER_INFO',
      data: currentData,
      updated_at: new Date().toISOString()
    }).eq('phone', sender);

    let text = `👤 *INPUT DATA DIRI*\n\n`;
    text += `Silakan masukkan Data Diri Anda.\n`;
    text += `*Format:* Nama - NIP/NIM - Unit Kerja/Fakultas\n\n`;
    text += `_Contoh: Budi - 19901234 - Bagian Keuangan_`;

    await sendMessage(sender, text);
  } else {
    await sendMessage(sender, "❌ Pilihan tidak valid. Balas dengan angka *1* (Ya) atau *2* (Tidak).");
  }
}

async function showConfirmTicketSummary(sender: string, updatedData: any) {
  let summaryText = `📑 *KONFIRMASI TIKET PENGADUAN*\n`;
  summaryText += `-----------------------------------\n`;
  summaryText += `• *Kategori:* ${updatedData.category_path || '-'}\n`;
  summaryText += `• *Subjek:* ${updatedData.subject_input || '-'}\n`;
  summaryText += `• *Kendala:* ${updatedData.subject_description || '-'}\n`;
  summaryText += `• *Nama Pelapor:* ${updatedData.reporter_name}\n`;
  summaryText += `• *Tipe Pelapor:* ${updatedData.reporter_type}\n`;
  summaryText += `• *NIM/NIP:* ${updatedData.nim_nip}\n`;
  summaryText += `• *Unit/Fakultas:* ${updatedData.unit}\n`;
  summaryText += `-----------------------------------\n\n`;
  summaryText += `Apakah data tiket di atas sudah benar?\n`;
  summaryText += `1. ✅ Ya, Kirim Tiket\n`;
  summaryText += `2. ❌ Batal Kirim\n\n`;
  summaryText += `_Balas dengan angka 1 atau 2_`;

  await sendMessage(sender, summaryText);
}

async function handleInputUserInfo(sender: string, input: string, currentData: any) {
  // 1. Parsing input user (Format: Nama - NIM/NIP - Unit)
  const parts = input.split('-').map(p => p.trim());
  const reporter_name = parts[0] || input;
  const nim_nip = parts[1] || '-';
  const unit = parts[2] || '-';

  // 2. Deteksi otomatis reporter_type dari NIM/NIP
  let reporter_type = 'Umum';
  const cleanId = nim_nip.replace(/\s+/g, ''); // bersihkan spasi

  // Contoh logika: NIM biasanya 14 digit, NIP 18 digit
  if (/^\d{14}$/.test(cleanId) || cleanId.toLowerCase().includes('mhs')) {
    reporter_type = 'Mahasiswa';
  } else if (/^\d{18}$/.test(cleanId) || cleanId.toLowerCase().includes('nip')) {
    reporter_type = 'Dosen / Tendik';
  } else if (cleanId !== '-' && cleanId !== '0') {
    // Jika mengisi angka/identitas tapi panjangnya beda, default ke Mahasiswa/Umum sesuai kebutuhan
    reporter_type = 'Umum'; 
  }

  const updatedData = { 
    ...currentData, 
    user_info: input,
    reporter_name,
    nim_nip,
    unit,
    reporter_type // Simpan tipe hasil deteksi
  };

  await supabase.from('wa_sessions').update({
    step: 'CONFIRM_TICKET',
    data: updatedData,
    updated_at: new Date().toISOString()
  }).eq('phone', sender);

  await showConfirmTicketSummary(sender, updatedData);
}

async function handleConfirmTicket(sender: string, input: string, currentData: any) {
  if (input === '1') {
    let ticketNumber = '#000001';
    try {
      const { data: tickets } = await supabase
        .from('tickets')
        .select('ticket_num');
        
      if (tickets && tickets.length > 0) {
        let maxNum = 0;
        tickets.forEach(t => {
          if (t.ticket_num) {
            const match = t.ticket_num.match(/\d+/);
            if (match) {
              const num = parseInt(match[0], 10);
              if (num > maxNum) maxNum = num;
            }
          }
        });
        const nextNum = maxNum + 1;
        ticketNumber = `#${nextNum.toString().padStart(6, '0')}`;
      }
    } catch (e) {
      console.error("Gagal mendapatkan tiket terakhir:", e);
      ticketNumber = `#${Date.now().toString().slice(-6)}`; // Fallback
    }

    // Insert ke tabel 'tickets' dengan reporter_type dinamis
    const { error } = await supabase.from('tickets').insert([{
      ticket_num: ticketNumber,
      phone: sender,
      dept_id: null,
      category_id: currentData.category_id,
      subcategory_id: null,
      subject: currentData.subject_input || 'Laporan Pengaduan IT',
      description: currentData.subject_description,
      reporter_name: currentData.reporter_name,
      reporter_type: currentData.reporter_type || 'Umum', // <-- Dinamis sesuai hasil parsing
      nim_nip: currentData.nim_nip,
      unit: currentData.unit,
      status: 'Open'
    }]);

    if (error) {
      console.error("❌ ERROR INSERT TICKET:", error);
      await sendMessage(sender, "⚠️ Mohon maaf, terjadi kesalahan sistem saat membuat tiket. Silakan coba beberapa saat lagi.");
    } else {
      // Upsert data pelapor
      await supabase.from('reporters').upsert({
        phone: sender,
        name: currentData.reporter_name,
        nim_nip: currentData.nim_nip,
        unit: currentData.unit,
        reporter_type: currentData.reporter_type || 'Umum',
        status: 'Aktif'
      }, { onConflict: 'phone' });

      await supabase.from('wa_sessions').update({
        step: 'MAIN_MENU',
        data: {},
        updated_at: new Date().toISOString()
      }).eq('phone', sender);

      let successText = `🎉 *TIKET BERHASIL DIBUAT!*\n\n`;
      successText += `• *Nomor Tiket:* *${ticketNumber}*\n`;
      successText += `• *Tipe Pelapor:* ${currentData.reporter_type}\n`;
      successText += `• *Status:* Open\n\n`;
      successText += `Tiket Anda telah masuk ke dalam antrean operator. Mohon menunggu update status selanjutnya via WhatsApp. Terima kasih! 🙏`;

      await sendMessage(sender, successText);
    }

  } else if (input === '2') {
    await supabase.from('wa_sessions').update({
      step: 'MAIN_MENU',
      data: {},
      updated_at: new Date().toISOString()
    }).eq('phone', sender);

    await sendMessage(sender, "❌ Pembuatan tiket dibatalkan. Ketik *HaloDesk* jika ingin memulai lagi.");
  } else {
    await sendMessage(sender, "❌ Pilihan tidak valid. Balas dengan angka *1* (Kirim) atau *2* (Batal).");
  }
}

// FITUR CEK STATUS TIKET
// ==========================================
async function handleCheckTicketStatus(sender: string, inputNumber: string) {
  const formattedTicketNum = inputNumber.toUpperCase().trim();

  const { data: ticket, error } = await supabase
    .from('tickets')
    .select('ticket_num, status, subject, description, created_at')
    .eq('ticket_num', formattedTicketNum)
    .single();

  if (error || !ticket) {
    return sendMessage(
      sender,
      `❌ Nomor tiket *${formattedTicketNum}* tidak ditemukan.\n\n` +
      `Silakan periksa kembali nomor tiket Anda atau ketik *HaloDesk* untuk kembali ke menu utama.`
    );
  }

  const createdDate = new Date(ticket.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let text = `🔍 *DETAIL STATUS TIKET*\n`;
  text += `-----------------------------------\n`;
  text += `• *Nomor Tiket:* ${ticket.ticket_num}\n`;
  text += `• *Status Saat Ini:* *${ticket.status}*\n`;
  text += `• *Topik Kendala:* ${ticket.subject || '-'}\n`;
  text += `• *Deskripsi:* ${ticket.description || '-'}\n`;
  text += `• *Tanggal Dibuat:* ${createdDate}\n`;
  text += `-----------------------------------\n\n`;
  text += `Ketik *HaloDesk* untuk kembali ke menu utama.`;

  await supabase.from('wa_sessions').update({
    step: 'MAIN_MENU',
    data: {},
    updated_at: new Date().toISOString()
  }).eq('phone', sender);

  await sendMessage(sender, text);
}