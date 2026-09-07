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

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function cleanUnusedTables() {
  const tablesToEmpty = [
    'wa_mockup_messages',
    'quick_replies',
    'ticket_ratings',
    'sla_policies',
    'holiday_settings'
  ];

  for (const table of tablesToEmpty) {
    console.log(`Mengosongkan tabel ${table}...`);
    const { error } = await supabaseAdmin.from(table).delete().neq('id', 0);
    
    if (error) {
      if (error.code === '42P01') {
        console.log(`Tabel ${table} tidak ditemukan (mungkin sudah dihapus atau tidak pernah ada). Mengabaikan...`);
      } else {
        console.log(`Gagal mengosongkan tabel ${table}:`, error.message);
      }
    } else {
      console.log(`Berhasil mengosongkan tabel ${table}!`);
    }
  }
}

cleanUnusedTables();
