import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AGENTS = [
  { name: 'Andi Software', email: 'agent.software@halodesk.com', password: 'password123', role: 'teknisi', dept_id: 1 },
  { name: 'Budi Hardware', email: 'agent.hardware@halodesk.com', password: 'password123', role: 'teknisi', dept_id: 2 },
  { name: 'Citra Jaringan', email: 'agent.jaringan@halodesk.com', password: 'password123', role: 'teknisi', dept_id: 3 },
  { name: 'Deni Keamanan', email: 'agent.keamanan@halodesk.com', password: 'password123', role: 'teknisi', dept_id: 4 },
];

async function seedAgents() {
  console.log('Seeding Agents...');
  
  for (const agent of AGENTS) {
    console.log(`Mendaftarkan ${agent.email}...`);
    // 1. Register Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: agent.email,
      password: agent.password,
    });

    if (authError) {
      console.error(`Gagal register ${agent.email}:`, authError.message);
      // Jika email sudah terdaftar, kita skip saja dan coba update staff_profiles nanti
      // Lanjutkan ke agen berikutnya jika error selain user_already_exists
      if (!authError.message.includes('already registered')) {
        continue;
      }
    }
    
    // Untuk update/insert ke staff_profiles, karena jika user sudah ada kita tidak punya authData.user.id di response signup
    // kita login sementara untuk mendapatkan ID, atau kita asumsikan trigger Auth otomatis membuatnya jika ada.
    // Tapi karena ini script seeder, mari kita masukkan ke staff_profiles.
    
    // Login to get user ID if already exists
    let userId = authData?.user?.id;
    if (!userId) {
       const { data: loginData } = await supabase.auth.signInWithPassword({
         email: agent.email,
         password: agent.password
       });
       userId = loginData?.user?.id;
    }

    if (userId) {
      const { error: profileError } = await supabase.from('staff_profiles').upsert({
        id: userId,
        email: agent.email,
        name: agent.name,
        role: agent.role,
        dept_id: agent.dept_id
      }, { onConflict: 'id' });

      if (profileError) {
        console.error(`Gagal update staff_profiles untuk ${agent.email}:`, profileError.message);
      } else {
        console.log(`Berhasil insert/update profile ${agent.email}`);
      }
    }
  }
  
  console.log('Selesai.');
}

seedAgents();
