import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { fetchClient } from '@/lib/apiClient';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddCategoryModal({ isOpen, onClose, onSuccess }: ModalProps) {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [botContent, setBotContent] = useState('');
  const [defaultPriority, setDefaultPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      supabase.from('categories').select('id, name').order('name').then(({ data }) => {
        if (data) setCategories(data);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload: any = { 
      name, 
      is_active: true,
      bot_content: botContent || null,
      default_priority: defaultPriority 
    };
    
    if (parentId) {
      payload.parent_id = parseInt(parentId);
    }
    
    
    try {
      await fetchClient('/admin/categories', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      onSuccess();
      onClose();
      setName('');
      setParentId('');
      setBotContent('');
      setDefaultPriority('MEDIUM');
    } catch (err) {
      console.error(err);
      alert('Gagal menambah kategori');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-[#C3C6D1]">
          <h2 className="text-xl font-bold text-[#1A1C1E]">Tambah Kategori</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#1A1C1E"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Nama Kategori</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB]" placeholder="Masukkan nama kategori" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Parent Kategori (Opsional)</label>
            <select 
              value={parentId} 
              onChange={e => setParentId(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] bg-white"
            >
              <option value="">-- Kategori Utama (Root) --</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Prioritas Default</label>
            <p className="text-xs text-slate-500 mb-2">Jika pelapor memilih kategori ini, tiket otomatis mendapat prioritas ini.</p>
            <select 
              value={defaultPriority} 
              onChange={e => setDefaultPriority(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] bg-white"
            >
              <option value="LOW">Rendah (Low)</option>
              <option value="MEDIUM">Sedang (Medium)</option>
              <option value="HIGH">Tinggi (High)</option>
              <option value="CRITICAL">Kritis (Critical)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Tutorial / Solusi Mandiri (Bot WA)</label>
            <p className="text-xs text-slate-500 mb-2">Isi jika ini adalah menu terakhir (leaf node) dan Anda ingin bot membalas dengan link/teks tutorial tanpa langsung membuat tiket.</p>
            <textarea 
              value={botContent} 
              onChange={e => setBotContent(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] min-h-[100px]"
              placeholder="Contoh: Silakan ikuti panduan reset password pada link berikut: https://sso.undip.ac.id/help"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-[#43474F] hover:bg-gray-100 rounded transition-colors">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white bg-[#001E40] hover:bg-[#00142d] rounded transition-colors disabled:opacity-50">Simpan</button>
          </div>
        </form>
      </div>
    </>
  );
}

export function AddSubcategoryModal({ isOpen, onClose, onSuccess, categoryId }: ModalProps & { categoryId: string | null }) {
  const [name, setName] = useState('');
  const [botContent, setBotContent] = useState('');
  const [defaultPriority, setDefaultPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;
    setLoading(true);
    
    try {
      await fetchClient('/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ 
          name, 
          parent_id: parseInt(categoryId), 
          is_active: true,
          bot_content: botContent || null,
          default_priority: defaultPriority
        })
      });
      onSuccess();
      onClose();
      setName('');
      setBotContent('');
      setDefaultPriority('MEDIUM');
    } catch (err) {
      console.error(err);
      alert('Gagal menambah subkategori');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-[#C3C6D1]">
          <h2 className="text-xl font-bold text-[#1A1C1E]">Tambah Subkategori</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#1A1C1E"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Nama Subkategori</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Prioritas Default</label>
            <p className="text-xs text-slate-500 mb-2">Jika pelapor memilih kategori ini, tiket otomatis mendapat prioritas ini.</p>
            <select 
              value={defaultPriority} 
              onChange={e => setDefaultPriority(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] bg-white"
            >
              <option value="LOW">Rendah (Low)</option>
              <option value="MEDIUM">Sedang (Medium)</option>
              <option value="HIGH">Tinggi (High)</option>
              <option value="CRITICAL">Kritis (Critical)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Tutorial / Solusi Mandiri (Bot WA)</label>
            <p className="text-xs text-slate-500 mb-2">Isi jika ini adalah menu terakhir (leaf node) dan Anda ingin bot membalas dengan link/teks tutorial tanpa langsung membuat tiket.</p>
            <textarea 
              value={botContent} 
              onChange={e => setBotContent(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] min-h-[100px]"
              placeholder="Contoh: Silakan ikuti panduan reset password pada link berikut: https://sso.undip.ac.id/help"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-[#43474F] hover:bg-gray-100 rounded transition-colors">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white bg-[#001E40] hover:bg-[#00142d] rounded transition-colors disabled:opacity-50">Simpan</button>
          </div>
        </form>
      </div>
    </>
  );
}

export function EditItemModal({ isOpen, onClose, onSuccess, target }: ModalProps & { target: any }) {
  const [name, setName] = useState('');
  const [botContent, setBotContent] = useState('');
  const [defaultPriority, setDefaultPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen && target) {
      setName(target.title);
      
      // Fetch full details since target from tree might not have bot_content
      supabase.from('categories').select('*').eq('id', parseInt(target.id)).single()
        .then(({ data }) => {
          if (data) {
            setBotContent(data.bot_content || '');
            setDefaultPriority(data.default_priority || 'MEDIUM');
          }
        });
    }
  }, [isOpen, target]);

  if (!isOpen || !target) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const realId = target.id;
    
    try {
      await fetchClient(`/admin/categories/${parseInt(realId)}`, {
        method: 'PUT',
        body: JSON.stringify({
          name, 
          bot_content: botContent || null,
          default_priority: defaultPriority
        })
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Gagal mengubah data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-[#C3C6D1]">
          <h2 className="text-xl font-bold text-[#1A1C1E]">Edit {target.type === 'category' ? 'Kategori' : 'Subkategori'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#1A1C1E"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Nama</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB]" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Prioritas Default</label>
            <p className="text-xs text-slate-500 mb-2">Jika pelapor memilih kategori ini, tiket otomatis mendapat prioritas ini.</p>
            <select 
              value={defaultPriority} 
              onChange={e => setDefaultPriority(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] bg-white"
            >
              <option value="LOW">Rendah (Low)</option>
              <option value="MEDIUM">Sedang (Medium)</option>
              <option value="HIGH">Tinggi (High)</option>
              <option value="CRITICAL">Kritis (Critical)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#43474F] mb-1">Tutorial / Solusi Mandiri (Bot WA)</label>
            <p className="text-xs text-slate-500 mb-2">Isi jika ini adalah menu terakhir (leaf node) dan Anda ingin bot membalas dengan link/teks tutorial tanpa langsung membuat tiket.</p>
            <textarea 
              value={botContent} 
              onChange={e => setBotContent(e.target.value)} 
              className="w-full px-4 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] min-h-[100px]"
              placeholder="Contoh: Silakan ikuti panduan reset password pada link berikut: https://sso.undip.ac.id/help"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-[#43474F] hover:bg-gray-100 rounded transition-colors">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white bg-[#001E40] hover:bg-[#00142d] rounded transition-colors disabled:opacity-50">Simpan</button>
          </div>
        </form>
      </div>
    </>
  );
}
