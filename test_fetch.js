const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  const staffId = '4dbb7631-e82c-4327-a899-ae58f09fa5ba';
  const { data, error } = await supabase
    .from('staff_profiles')
    .select('*, dept:departments(name)')
    .eq('id', staffId)
    .maybeSingle();

  console.log('Result:', { data, error });
}

test();
