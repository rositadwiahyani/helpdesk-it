const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testUpdate() {
  const { data: cats } = await supabase.from('categories').select('*');
  console.log('Categories before:', cats.map(c => ({ id: c.id, name: c.name, sort_order: c.sort_order })));
  
  // Try to update one
  const { data, error } = await supabase.from('categories').update({ sort_order: 1 }).eq('id', cats[0].id).select();
  console.log('Update result:', data, error);
}

testUpdate();
