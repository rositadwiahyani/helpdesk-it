// Dotenv removed, use --env-file
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixStatus() {
    console.log('Fixing ticket statuses...');
    
    // Fix 'In Progress' -> 'IN PROGRESS'
    const { error: err1 } = await supabase.from('tickets')
        .update({ status: 'IN PROGRESS' })
        .eq('status', 'In Progress');
    if (err1) console.error('Error fixing IN PROGRESS', err1);
    
    // Fix 'Resolved' -> 'RESOLVED'
    const { error: err2 } = await supabase.from('tickets')
        .update({ status: 'RESOLVED' })
        .eq('status', 'Resolved');
    if (err2) console.error('Error fixing RESOLVED', err2);
    
    // Fix 'Closed' -> 'CLOSED'
    const { error: err3 } = await supabase.from('tickets')
        .update({ status: 'CLOSED' })
        .eq('status', 'Closed');
    if (err3) console.error('Error fixing CLOSED', err3);

    // Fix 'Assigned' -> 'NEW'
    const { error: err4 } = await supabase.from('tickets')
        .update({ status: 'NEW' })
        .eq('status', 'Assigned');
    if (err4) console.error('Error fixing NEW', err4);

    console.log('Done!');
}

fixStatus();
