'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function KnowledgeBaseWorkspace() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    content: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // Fetch articles
    const { data: kbData } = await supabase
      .from('knowledge_base')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });
    
    if (kbData) setArticles(kbData);

    // Fetch categories for dropdown (ideally leaf categories, but let's fetch all active)
    const { data: catData } = await supabase
      .from('categories')
      .select('id, name, parent_id')
      .eq('is_active', true)
      .order('name');
      
    if (catData) setCategories(catData);
    setLoading(false);
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
      alert('Gagal menyimpan artikel');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      await supabase.from('knowledge_base').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Basis Pengetahuan</h2>
          <p className="text-sm text-gray-500">Kelola artikel panduan yang terhubung dengan Bot WhatsApp</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[var(--gold)] hover:bg-[var(--gold-dim)] text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Tambah Artikel
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--gold)] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Judul Artikel</th>
                <th className="px-6 py-4 font-semibold">Kategori Terkait</th>
                <th className="px-6 py-4 font-semibold">Slug (URL)</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                      {item.categories?.name || 'Umum'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{item.slug}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/knowledgebase/article/${item.slug}`} target="_blank" rel="noreferrer" className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Artikel">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </a>
                      <button onClick={() => handleOpenModal(item)} className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Edit Artikel">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Artikel">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {articles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Belum ada artikel. Silakan tambah artikel baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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
                      {categories.map(cat => (
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
