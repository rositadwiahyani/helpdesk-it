import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Memastikan dotenv termuat jika file ini di-import independen
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ SUPABASE_URL atau SUPABASE_ANON_KEY tidak ditemukan di .env!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);