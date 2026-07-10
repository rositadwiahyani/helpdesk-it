import { supabase } from './supabase';

interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  nimNip?: string;
  unit?: string;
}

// 1. SERVICES: AUTHENTICATION (REGISTER, LOGIN, LOGOUT)

/**
 * Mendaftarkan akun baru ke Supabase Auth (Email & Password),
 * sekaligus mencatatkan detail data profil kustom pengguna ke tabel public.profiles.
 */
export const registerUser = async (data: RegisterInput) => {
  try {
    // A. Daftarkan kredensial akun ke sistem autentikasi internal Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;

    // B. Jika akun berhasil dibuat, petakan ID-nya ke data tabel profiles public
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id, // ID wajib disamakan dengan entri auth.users
            full_name: data.fullName,
            phone_number: data.phoneNumber,
            email: data.email,
            nim_nip: data.nimNip || null,
            unit: data.unit || null,
            role_id: 2, // Default level akses: 2 untuk Client/User umum
          }
        ]);

      if (profileError) {
        console.error('Gagal sinkronisasi data ke tabel profiles:', profileError.message);
        throw profileError;
      }
    }

    return authData;
  } catch (error: any) {
    console.error('Proses registrasi user gagal:', error.message);
    throw error;
  }
};

/**
 * Melakukan proses masuk log (Login) ke aplikasi.
 * Hanya memvalidasi kecocokan data email dan kata sandi pengguna.
 */
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Proses verifikasi login gagal:', error.message);
    throw error;
  }
  return data;
};

/**
 * Melakukan proses keluar log (Logout) untuk menghancurkan session token yang aktif.
 */
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Gagal menghancurkan sesi autentikasi:', error.message);
    throw error;
  }
};