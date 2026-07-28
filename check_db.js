const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  console.log("Checking slas...");
  const { data: slas, error: e1 } = await supabase.from('slas').select('*').limit(1);
  if (e1) console.log("slas error:", e1.message);
  else console.log("slas exists!");

  console.log("Checking bot_templates...");
  const { data: bot, error: e2 } = await supabase.from('bot_templates').select('*').limit(1);
  if (e2) console.log("bot_templates error:", e2.message);
  else console.log("bot_templates exists!");
}

check();
