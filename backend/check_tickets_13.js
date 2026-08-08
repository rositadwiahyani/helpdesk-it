require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function check() {
    const { data, error } = await supabase.from('tickets').select('*').eq('ticket_num', '#000013');
    if (error) console.error(error);
    else console.log("TICKET:", data);
}
check();
