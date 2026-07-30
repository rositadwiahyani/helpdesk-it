"use client";

import React, { useState, useEffect } from 'react';
import { fetchClient } from '@/lib/apiClient';

export default function QuickRepliesPage() {
    const [replies, setReplies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, title: '', content: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadReplies();
    }, []);

    const loadReplies = async () => {
        setLoading(true);
        try {
            const res = await fetchClient('/admin/quick-replies');
            setReplies(res || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (formData.id) {
                await fetchClient(`/admin/quick-replies/${formData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ title: formData.title, content: formData.content })
                });
            } else {
                await fetchClient('/admin/quick-replies', {
                    method: 'POST',
                    body: JSON.stringify({ title: formData.title, content: formData.content })
                });
            }
            setIsModalOpen(false);
            loadReplies();
        } catch (error) {
            console.error(error);
            alert('Gagal menyimpan template');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus template ini?')) return;
        try {
            await fetchClient(`/admin/quick-replies/${id}`, { method: 'DELETE' });
            loadReplies();
        } catch (error) {
            console.error(error);
            alert('Gagal menghapus template');
        }
    };

    const openModal = (reply?: any) => {
        if (reply) {
            setFormData({ id: reply.id, title: reply.title, content: reply.content });
        } else {
            setFormData({ id: null, title: '', content: '' });
        }
        setIsModalOpen(true);
    };

    return (
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Template Balasan Cepat</h1>
                    <p className="text-sm text-slate-500 mt-1">Kelola template teks yang sering digunakan untuk membalas pelapor via WhatsApp.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0059BB] text-white rounded-lg text-sm font-semibold hover:bg-[#004a99] transition-colors shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Template
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Memuat data...</div>
                ) : replies.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">Belum ada template. Silakan buat baru.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                                <th className="px-6 py-4 font-semibold text-sm w-1/4">Judul Template</th>
                                <th className="px-6 py-4 font-semibold text-sm">Isi Pesan</th>
                                <th className="px-6 py-4 font-semibold text-sm text-right w-32">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {replies.map(reply => (
                                <tr key={reply.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{reply.title}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-pre-wrap">{reply.content}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => openModal(reply)}
                                                className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(reply.id)}
                                                className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-800">{formData.id ? 'Edit Template' : 'Tambah Template'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Template</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.title} 
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    placeholder="Contoh: Tiket Diterima"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Isi Pesan WhatsApp</label>
                                <textarea 
                                    required 
                                    rows={5}
                                    value={formData.content} 
                                    onChange={e => setFormData({...formData, content: e.target.value})}
                                    placeholder="Ketik isi pesan WhatsApp di sini..."
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                                ></textarea>
                                <p className="text-xs text-slate-500 mt-2">Pesan ini akan dikirimkan persis sesuai teks yang Anda ketik.</p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={saving}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-[#0059BB] hover:bg-[#004a99] rounded-lg transition-colors disabled:opacity-70 flex items-center gap-2"
                                >
                                    {saving && <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
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
