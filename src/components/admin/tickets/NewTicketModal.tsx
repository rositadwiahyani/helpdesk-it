'use client';

import React, { useState, useEffect } from 'react';

interface NewTicketModalProps {
  onClose: () => void;
  onSubmit: (ticketData: any) => void;
}

export default function NewTicketModal({ onClose, onSubmit }: NewTicketModalProps) {
  // Setup default date to today
  const today = new Date().toISOString().split('T')[0];

  const [categories, setCategories] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { supabase } = await import('@/lib/supabase');
      const { data: deptData } = await supabase.from('departments').select('*').order('name');
      if (deptData) setDepartments(deptData);

      const { data: catData } = await supabase.from('categories').select('*').order('name');
      if (catData) {
        // Build hierarchy: Parent / Child
        const mainCats = catData.filter(c => !c.parent_id);
        const subCats = catData.filter(c => c.parent_id);
        const hierarchical: any[] = [];

        mainCats.forEach(main => {
          hierarchical.push(main);
          subCats.filter(sub => sub.parent_id === main.id).forEach(sub => {
            hierarchical.push({ ...sub, display_name: `${main.name} / ${sub.name}` });
          });
        });
        setCategories(hierarchical);
      }
    }
    loadData();
  }, []);

  const [formData, setFormData] = useState({
    dateCreated: today,
    status: 'NEW',
    requesterName: '',
    requesterNim: '',
    requesterUnit: '',
    requesterPhone: '',
    subject: '',
    description: '',
    category: '',
    assignTo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Panggil fungsi submit dari parent
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden border border-[#C3C6D1]">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center p-5 border-b border-[#C3C6D1] bg-[#F3F3F6]">
          <h2 className="text-[#001E40] font-iBMPlexSans text-lg font-semibold tracking-[-0.01em]">
            Create New Ticket
          </h2>
          <button 
            onClick={onClose}
            className="text-[#43474F] hover:text-[#BA1A1A] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form id="new-ticket-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          
          {/* Row 1: Date & Status (Auto/Readonly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">Date Created</label>
              <input type="date" name="dateCreated" value={formData.dateCreated} readOnly className="p-2 border border-[#C3C6D1] rounded bg-gray-50 text-sm text-[#43474F] cursor-not-allowed outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">Status Tiket</label>
              <input type="text" name="status" value={formData.status} readOnly className="p-2 border border-[#C3C6D1] rounded bg-gray-50 text-sm text-[#001B3C] font-bold cursor-not-allowed outline-none" />
            </div>
          </div>

          {/* Data Diri Pelapor (From) */}
          <div className="p-4 border border-[#C3C6D1] rounded-lg bg-[#F9F9FC] flex flex-col gap-4">
            <h3 className="text-[#1A1C1E] font-iBMPlexSans text-sm font-semibold border-b border-[#C3C6D1] pb-2">Informasi Pelapor (From)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">Nama Lengkap *</label>
                <input required type="text" name="requesterName" value={formData.requesterName} onChange={handleChange} placeholder="Contoh: Andi Saputra" className="p-2 border border-[#C3C6D1] rounded text-sm text-[#1A1C1E] focus:border-[#0059BB] focus:ring-1 focus:ring-[#0059BB] outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">NIM / NIP *</label>
                <input required type="text" name="requesterNim" value={formData.requesterNim} onChange={handleChange} placeholder="Nomor Induk" className="p-2 border border-[#C3C6D1] rounded text-sm text-[#1A1C1E] focus:border-[#0059BB] focus:ring-1 focus:ring-[#0059BB] outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">Fakultas / Unit Kerja *</label>
                <input required type="text" name="requesterUnit" value={formData.requesterUnit} onChange={handleChange} placeholder="Contoh: Fakultas Teknik" className="p-2 border border-[#C3C6D1] rounded text-sm text-[#1A1C1E] focus:border-[#0059BB] focus:ring-1 focus:ring-[#0059BB] outline-none transition-all" />
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">No. WhatsApp *</label>
              <input type="text" name="requesterPhone" required value={formData.requesterPhone} onChange={handleChange} className="p-2 border border-[#C3C6D1] rounded text-sm outline-none focus:border-[#1E3A8A]" placeholder="628..." />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">Kategori Kendala *</label>
              <select required name="category" value={formData.category} onChange={handleChange} className="p-2 border border-[#C3C6D1] rounded text-sm text-[#1A1C1E] focus:border-[#0059BB] outline-none transition-all bg-white">
                <option value="" disabled>Pilih Kategori...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.display_name || c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">Departemen (Assign To)</label>
              <select name="assignTo" value={formData.assignTo} onChange={handleChange} className="p-2 border border-[#C3C6D1] rounded text-sm text-[#1A1C1E] focus:border-[#0059BB] outline-none transition-all bg-white">
                <option value="">Unassigned (Biarkan kosong)</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">Subject *</label>
            <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Ringkasan singkat kendala" className="p-2 border border-[#C3C6D1] rounded text-sm text-[#1A1C1E] focus:border-[#0059BB] focus:ring-1 focus:ring-[#0059BB] outline-none transition-all" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-[0.05em]">Deskripsi Kendala *</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Jelaskan secara detail kendala yang dialami..." className="p-2 border border-[#C3C6D1] rounded text-sm text-[#1A1C1E] focus:border-[#0059BB] focus:ring-1 focus:ring-[#0059BB] outline-none transition-all resize-y"></textarea>
          </div>

        </form>

        {/* Footer / Actions */}
        <div className="flex justify-end gap-3 p-4 border-t border-[#C3C6D1] bg-[#F3F3F6]">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 rounded border border-[#C3C6D1] bg-white text-[#43474F] font-iBMPlexSans text-xs font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="new-ticket-form"
            className="px-6 py-2 rounded bg-[#0059BB] text-white font-iBMPlexSans text-xs font-semibold shadow-sm hover:bg-[#00428A] transition-colors"
          >
            Submit Ticket
          </button>
        </div>

      </div>
    </div>
  );
}