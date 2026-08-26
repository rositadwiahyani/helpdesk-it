const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fcagraetgovfanagneyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYWdyYWV0Z292ZmFuYWduZXljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQ4NTE4MiwiZXhwIjoyMDk5MDYxMTgyfQ.m1DAS0FJkM96kH90VzeuIBpy8YT88tkTyuJgMwEMQ5M';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  try {
    // Fix existing wrong statuses
    console.log('Fixing existing wrong statuses...');
    await supabase.from('tickets').update({ status: 'NEW' }).eq('status', 'open');
    await supabase.from('tickets').update({ status: 'IN PROGRESS' }).eq('status', 'in progress');
    await supabase.from('tickets').update({ status: 'CLOSED' }).eq('status', 'closed');

    const { data: depts } = await supabase.from('departments').select('id').limit(3);
    const dept1 = depts[0]?.id;
    const dept2 = depts[1]?.id || dept1;
    const dept3 = depts[2]?.id || dept1;

    const { data: cats } = await supabase.from('categories').select('id').limit(4);
    const cat1 = cats[0]?.id;
    const cat2 = cats[1]?.id || cat1;
    const cat3 = cats[2]?.id || cat1;

    if (!dept1 || !cat1) return console.log('Missing depts or cats');

    const now = new Date();
    const tickets = [];
    const logs = [];

    // Generate 30 tickets spread over the last 30 days
    for (let i = 0; i < 30; i++) {
      const daysAgo = Math.floor(Math.random() * 30); // 0 to 29 days ago
      const createdTime = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      
      const isClosed = Math.random() > 0.5;
      const status = isClosed ? 'CLOSED' : (Math.random() > 0.5 ? 'IN PROGRESS' : 'NEW');
      
      // SLA logic: 
      // 50% chance it was given 2 days SLA from creation
      // 50% chance it was given 5 days SLA from creation
      const slaDays = Math.random() > 0.5 ? 2 : 5;
      const slaTime = new Date(createdTime.getTime() + slaDays * 24 * 60 * 60 * 1000);

      tickets.push({
        ticket_num: '#TKT-' + Math.floor(Math.random() * 90000 + 10000),
        reporter_name: 'Tester ' + i, 
        phone: '0812' + Math.floor(Math.random() * 90000000), 
        reporter_type: 'mahasiswa', 
        nim_nip: '240601' + Math.floor(Math.random() * 90000), 
        unit: 'Fakultas ' + (Math.random() > 0.5 ? 'Teknik' : 'Ekonomika'),
        dept_id: i % 3 === 0 ? dept1 : (i % 3 === 1 ? dept2 : dept3),
        category_id: i % 4 === 0 ? cat1 : (i % 4 === 1 ? cat2 : cat3),
        subject: 'Laporan Testing ' + i, 
        description: 'Auto generated testing data.',
        priority: Math.random() > 0.8 ? 'kritis' : 'sedang', 
        status: status,
        sla_due: slaTime.toISOString(), 
        created_at: createdTime.toISOString()
      });
    }

    console.log('Inserting 30 new tickets...');
    const { data: insertedTickets, error: insertErr } = await supabase.from('tickets').insert(tickets).select();
    
    if (insertErr) {
        return console.log('Error inserting tickets:', insertErr);
    }
    
    console.log('Successfully inserted', insertedTickets.length, 'tickets');

    // Generate some logs for these new tickets
    for (let i = 0; i < insertedTickets.length; i++) {
        const ticket = insertedTickets[i];
        logs.push({ ticket_id: ticket.id, action: 'TICKET_CREATED', notes: 'Tiket baru dibuat', created_at: ticket.created_at });
        
        if (ticket.status !== 'NEW') {
            const updateTime = new Date(new Date(ticket.created_at).getTime() + 1000 * 60 * 60); // 1 hour later
            logs.push({ ticket_id: ticket.id, action: 'STATUS_CHANGED', notes: 'Status ' + ticket.status, created_at: updateTime.toISOString() });
        }
    }

    await supabase.from('ticket_logs').insert(logs);
    console.log('Done inserting logs');
  } catch (err) {
    console.error(err);
  }
}

seed();
