const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const matchUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const matchKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = matchUrl ? matchUrl[1].trim() : null;
const supabaseKey = matchKey ? matchKey[1].trim() : null;

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: kb, error: kbErr } = await supabase.from('knowledge_base').select('id, title, title_en, content_en').limit(5);
  console.log('knowledge_base rows:', kb);
}

main();
