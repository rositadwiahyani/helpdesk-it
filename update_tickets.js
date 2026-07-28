const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fcagraetgovfanagneyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYWdyYWV0Z292ZmFuYWduZXljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQ4NTE4MiwiZXhwIjoyMDk5MDYxMTgyfQ.m1DAS0FJkM96kH90VzeuIBpy8YT88tkTyuJgMwEMQ5M';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateTicketNumbers() {
  console.log('Fetching all tickets...');
  
  // Ambil semua tiket diurutkan berdasarkan waktu pembuatan
  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('id, created_at')
    .order('created_at', { ascending: true });
    
  if (error) {
    console.error('Error fetching tickets:', error);
    return;
  }

  console.log(`Found ${tickets.length} tickets. Updating numbers...`);

  let count = 1;
  for (const ticket of tickets) {
    // Format nomor tiket menjadi 5 digit, contoh: 00001
    const paddedNum = String(count).padStart(5, '0');
    const ticketNum = `#${paddedNum}`;
    
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ ticket_num: ticketNum })
      .eq('id', ticket.id);
      
    if (updateError) {
      console.error(`Failed to update ticket ${ticket.id}:`, updateError);
    } else {
      console.log(`Updated ticket ${ticket.id} to ${ticketNum}`);
    }
    
    count++;
  }

  console.log('All tickets updated successfully!');
}

updateTicketNumbers();
