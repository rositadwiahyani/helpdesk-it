'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function TicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Load daftar departemen
  useEffect(() => {
    async function getDepartments() {
      const { data } = await supabase.from('departments').select('*');
      if (data) setDepartments(data);
    }
    getDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let filePath = null;

    // 1. Upload File (kalau ada)
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('ticket-attachments')
        .upload(fileName, file);
        
      if (error) { alert('Gagal upload file: ' + error.message); return; }
      filePath = data.path;
    }

    // 2. Simpan Tiket ke Database
    const { error } = await supabase.from('tickets').insert([
      { 
        subject, 
        description, 
        department_id: selectedDept,
        ticket_number: 'TKT-' + Math.floor(Math.random() * 10000), // Generate ID simpel
        // client_id: '...', // Nanti diisi setelah Auth beres
      }
    ]);

    if (error) {
      alert('Gagal buat tiket: ' + error.message);
    } else {
      alert('Tiket berhasil dikirim!');
      setSubject('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md space-y-4">
      <h2 className="text-xl font-bold">Buat Tiket Baru</h2>
      <input type="text" placeholder="Subject" className="w-full p-2 border" 
        onChange={(e) => setSubject(e.target.value)} required />
      
      <textarea placeholder="Deskripsi Masalah" className="w-full p-2 border" 
        onChange={(e) => setDescription(e.target.value)} required />

      <select className="w-full p-2 border" onChange={(e) => setSelectedDept(e.target.value)} required>
        <option value="">Pilih Departemen</option>
        {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Kirim Tiket</button>
    </form>
  );
}