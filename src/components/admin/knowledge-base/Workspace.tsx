'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function KnowledgeBaseWorkspace() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryTree, setCategoryTree] = useState<any[]>([]);
  const [flattenedCategories, setFlattenedCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // State for expanded tree nodes
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    content: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ msg, type });
  };

  const fetchData = async () => {
    setLoading(true);
    // Fetch articles
    const { data: kbData } = await supabase
      .from('knowledge_base')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });
    
    if (kbData) setArticles(kbData);

    // Fetch categories
    const { data: catData } = await supabase
      .from('categories')
      .select('id, name, parent_id')
      .eq('is_active', true)
      .order('name');
      
    if (catData) {
      setCategories(catData);
      
      // Build tree
      const map = new Map();
      const tree: any[] = [];
      
      // First pass: map nodes
      catData.forEach(cat => {
        map.set(cat.id, { ...cat, children: [] });
      });
      
      // Second pass: link parent to children
      catData.forEach(cat => {
        if (cat.parent_id && map.has(cat.parent_id)) {
          map.get(cat.parent_id).children.push(map.get(cat.id));
        } else {
          tree.push(map.get(cat.id));
        }
      });
      setCategoryTree(tree);

      // Flatten for dropdown
      const flatten = (nodes: any[], parentName = '') => {
        let res: any[] = [];
        nodes.forEach(node => {
          const name = parentName ? `${parentName} > ${node.name}` : node.name;
          res.push({ id: node.id, name });
          if (node.children && node.children.length > 0) {
            res = res.concat(flatten(node.children, name));
          }
        });
        return res;
      };
      setFlattenedCategories(flatten(tree));
    }
    setLoading(false);
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenModal = (article: any = null) => {
    if (article) {
      setEditingId(article.id);
      setFormData({
        title: article.title,
        slug: article.slug,
        category_id: article.category_id?.toString() || '',
        content: article.content || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        slug: '',
        category_id: '',
        content: ''
      });
    }
    setIsModalOpen(true);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title) // Auto generate slug if empty
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        content: formData.content
      };

      if (editingId) {
        await supabase.from('knowledge_base').update(payload).eq('id', editingId);
      } else {
        await supabase.from('knowledge_base').insert([payload]);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      showToast('Gagal menyimpan artikel', 'error');
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await supabase.from('knowledge_base').delete().eq('id', deleteId);
      showToast('Artikel berhasil dihapus', 'success');
      setDeleteId(null);
      fetchData();
    }
  };

  // Komponen Node Pohon Kategori
  const CategoryNode = ({ category, level = 0 }: { category: any, level?: number }) => {
    const isExpanded = expandedCategories[category.id];
    const categoryArticles = articles.filter(a => a.category_id === category.id);
    const totalItems = categoryArticles.length + (category.children?.length || 0);
    
    return (
      <div className="w-full border-b border-gray-100 last:border-0">
         <div 
           className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors`}
           style={{ paddingLeft: `${(level * 32) + 16}px` }}
           onClick={() => toggleCategory(category.id)}
         >
           <div className="flex items-center gap-3">
             <svg className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
             <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
             <span className="font-semibold text-gray-700">{category.name}</span>
             <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs font-medium">{totalItems} item</span>
           </div>
         </div>
         
         {isExpanded && (
           <div className="w-full bg-white">
             {categoryArticles.map(article => (
               <div key={article.id} className="flex items-center justify-between p-3 border-b border-gray-50 hover:bg-gray-50/50 group" style={{ paddingLeft: `${((level + 1) * 32) + 16}px` }}>
                 <div className="flex items-center gap-3">
                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                   <span className="font-medium text-gray-800">{article.title}</span>
                   <span className="font-mono text-xs text-gray-400 hidden md:inline-block ml-2">{article.slug}</span>
                 </div>
                 
                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                   <a href={`/knowledgebase/article/${article.slug}`} target="_blank" rel="noreferrer" className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Artikel">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                   </a>
                   <button onClick={(e) => { e.stopPropagation(); handleOpenModal(article); }} className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Edit Artikel">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                   </button>
                   <button onClick={(e) => { e.stopPropagation(); confirmDelete(article.id); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Artikel">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                   </button>
                 </div>
               </div>
             ))}
             
             {/* Render Subcategories */}
             {category.children?.map((child: any) => (
               <CategoryNode key={child.id} category={child} level={level + 1} />
             ))}
             
             {categoryArticles.length === 0 && (!category.children || category.children.length === 0) && (
               <div className="p-4 text-sm text-gray-400 italic" style={{ paddingLeft: `${((level + 1) * 32) + 16}px` }}>
                 Tidak ada artikel atau sub-kategori
               </div>
             )}
           </div>
         )}
      </div>
    )
  }

  // Cari artikel yang tidak memiliki kategori untuk ditampilkan di bagian "Umum" atau "Lainnya"
  const uncategorizedArticles = articles.filter(a => !a.category_id);

  return (
    <div className="flex flex-col items-start gap-6 w-full relative">
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 font-medium text-white ${toastMessage.type === 'error' ? 'bg-red-500' : 'bg-[#10B981]'}`}>
            {toastMessage.type === 'success' && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>}
            {toastMessage.msg}
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setDeleteId(null)}></div>
          <div className="bg-white rounded-xl shadow-xl p-6 w-[400px] relative">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-colors">Hapus Artikel</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col items-start gap-1 w-fit">
          <div className="flex items-start gap-2 w-full">
            <div className="flex flex-col items-start w-fit h-full">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                Dashboard
              </p>
            </div>
            <div className="flex flex-col items-start w-fit h-full">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                /
              </p>
            </div>
            <div className="flex flex-col items-start w-fit h-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                Basis Pengetahuan
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-fit tracking-[-0.02em]">
              Basis Pengetahuan
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex w-full justify-end items-center mb-4">
        <button 
          onClick={() => {
            setFormData({ title: '', slug: '', category_id: '', content: '' });
            setIsModalOpen(true);
          }}
          className="flex h-9 px-4 items-center gap-2 rounded bg-[#001E40] text-white shadow-sm hover:bg-[#00142d] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/></svg>
          <span className="text-white font-iBMPlexSans text-sm font-medium">Tambah Artikel</span>
        </button>
      </div>

      <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full overflow-hidden relative">
        <div className="flex flex-col w-full bg-white relative">
          <div className="border-b border-b-[#C3C6D1] bg-[#F3F3F6] px-6 py-4">
            <span className="text-[#43474F] font-iBMPlexSans text-[11px] font-bold tracking-[0.05em]">
              STRUKTUR KATEGORI & ARTIKEL
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--gold)] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="w-full flex flex-col divide-y divide-gray-100">
              {categoryTree.map(category => (
                <CategoryNode key={category.id} category={category} />
              ))}

              {/* Tampilkan kategori "Lainnya" jika ada artikel tanpa kategori */}
              {uncategorizedArticles.length > 0 && (
                <div className="w-full border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                      <span className="font-semibold text-gray-700">Lainnya (Tanpa Kategori)</span>
                      <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">{uncategorizedArticles.length} artikel</span>
                    </div>
                  </div>
                  <div className="w-full bg-white">
                    {uncategorizedArticles.map(article => (
                      <div key={article.id} className="flex items-center justify-between p-3 border-b border-gray-50 hover:bg-gray-50/50 group" style={{ paddingLeft: '48px' }}>
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                          <span className="font-medium text-gray-800">{article.title}</span>
                          <span className="font-mono text-xs text-gray-400 hidden md:inline-block ml-2">{article.slug}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                          <a href={`/knowledgebase/article/${article.slug}`} target="_blank" rel="noreferrer" className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Artikel">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                          </a>
                          <button onClick={() => handleOpenModal(article)} className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Edit Artikel">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                          </button>
                          <button onClick={() => confirmDelete(article.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Artikel">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {categoryTree.length === 0 && uncategorizedArticles.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500">
                  Belum ada kategori maupun artikel.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Artikel' : 'Tambah Artikel'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="kbForm" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul Artikel</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--gold)] outline-none bg-gray-50/50"
                    placeholder="Contoh: Cara Reset Password SSO"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori Terkait</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--gold)] outline-none bg-gray-50/50"
                    >
                      <option value="">-- Pilih Kategori --</option>
                      {flattenedCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Digunakan bot WA untuk mencocokkan masalah.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug (URL)</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--gold)] outline-none bg-gray-50/50 font-mono text-sm"
                      placeholder="contoh-slug-artikel"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Konten Artikel</label>
                  <textarea 
                    required 
                    rows={10}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--gold)] outline-none bg-gray-50/50"
                    placeholder="Ketik isi artikel panduan di sini..."
                  ></textarea>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-200 bg-gray-100 transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit" 
                form="kbForm"
                className="px-5 py-2.5 rounded-xl font-medium text-white hover:bg-[var(--gold-dim)] bg-[var(--gold)] transition-colors shadow-sm"
              >
                {editingId ? 'Simpan Perubahan' : 'Tambah Artikel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
