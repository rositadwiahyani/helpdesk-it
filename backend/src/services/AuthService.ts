import { supabase } from '../config/supabase';

// 1. INTERFACE DISESUAIKAN KHUSUS STAF
interface StaffRegisterInput {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'operator' | 'teknisi' | 'admin' | 'pimpinan'; 
  dept_id?: number | null; // Opsional/Null untuk admin atau pimpinan
}

// 2. SERVICES: AUTHENTICATION (KHUSUS STAFF INTERNAL)

/**
 * Mendaftarkan akun Staff baru ke Supabase Auth,
 * sekaligus mencatat profilnya ke tabel staff_profiles.
 * (Umumnya fungsi ini hanya dipanggil oleh Admin via Dashboard)
 */
export const registerStaff = async (data: StaffRegisterInput) => {
  try {
    // A. Daftarkan kredensial akun ke sistem autentikasi Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;

    // B. Sinkronisasi data ke tabel staff_profiles (bukan profiles lagi)
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('staff_profiles')
        .insert([
          {
            id: authData.user.id, // ID wajib disamakan dengan entri auth.users
            name: data.name,
            phone: data.phone || null,
            email: data.email,
            role: data.role || 'operator',
            dept_id: data.dept_id || null,
          }
        ]);

      if (profileError) {
        console.error('Gagal sinkronisasi data ke tabel staff_profiles:', profileError.message);
        throw profileError;
      }
    }

    return authData;
  } catch (error: any) {
    console.error('Proses registrasi staf gagal:', error.message);
    throw error;
  }
};

/**
 * Login untuk Staff (Web Dashboard).
 * Memvalidasi kredensial sekaligus menarik data profil (role & departemen).
 */
export const loginStaff = async (email: string, password: string) => {
  // A. Proses login via Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    console.error('Proses verifikasi login gagal:', authError.message);
    throw authError;
  }

  // B. Ambil data tambahan (role & dept_id) dari staff_profiles agar bisa dipakai di frontend
  if (authData.user) {
    const { data: profileData, error: profileError } = await supabase
      .from('staff_profiles')
      .select('name, role, dept_id')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('Gagal mengambil profil staf:', profileError.message);
      // Tetap return authData agar user tidak stuck, walau profil gagal diambil
      return authData; 
    }

    // Gabungkan response auth asli dengan sisipan data profil
    return {
      ...authData,
      profile: profileData
    };
  }

  return authData;
};

/**
 * Logout untuk menghancurkan session token yang aktif.
 */
export const logoutStaff = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Gagal menghancurkan sesi autentikasi:', error.message);
    throw error;
  }
};