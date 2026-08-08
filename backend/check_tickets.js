require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function check() {
    const { data, error } = await supabase.from('tickets').select('id, ticket_num, status, tech_id').in('status', ['RESOLVED', 'CLOSED']);
    if (error) console.error(error);
    else console.log(data);
}
check();
