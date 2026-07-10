'use client';
import AuthCard from '@/components/AuthCard';

export default function AdminLoginPage() {
  return (
    <AuthCard 
      title="Login Admin Helpdesk" 
      description="Khusus Staf TI / Admin Universitas."
      footer={<p className="text-xs">Hanya untuk otorisasi staf resmi.</p>}
    >
      <form className="space-y-4">
        <div className="field">
          <label>Admin ID</label>
          <input type="text" placeholder="Masukkan ID Staf..." required />
        </div>
        <div className="field">
          <label>Password Admin</label>
          <input type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" className="btn btn-gold w-full mt-2" style={{ backgroundColor: 'var(--ink)' }}>
          Masuk sebagai Admin
        </button>
      </form>
    </AuthCard>
  );
}