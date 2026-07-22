const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://fcagraetgovfanagneyc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYWdyYWV0Z292ZmFuYWduZXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0ODUxODIsImV4cCI6MjA5OTA2MTE4Mn0.t3_qZn5OWQrX5raKviVQMbWu8UPJsk9Dis60p2pRwPQ'
);

async function fixProfiles() {
    const accounts = [
        { email: 'operator@helpdesk.com', password: 'password123', role: 'operator', name: 'Operator Utama' },
        { email: 'teknisi@helpdesk.com', password: 'password123', role: 'teknisi', name: 'Teknisi Handal' },
        { email: 'pimpinan@helpdesk.com', password: 'password123', role: 'pimpinan', name: 'Bapak Pimpinan' },
    ];

    for (const acc of accounts) {
        // Login to get user ID
        const { data, error } = await supabase.auth.signInWithPassword({
            email: acc.email,
            password: acc.password
        });
        
        if (error || !data.user) {
            console.log('Failed login for', acc.email, error);
            continue;
        }

        const userId = data.user.id;
        
        // Insert into staff_profiles
        const { error: insertError } = await supabase.from('staff_profiles').upsert({
            id: userId,
            email: acc.email,
            role: acc.role,
            name: acc.name,
            dept_id: acc.role === 'teknisi' ? 1 : null // Assign teknisi to dept 1 (Hardware)
        });

        if (insertError) {
            console.log('Error inserting profile for', acc.email, insertError);
        } else {
            console.log('Restored profile for', acc.email);
        }
    }
}
fixProfiles();
