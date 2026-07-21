import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const accounts = [
    { email: 'operator@helpdesk.com', password: 'password123', role: 'operator' },
    { email: 'teknisi@helpdesk.com', password: 'password123', role: 'teknisi' },
    { email: 'pimpinan@helpdesk.com', password: 'password123', role: 'pimpinan' },
  ];

  const results = [];

  for (const acc of accounts) {
    // Coba login dulu jika akun sudah ada
    let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: acc.email,
      password: acc.password,
    });

    if (authError) {
      // Jika gagal login (mungkin belum terdaftar), coba daftar
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: acc.email,
        password: acc.password,
        options: {
          data: {
            role: acc.role
          }
        }
      });
      authData = signUpData;
      authError = signUpError;
    }

    if (authError) {
      results.push({ email: acc.email, status: 'error', message: authError.message });
      continue;
    }

    if (authData?.user) {
      // Pastikan metadata terupdate (berguna jika akun sudah terdaftar tapi metadatanya kosong)
      const { error: updateError } = await supabase.auth.updateUser({
        data: { role: acc.role }
      });
      
      if (updateError) {
        results.push({ email: acc.email, status: 'error_update_metadata', message: updateError.message });
      } else {
        results.push({ email: acc.email, status: 'success', id: authData.user.id, role: acc.role });
      }
    }
  }

  return NextResponse.json({ results });
}
