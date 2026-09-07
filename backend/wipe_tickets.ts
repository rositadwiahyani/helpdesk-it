import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

// Gunakan Service Role Key untuk membypass RLS (Row Level Security)
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function wipeTickets() {
  console.log('Menghapus semua data tiket...');
  
  // Hapus dari tabel ticket_logs dulu (jika ada foreign key)
  await supabaseAdmin.from('ticket_logs').delete().neq('id', 0);
  
  // Hapus dari tabel tickets
  const { error, count } = await supabaseAdmin
    .from('tickets')
    .delete({ count: 'exact' })
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (error) {
    console.error('Gagal menghapus tiket:', error);
  } else {
    console.log(`Berhasil menghapus ${count || 'semua'} tiket dari database!`);
  }
}

wipeTickets();
