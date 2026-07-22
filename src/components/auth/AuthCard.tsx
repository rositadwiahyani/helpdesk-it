import { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

// Pastikan ada 'export default' supaya dikenali sebagai module
export default function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[var(--paper)]">
      {/* Tambahin class 'text-center' di sini biar judul & teks ke tengah */}
      <div className="w-full max-w-md bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)] border border-[var(--line)] text-center">
        
        <h2 className="text-2xl font-bold mb-2 text-[var(--gold-dim)]">{title}</h2>
        <p className="text-[var(--text-dim)] mb-6 text-sm">{description}</p>
        
        {/* Supaya form input tetap rata kiri (biar rapi), kita bikin div khusus buat form */}
        <div className="text-left">
          {children}
        </div>
        
<div className="w-full max-w-md my-auto bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)] border border-[var(--line)] text-center"></div>
        <div className="text-center text-sm text-[var(--text-dim)] mt-6">
          {footer}
        </div>
      </div>
    </div>
  );
}