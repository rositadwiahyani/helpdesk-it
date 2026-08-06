const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function testUpdate() {
  const { data, error } = await supabase.from('categories').update({ sort_order: 1 }).eq('id', 1).select();
  console.log('Anon Update Result:', data, error);
}

testUpdate();
