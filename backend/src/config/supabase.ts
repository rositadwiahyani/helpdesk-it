import dotenv from 'dotenv';
// Panggil dotenv.config() paling atas agar variabel .env ter-load sempurna
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// Mengutamakan SERVICE_ROLE_KEY agar backend Express bisa bypass RLS
const activeKey = supabaseServiceKey || supabaseAnonKey;

if (!supabaseUrl || !activeKey) {
  console.error('⚠️ SUPABASE_URL atau Key tidak ditemukan di file .env!');
}

export const supabase = createClient(supabaseUrl, activeKey);