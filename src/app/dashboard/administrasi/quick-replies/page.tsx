"use client";

import React, { useState, useEffect } from 'react';
import { fetchClient } from '@/lib/apiClient';

export default function QuickRepliesPage() {
    const [replies, setReplies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, title: '', content: '' });
    const [saving, setSaving] = useState(false);

    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage(message);
        setToastType(type);
    };

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
            showToast('Template berhasil disimpan!', 'success');
        } catch (error) {
            console.error(error);
            showToast('Gagal menyimpan template', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus template ini?')) return;
        try {
            await fetchClient(`/admin/quick-replies/${id}`, { method: 'DELETE' });
            loadReplies();
            showToast('Template berhasil dihapus!', 'success');
        } catch (error) {
            console.error(error);
            showToast('Gagal menghapus template', 'error');
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
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both w-full h-full">
                <div className="flex flex-col items-start gap-6 w-full relative">
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
                                        Jawaban Cepat
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-fit tracking-[-0.02em]">
                                    Jawaban Cepat
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="flex w-full justify-end items-center w-full mb-4">
                        <button 
                            onClick={() => openModal()}
                            className="flex h-9 px-4 items-center gap-2 rounded bg-[#001E40] text-white shadow-sm hover:bg-[#00142d] transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                            <span className="text-white font-iBMPlexSans text-sm font-medium">Tambah Template</span>
                        </button>
                    </div>

                    <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full overflow-hidden relative">

                        <div className="flex flex-col w-full bg-white relative">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-4 border-b border-[#C3C6D1] w-full">
                                    <div className="w-12 h-12 border-4 border-[#0059BB] border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-[#43474F] font-iBMPlexSans text-sm">Memuat template...</p>
                                </div>
                            ) : replies.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-4 border-b border-[#C3C6D1] w-full">
                                    <p className="text-[#43474F] font-iBMPlexSans text-sm">Tidak ada template jawaban cepat yang ditemukan.</p>
                                </div>
                            ) : (
                                replies.map((reply, i) => (
                                    <div key={reply.id} className={`flex w-full py-4 px-6 items-center border-b border-[#C3C6D1] hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9F9FC]'}`}>
                                        <div className="flex-1 flex flex-col gap-1">
                                            <h4 className="text-[#1A1C1E] font-iBMPlexSans text-sm font-semibold">{reply.title}</h4>
                                            <p className="text-[#43474F] font-iBMPlexSans text-xs line-clamp-2">{reply.content}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => openModal(reply)}
                                                className="p-2 text-gray-400 hover:text-[#0059BB] hover:bg-blue-50 rounded"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(reply.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal form */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#F8F9FA]">
                                <h3 className="text-lg font-bold text-[#001E40] font-iBMPlexSans">
                                    {formData.id ? 'Edit Jawaban Cepat' : 'Tambah Jawaban Cepat'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                </button>
                            </div>
                            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#1A1C1E]">Judul Template <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full px-3 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] text-sm"
                                        placeholder="Misal: Info Jam Layanan"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#1A1C1E]">Isi Pesan <span className="text-red-500">*</span></label>
                                    <textarea 
                                        required
                                        rows={6}
                                        value={formData.content}
                                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                                        className="w-full px-3 py-2 border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] text-sm resize-none"
                                        placeholder="Tuliskan isi pesan template di sini..."
                                    />
                                </div>

                                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 border border-[#C3C6D1] text-[#43474F] rounded hover:bg-gray-50 text-sm font-semibold transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={saving}
                                        className="px-4 py-2 bg-[#001E40] text-white rounded hover:bg-[#00142d] text-sm font-semibold transition-colors disabled:opacity-50"
                                    >
                                        {saving ? 'Menyimpan...' : 'Simpan Template'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                
                {/* Toast Notification */}
                {toastMessage && (
                    <div className={`fixed bottom-4 right-4 px-4 py-3 rounded shadow-lg flex items-center gap-3 z-[60] animate-in slide-in-from-bottom-5 ${
                        toastType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {toastType === 'success' ? (
                            <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        ) : (
                            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        )}
                        <span className="text-sm font-medium">{toastMessage}</span>
                        <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
