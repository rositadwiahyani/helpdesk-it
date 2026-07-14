import React, { useState } from 'react';

interface AssignSelectedModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onAssign: (department: string, agent: string) => void;
}

export default function AssignSelectedModal({
  isOpen,
  onClose,
  selectedCount,
  onAssign
}: AssignSelectedModalProps) {
  const [department, setDepartment] = useState('Sistem Informasi');
  const [agent, setAgent] = useState('Support IT');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssign(department, agent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line-dark)]">
          <h3 className="text-lg font-bold text-[var(--ink)]">Assign Selected Tickets</h3>
          <button 
            onClick={onClose}
            className="text-[var(--text-dim)] hover:text-[var(--ink)] transition-colors p-1 rounded-md hover:bg-[var(--paper-2)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-4">
            
            <p className="text-xs text-[var(--text-dim)] font-medium bg-[var(--paper-2)]/40 p-3 rounded-lg border border-[var(--line-dark)]">
              Anda sedang menugaskan <strong>{selectedCount} tiket</strong> secara massal.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[var(--ink)]">Pilih Departemen <span className="text-red-500">*</span></label>
              <select 
                value={department} 
                onChange={(e) => setDepartment(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer w-full"
              >
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Infrastruktur IT">Infrastruktur IT</option>
                <option value="Humas & Protokoler">Humas & Protokoler</option>
                <option value="Akademik">Akademik</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[var(--ink)]">Pilih Agen / Akun Penerima <span className="text-red-500">*</span></label>
              <select 
                value={agent} 
                onChange={(e) => setAgent(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer w-full"
              >
                <option value="Support IT">Support IT (Biro Infrastruktur)</option>
                <option value="Developer Mandala">Developer Mandala (Biro Sistem Informasi)</option>
                <option value="BAA Akademik">BAA Akademik (Biro Akademik)</option>
                <option value="Panitia Wisuda">Panitia Wisuda (Biro Humas)</option>
              </select>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[var(--paper-2)]/50 border-t border-[var(--line-dark)]">
            <button 
              type="button"
              onClick={onClose}
              className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-5 py-2 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-[var(--ink)] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] transition-colors"
            >
              Assign Selected
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
