const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://fcagraetgovfanagneyc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYWdyYWV0Z292ZmFuYWduZXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0ODUxODIsImV4cCI6MjA5OTA2MTE4Mn0.t3_qZn5OWQrX5raKviVQMbWu8UPJsk9Dis60p2pRwPQ'
);

async function check() {
  const { data: profs } = await supabase.from('staff_profiles').select('*');
  console.log('Profiles:', profs);
}
check();
