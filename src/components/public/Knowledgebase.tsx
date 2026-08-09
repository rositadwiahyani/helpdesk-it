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
  const [categories, setCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);

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
    const fetchData = async () => {
      const { data: catsData } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

      const { data: artsData } = await supabase
        .from('knowledge_base')
        .select(`id, slug, title, content, category_id, categories(name)`)
        .order('created_at', { ascending: false });

      if (catsData) setCategories(catsData);
      if (artsData) setArticles(artsData);
      
      setLoading(false);
    };
    fetchData();
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

  // Get Breadcrumbs for current folder
  const getBreadcrumbs = (categoryId: number | null) => {
    if (!categoryId) return [];
    const breadcrumbs = [];
    let currentId: number | null = categoryId;
    while (currentId !== null) {
      const cat = categories.find(c => c.id === currentId);
      if (cat) {
        breadcrumbs.unshift(cat);
        currentId = cat.parent_id;
      } else {
        break;
      }
    }
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentCategoryId);

  // Check if current category is a top-level category
  const isTopLevel = currentCategoryId === null || categories.find(c => c.id === currentCategoryId)?.parent_id === null;

  // Helper to get all descendant category IDs
  const getAllDescendantIds = (catId: number) => {
    const descendantIds: number[] = [];
    const findDescendants = (id: number) => {
      const children = categories.filter(c => c.parent_id === id);
      for (const child of children) {
        descendantIds.push(child.id);
        findDescendants(child.id);
      }
    };
    findDescendants(catId);
    return descendantIds;
  };

  // Get contents for current folder
  let currentSubCategories: any[] = [];
  let currentArticles: any[] = [];

  if (isTopLevel) {
    // If Top Level (e.g. root or Aplikasi), show its direct subcategories
    currentSubCategories = categories.filter(c => c.parent_id === currentCategoryId);
    // And its direct articles
    currentArticles = articles.filter(a => a.category_id === currentCategoryId);
  } else {
    // If NOT Top Level (e.g. E-office), skip subcategories entirely and show ALL descendant articles directly!
    const descendantIds = currentCategoryId ? [currentCategoryId, ...getAllDescendantIds(currentCategoryId)] : [];
    currentArticles = articles.filter(a => descendantIds.includes(a.category_id));
  }
  
  // Articles with no category (only show at root)
  const uncategorizedArticles = currentCategoryId === null ? articles.filter(a => !a.category_id) : [];

  return (
    <div className="w-full pb-12">
      <section className="relative text-center mb-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center">{t.title}</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto text-center">
          {t.subtitle}
        </p>
      </section>

      <section className="relative mb-16 flex justify-center">
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
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--gold)] rounded-full animate-spin"></div>
          </div>
        ) : activeQuery ? (
          // View Pencarian (Flat List)
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800">
                {t.searchResultFor} <span className="text-[var(--gold)]">"{activeQuery}"</span>
              </h2>
            </div>
            {filteredArticles.length > 0 ? (
              <div className="quick-grid" style={{ marginTop: 0 }}>
                {filteredArticles.map((art, idx) => (
                  <Link href={`/knowledgebase/article/${art.slug}`} key={idx} className="quick-card group" style={{textDecoration: 'none'}}>
                    <div className="quick-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                    </div>
                    <h3 className="group-hover:text-blue-600 transition-colors">{art.title}</h3>
                    <p className="line-clamp-2 flex-grow text-gray-500 mb-2">
                      {art.categories?.name || 'Umum'}
                    </p>
                    <div className="quick-link">
                      <span>{t.viewText}</span>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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
          </div>
        ) : (
          // View Folder Drill-down
          <div className="flex flex-col">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 text-sm md:text-base">
              <button 
                onClick={() => setCurrentCategoryId(null)}
                className={`flex items-center gap-2 font-medium transition-colors ${currentCategoryId === null ? 'text-gray-800' : 'text-gray-500 hover:text-blue-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Semua Kategori
              </button>
              
              {breadcrumbs.map((crumb, idx) => (
                <div key={crumb.id} className="flex items-center gap-2">
                  <span className="text-gray-400">/</span>
                  <button 
                    onClick={() => setCurrentCategoryId(crumb.id)}
                    className={`font-medium transition-colors ${idx === breadcrumbs.length - 1 ? 'text-gray-800' : 'text-gray-500 hover:text-blue-600'}`}
                  >
                    {crumb.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Content for Current Folder */}
            {currentSubCategories.length === 0 && currentArticles.length === 0 && uncategorizedArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">Folder ini kosong.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {/* Render Folders (Subcategories) */}
                {currentSubCategories.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                      {currentCategoryId === null ? 'Kategori Utama' : 'Sub Kategori'}
                    </h3>
                    <div className="quick-grid" style={{ marginTop: 0 }}>
                      {currentSubCategories.map(cat => {
                        // Count all descendant articles
                        const descendantIds = [cat.id, ...getAllDescendantIds(cat.id)];
                        const totalArts = articles.filter(a => descendantIds.includes(a.category_id)).length;
                        
                        return (
                          <div 
                            key={cat.id}
                            onClick={() => setCurrentCategoryId(cat.id)}
                            className="quick-card cursor-pointer"
                          >
                            <div className="quick-icon">
                              <svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                            </div>
                            <h3>{cat.name}</h3>
                            <p>{totalArts} items</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Render Articles */}
                {(currentArticles.length > 0 || uncategorizedArticles.length > 0) && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Artikel
                    </h3>
                    <div className="quick-grid" style={{ marginTop: 0 }}>
                      {[...currentArticles, ...uncategorizedArticles].map(art => (
                        <Link href={`/knowledgebase/article/${art.slug}`} key={art.id} className="quick-card group" style={{textDecoration: 'none'}}>
                          <div className="quick-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                          </div>
                          <h3 className="group-hover:text-blue-600 transition-colors">{art.title}</h3>
                          <p className="line-clamp-2 flex-grow text-gray-500">
                            {art.content ? art.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : 'Tidak ada deskripsi.'}
                          </p>
                          <div className="quick-link">
                            <span>{t.viewText}</span>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
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