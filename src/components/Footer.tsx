import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <svg className="brand-mark" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" stroke="#e7c866" strokeWidth="1.2" opacity="0.5"/>
                <path d="M20 6 C22 12 22 12 28 14 C22 16 22 16 20 22 C18 16 18 16 12 14 C18 12 18 12 20 6Z" fill="#e7c866"/>
                <path d="M20 18 C21.5 21.5 21.5 21.5 25 23 C21.5 24.5 21.5 24.5 20 28 C18.5 24.5 18.5 24.5 15 23 C18.5 21.5 18.5 21.5 20 18Z" fill="#c9a227"/>
              </svg>
              <span className="brand-text"><b style={{color: 'var(--paper)'}}>Helpdesk Undip</b></span>
            </div>
            <p>Layanan Teknologi Informasi Universitas Diponegoro — membantu urusan akun, sistem akademik, dan perangkat digital kampus.</p>
          </div>
          <div className="footer-col">
            <h4>Layanan</h4>
            <ul>
              <li><Link href="#">Buka tiket baru</Link></li>
              <li><Link href="#">Cek status tiket</Link></li>
              <li><Link href="#kb">Basis pengetahuan</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kontak</h4>
            <ul>
              <li><Link href="#">Jl. Prof. Soedarto, SH, Tembalang</Link></li>
              <li><Link href="mailto:helpdesk@undip.ac.id">helpdesk@undip.ac.id</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}