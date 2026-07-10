'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileView from '@/components/ProfileView'; // Import komponennya

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50/60 pt-32 pb-20 px-4">
        <ProfileView />
      </main>
      <Footer />
    </>
  );
}