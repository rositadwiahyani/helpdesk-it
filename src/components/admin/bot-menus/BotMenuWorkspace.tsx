'use client';

import React, { useState, useEffect } from 'react';
import { fetchClient } from '@/lib/apiClient';

interface BotMenu {
  id: number;
  title: string;
  action_type: string;
  content: string | null;
  sort_order: number;
  is_active: boolean;
}

export default function BotMenuWorkspace() {
  const [menus, setMenus] = useState<BotMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState<any>({
    id: null,
    title: '',
    action_type: 'TEXT_REPLY',
    content: '',
    sort_order: 1,
    is_active: true
  });

  const loadMenus = async () => {
    setLoading(true);
    try {
      const res = await fetchClient('/admin/bot-menus');
      setMenus(res || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (formData.id) {
        await fetchClient(`/admin/bot-menus/${formData.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        await fetchClient('/admin/bot-menus', {
          method: 'POST',
          body: JSON.stringify({ ...formData, sort_order: menus.length + 1 })
        });
      }
      setIsModalOpen(false);
      loadMenus();
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan menu bot');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus menu ini?')) return;
    try {
      await fetchClient(`/admin/bot-menus/${id}`, { method: 'DELETE' });
      loadMenus();
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus menu');
    }
  };

  const openModal = (menu?: BotMenu) => {
    if (menu) {
      setFormData({ ...menu });
    } else {
      setFormData({
        id: null,
        title: '',
        action_type: 'TEXT_REPLY',
        content: '',
        sort_order: menus.length + 1,
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full text-slate-800 font-sans">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pengaturan Menu Bot</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola menu interaktif yang muncul di WhatsApp Bot.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="px-4 py-2 bg-[#0059BB] text-white rounded-lg text-sm font-semibold hover:bg-[#004a99]"
        >
          + Tambah Menu
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Memuat data...</div>
        ) : menus.length === 0 ? (
          <div className="p-8 text-center text-slate-500">Belum ada menu bot.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="px-6 py-4 text-sm font-semibold">Judul Menu</th>
                <th className="px-6 py-4 text-sm font-semibold">Tipe Aksi</th>
                <th className="px-6 py-4 text-sm font-semibold">Isi / Balasan</th>
                <th className="px-6 py-4 text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {menus.map((menu, i) => (
                <tr key={menu.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span className="text-slate-400">{i + 1}.</span> {menu.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {menu.action_type === 'CREATE_TICKET' ? 'Buat Tiket' : 
                     menu.action_type === 'CHECK_STATUS' ? 'Cek Status' : 'Balas Teks'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-[200px]">
                    {menu.content || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {menu.is_active ? 
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Aktif</span> : 
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">Nonaktif</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openModal(menu)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded mr-2">Edit</button>
                    <button onClick={() => handleDelete(menu.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">{formData.id ? 'Edit Menu' : 'Tambah Menu'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Menu (Tampil di WA)</label>
                <input 
                  type="text" required value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="Contoh: Info Kontak"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipe Aksi</label>
                <select 
                  value={formData.action_type} 
                  onChange={e => setFormData({...formData, action_type: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="CREATE_TICKET">Alur Pembuatan Tiket</option>
                  <option value="CHECK_STATUS">Alur Cek Status Tiket</option>
                  <option value="TEXT_REPLY">Balas dengan Teks (Kustom)</option>
                </select>
              </div>
              {formData.action_type === 'TEXT_REPLY' && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Isi Balasan Teks</label>
                  <textarea 
                    required rows={4} value={formData.content || ''} 
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="Tuliskan informasi atau FAQ di sini..."
                  ></textarea>
                </div>
              )}
              <div className="mb-6 flex items-center">
                <input 
                  type="checkbox" id="isActive" checked={formData.is_active}
                  onChange={e => setFormData({...formData, is_active: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Aktifkan Menu Ini</label>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold bg-slate-100 rounded-lg">Batal</button>
                <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-semibold text-white bg-[#0059BB] rounded-lg">
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
