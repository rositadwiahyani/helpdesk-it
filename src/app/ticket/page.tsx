'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Panggil form yang udah lu bikin
import TicketForm from '@/components/TicketForm'; 

export default function BukaTiketPage() {
  const router = useRouter();

  // Wajib login buat akses ini
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50/60 pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Buka Tiket Bantuan</h1>
            <p className="text-gray-500 mt-2">Laporkan kendala teknis Anda. Tim IT Helpdesk akan segera merespons.</p>
          </div>

          {/* Panggil komponen UI Form-nya di sini */}
          <TicketForm />

        </div>
      </main>
      <Footer />
    </>
  );
}