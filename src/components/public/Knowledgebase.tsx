'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function KnowledgebaseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    const q = searchParams.get('q') || '';
    setSearchQuery(q);
    setActiveQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select(`id, slug, title, content, categories(name)`)
        .order('created_at', { ascending: false });

      if (data && !error) {
        setArticles(data);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const t = {
    title: language === 'ID' ? 'Basis Pengetahuan IT' : 'IT Knowledgebase',
    subtitle: language === 'ID' 
      ? 'Temukan solusi teknis langsung tanpa menunggu antrean tiket.' 
      : 'Find technical solutions directly without waiting for a ticket queue.',
    searchPlaceholder: language === 'ID' ? 'Cari artikel atau kategori...' : 'Search articles or categories...',
    searchResultFor: language === 'ID' ? 'Hasil pencarian untuk:' : 'Search results for:',
    viewText: language === 'ID' ? 'Baca' : 'Read',
    notFoundTitle: language === 'ID' ? 'Artikel tidak ditemukan' : 'Article not found',
    notFoundDesc: language === 'ID' 
      ? 'Coba gunakan kata kunci lain atau periksa kembali ejaan pencarian kamu.' 
      : 'Try using another keyword or check your spelling.',
    clearSearch: language === 'ID' ? 'Hapus Pencarian' : 'Clear Search'
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchQuery);
    router.push(`/knowledgebase?q=${encodeURIComponent(searchQuery)}`, { scroll: false });
  };

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
    (art.categories?.name || '').toLowerCase().includes(activeQuery.toLowerCase())
  );

  return (
    <div className="w-full pb-12">
      <section className="relative text-center mb-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center">{t.title}</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto text-center">
          {t.subtitle}
        </p>
      </section>

      <section className="relative mb-20 flex justify-center">
        <div className="relative max-w-xl w-full px-4">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder} 
              className="w-full p-4 pl-6 pr-16 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[var(--gold)] outline-none"
            />
            <button 
              type="submit"
              className="absolute right-6 top-2.5 p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        {activeQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              {t.searchResultFor} <span className="text-[var(--gold)]">"{activeQuery}"</span>
            </h2>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--gold)] rounded-full animate-spin"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art, idx) => (
              <Link href={`/knowledgebase/article/${art.slug}`} key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[var(--gold)] transition-all group flex flex-col h-full">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{art.title}</h3>
                <p className="text-gray-500 text-sm mb-4 flex-grow">{art.categories?.name || 'Umum'}</p>
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 mt-auto pt-4 border-t border-gray-50">
                  <span className="text-[var(--gold)] group-hover:translate-x-1 transition-transform">{t.viewText} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.notFoundTitle}</h3>
            <p className="text-gray-500 max-w-sm mb-8">{t.notFoundDesc}</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveQuery('');
                router.push('/knowledgebase', { scroll: false });
              }}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              {t.clearSearch}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function Knowledgebase() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--gold)] rounded-full animate-spin"></div>
      </div>
    }>
      <KnowledgebaseContent />
    </Suspense>
  );
}