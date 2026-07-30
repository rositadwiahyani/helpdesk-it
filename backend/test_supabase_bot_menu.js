const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  const { data, error } = await supabaseAdmin.from('bot_menus').insert([{ 
    title: 'Test FAQ', 
    action_type: 'TEXT_REPLY', 
    content: 'Test FAQ', 
    parent_id: undefined, 
    sort_order: 1, 
    is_active: true 
  }]).select().single();
  
  console.log('Result:', data);
  console.log('Error:', error);
}

test();
