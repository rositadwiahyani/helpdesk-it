import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <div className="relative h-12 w-auto flex items-center">
                <Image 
                  src="/universitas-diponegoro-helpit1.png" 
                  alt="Logo HelpIT Undip" 
                  width={200} 
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </div>
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