'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import { supabase } from '@/lib/supabase';

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');

  const translateCategory = (name: string) => {
    if (language === 'ID') return name;
    const dictionary: Record<string, string> = {
      'Aplikasi': 'Applications',
      'Cyber dan Security': 'Cyber and Security',
      'Jaringan dan Internet': 'Network and Internet',
      'Website dan Email': 'Website and Email',
      'Email': 'Email',
      'Website': 'Website',
      'Domain': 'Domain',
      'Keamanan Sistem': 'System Security',
      'E-office': 'E-office',
      'VM': 'Virtual Machine',
      'Licensi': 'License',
      'Lupa Password': 'Forgot Password',
      'SIAP': 'SIAP',
      'Gentayu': 'Gentayu',
      'SSO': 'SSO',
      'Mandala': 'Mandala',
      'Wifi': 'Wifi',
      'Gagal TTE (Tanda Tangan Elektronik)': 'Failed TTE (Electronic Signature)',
      'Ubah Email Recovery': 'Change Recovery Email',
      'Aplikasi Down / Error 500': 'Application Down / Error 500',
      'Backdoor': 'Backdoor',
      'Data Tidak Sinkron': 'Data Not Synced',
      'Tidak Kompatibel di Browser': 'Browser Incompatible',
      'Gagal Sinkronisasi Pembayaran': 'Payment Sync Failed',
      'Error Sinkronisasi KRS': 'KRS Sync Error',
      'Aplikasi Crash / White Screen': 'App Crash / White Screen',
      'Indikasi Malware / Script Ilegal': 'Malware Indication / Illegal Script',
      'Akses Tidak Dikenal': 'Unknown Access',
      'Serangan DDoS': 'DDoS Attack',
      'Kebocoran Data (Data Breach)': 'Data Breach',
      'Tidak Bisa Connect (Auth Error)': 'Cannot Connect (Auth Error)',
      'Sering Putus / Disconnect': 'Frequent Disconnects',
      'Gagal Login VPN': 'VPN Login Failed',
      'Aplikasi Internal Tidak Bisa Diakses': 'Internal App Inaccessible',
      'Server Tidak Bisa Diremote (RDP/SSH)': 'Server Cannot be Remoted (RDP/SSH)',
      'Setting DNS (A Record/CNAME)': 'DNS Setting (A Record/CNAME)',
      'Request SSL Certificate': 'Request SSL Certificate',
      'Permintaan Pembuatan Subdomain': 'Subdomain Creation Request',
      'Inbox Penuh / Bouncing': 'Inbox Full / Bouncing',
      'Terkena Spam / Phishing': 'Spam / Phishing Target',
      'Request Lisensi Zoom / Office 365': 'Zoom / Office 365 License Request',
      'Halaman Website Error / Blank': 'Website Error / Blank Page'
    };
    return dictionary[name] || name;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ID' | 'EN';
    if (savedLang) setLanguage(savedLang);

    const handleLanguageChange = () => {
      const currentLang = localStorage.getItem('language') as 'ID' | 'EN';
      if (currentLang) setLanguage(currentLang);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    // Knowledge base is public, no login check needed
    // Removed isLoggedIn check

    if (!slug) return;

    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select(`*, categories(name)`)
        .eq('slug', slug)
        .single();
        
      console.log('Fetching slug:', slug, 'Data:', data, 'Error:', error);
      
      if (data && !error) {
        setArticle(data);
        if (data.categories && data.categories.name) {
          setCategoryName(data.categories.name);
        }
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug, router]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--gold)] rounded-full animate-spin"></div>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{language === 'EN' ? '404 - Article Not Found' : '404 - Artikel Tidak Ditemukan'}</h1>
            <Link href="/knowledgebase" className="text-[var(--gold)] hover:underline">&larr; {language === 'EN' ? 'Back to Knowledgebase' : 'Kembali ke Pusat Pengetahuan'}</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Format date
  const dateStr = new Date(article.created_at).toLocaleDateString(language === 'EN' ? 'en-US' : 'id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50/60 pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          
          <div className="px-8 pt-10 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-6 uppercase tracking-wider">
              <Link href="/knowledgebase" className="hover:text-[var(--gold)]">Knowledgebase</Link>
              <span>/</span>
              <span className="text-gray-600">{categoryName ? translateCategory(categoryName) : (language === 'EN' ? 'Article' : 'Artikel')}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {language === 'EN' && article.title_en ? article.title_en : article.title}
            </h1>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              {language === 'EN' ? 'Updated' : 'Diperbarui'}: {dateStr}
            </div>
          </div>

          <div className="p-8 md:p-10 text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
            {language === 'EN' && article.content_en ? article.content_en : article.content}
          </div>

          <div className="bg-gray-50 p-8 text-center border-t border-gray-100">
            <p className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wider">
              {language === 'EN' ? 'Was this article helpful?' : 'Apakah artikel ini membantu?'}
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl hover:border-green-500 hover:text-green-600 font-medium transition-all shadow-sm">
                👍 {language === 'EN' ? 'Yes, very helpful' : 'Ya, sangat membantu'}
              </button>
              <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl hover:border-red-500 hover:text-red-600 font-medium transition-all shadow-sm">
                👎 {language === 'EN' ? 'Not helpful' : 'Tidak membantu'}
              </button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}