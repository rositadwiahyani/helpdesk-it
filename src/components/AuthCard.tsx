import { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[var(--paper)]">
      {/* Kartu Login/Register */}
      <div className="w-full max-w-md bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)] border border-[var(--line)]">
        
        {/* Judul & Deskripsi */}
        <h2 className="text-2xl font-bold mb-2 text-[var(--gold-dim)]">{title}</h2>
        <p className="text-[var(--text-dim)] mb-6 text-sm">{description}</p>
        
        {/* Form Login/Register (isinya dikirim dari parent) */}
        {children}
        
        {/* Footer (Link daftar/masuk) */}
        <div className="text-center text-sm text-[var(--text-dim)] mt-6">
          {footer}
        </div>
      </div>
    </div>
  );
}