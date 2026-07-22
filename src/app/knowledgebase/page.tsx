'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

// Panggil file komponen yang udah lu bikin
// (Pastikan nama file di folder components adalah Knowledgebase.tsx)
import Knowledgebase from '@/components/Knowledgebase'; 

export default function KnowledgebasePage() {
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
         {/* Panggil komponen UI-nya di sini */}
         <Knowledgebase /> 
      </main>
      <Footer />
    </>
  );
}