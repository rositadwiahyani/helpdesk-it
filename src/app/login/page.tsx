'use client';
import Link from 'next/link';
import AuthCard from '@/components/AuthCard';

export default function LoginPage() {
  return (
    <AuthCard 
      title="Masuk ke Helpdesk" 
      description="Gunakan akun SSO Undip untuk masuk."
      footer={<>Belum punya akun? <Link href="/register" className="text-[var(--gold)] font-bold">Daftar sekarang</Link></>}
    >
      <form className="space-y-4">
        <div className="field">
          <label>NIM / Email</label>
          <input type="text" placeholder="Masukkan NIM atau email..." required />
        </div>
        <div className="field">
          <label>Kata Sandi</label>
          <input type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" className="btn btn-gold w-full mt-2">Masuk</button>
      </form>
    </AuthCard>
  );
}