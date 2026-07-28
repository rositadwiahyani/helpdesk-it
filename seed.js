const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fcagraetgovfanagneyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYWdyYWV0Z292ZmFuYWduZXljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQ4NTE4MiwiZXhwIjoyMDk5MDYxMTgyfQ.m1DAS0FJkM96kH90VzeuIBpy8YT88tkTyuJgMwEMQ5M';

const supabase = createClient(supabaseUrl, supabaseKey);

const firstNames = ['Andi', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fajar', 'Gita', 'Hadi', 'Indah', 'Joko', 'Kiki', 'Lestari', 'Maman', 'Nina', 'Oki'];
const lastNames = ['Saputra', 'Wijaya', 'Kusuma', 'Pratama', 'Hidayat', 'Setiawan', 'Nugroho', 'Lestari', 'Sari', 'Putri'];
const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const subjects = [
  'Lupa Password SSO Universitas',
  'WiFi di Fakultas Teknik tidak bisa connect',
  'Request install software Adobe',
  'Printer di ruang dosen error',
  'Sistem Akademik lambat saat diakses',
  'AC di ruang lab komputer mati',
  'Email kampus tidak bisa menerima pesan',
  'Website Pendaftaran Mahasiswa error',
  'Request akses ke VPN kampus',
  'Layar proyektor di kelas kedap-kedip'
];
const descs = [
  'Tolong perbaiki secepatnya karena sedang dibutuhkan.',
  'Sudah terjadi sejak kemarin pagi, mohon bantuannya.',
  'Saya butuh ini untuk presentasi besok.',
  'Sudah coba restart tapi masih sama saja.',
  'Mohon panduannya untuk mengatasi masalah ini.'
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomTicket(deptId, catId, status) {
  const isOperator = status === 'WAITING VERIFICATION';
  const units = ['Fakultas Teknik', 'Fakultas Hukum', 'Rektorat', 'Perpustakaan Pusat', 'Fakultas Kedokteran'];
  return {
    ticket_num: `#TIC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    reporter_name: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
    phone: `0812${Math.floor(10000000 + Math.random() * 90000000)}`,
    reporter_type: Math.random() > 0.5 ? 'mahasiswa' : 'dosen',
    nim_nip: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    unit: getRandomItem(units),
    dept_id: isOperator ? null : deptId,
    category_id: isOperator ? null : catId,
    subject: getRandomItem(subjects),
    description: getRandomItem(descs),
    priority: getRandomItem(priorities),
    status: status
  };
}

async function run() {
  console.log('Fetching departments and categories...');
  const { data: depts, error: errDepts } = await supabase.from('departments').select('*');
  const { data: cats, error: errCats } = await supabase.from('categories').select('*');
  
  if (errDepts || errCats) {
    console.error('Error fetching depts/cats', errDepts, errCats);
    return;
  }

  console.log('Wiping ticket_logs...');
  await supabase.from('ticket_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log('Wiping tickets...');
  await supabase.from('tickets').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const ticketsToInsert = [];

  // 1. 30 WAITING VERIFICATION tickets
  console.log('Generating 30 waiting verification tickets...');
  for (let i = 0; i < 30; i++) {
    ticketsToInsert.push(generateRandomTicket(null, null, 'WAITING VERIFICATION'));
  }

  // 2. 7 tickets per department
  console.log('Generating 7 tickets per department...');
  for (const dept of depts) {
    // Cari kategori yang sesuai dengan departemen ini jika ada
    const deptCats = cats.filter(c => c.dept_id === dept.id);
    const catId = deptCats.length > 0 ? deptCats[0].id : null;
    
    for (let i = 0; i < 7; i++) {
      const statuses = ['NEW', 'IN PROGRESS', 'RESOLVED'];
      const status = getRandomItem(statuses);
      ticketsToInsert.push(generateRandomTicket(dept.id, catId, status));
    }
  }

  console.log(`Inserting ${ticketsToInsert.length} tickets...`);
  
  // Insert in batches of 10 to avoid any limits
  for (let i = 0; i < ticketsToInsert.length; i += 10) {
    const batch = ticketsToInsert.slice(i, i + 10);
    const { error } = await supabase.from('tickets').insert(batch);
    if (error) {
      console.error('Error inserting tickets:', error);
    } else {
      console.log(`Inserted ${i + batch.length} tickets`);
    }
  }

  console.log('Done!');
}

run();
