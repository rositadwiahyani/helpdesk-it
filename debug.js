const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://fcagraetgovfanagneyc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYWdyYWV0Z292ZmFuYWduZXljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQ4NTE4MiwiZXhwIjoyMDk5MDYxMTgyfQ.m1DAS0FJkM96kH90VzeuIBpy8YT88tkTyuJgMwEMQ5M');

async function debug() {
  const { data: tickets } = await supabase.from('tickets').select('id, category_id, dept_id, status, sla_due').limit(5);
  console.log('Tickets:', tickets);
  const { data: cats } = await supabase.from('categories').select('id, name');
  console.log('Categories:', cats);
  const { data: depts } = await supabase.from('departments').select('id, name');
  console.log('Departments:', depts);
}
debug();
