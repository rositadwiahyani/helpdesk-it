const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkSchema() {
  const { data, error } = await supabase.from('tickets').select('*').limit(1);
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Tickets columns:", Object.keys(data[0] || {}));
  }
}

checkSchema();
