'use client';
import Link from 'next/link';
import AuthCard from '@/components/AuthCard';

export default function RegisterPage() {
  return (
    <AuthCard 
      title="Buat Akun Baru" 
      description="Lengkapi data diri untuk mendaftar."
      footer={<>Sudah punya akun? <Link href="/login" className="text-[var(--gold)] font-bold">Masuk di sini</Link></>}
    >
      <form className="space-y-4">
        <div className="field">
          <label>Nama Lengkap</label>
          <input type="text" placeholder="John Doe" required />
        </div>
        <div className="field">
          <label>NIM</label>
          <input type="text" placeholder="211201xxxxxx" required />
        </div>
        <div className="field">
          <label>Email Undip</label>
          <input type="email" placeholder="mahasiswa@students.undip.ac.id" required />
        </div>
        <button type="submit" className="btn btn-gold w-full mt-2">Daftar</button>
      </form>
    </AuthCard>
  );
}