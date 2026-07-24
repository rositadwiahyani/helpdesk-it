import React, { useState } from 'react';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTicketModal({ isOpen, onClose }: CreateTicketModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Sistem Informasi');
  const [priority, setPriority] = useState('Medium');
  const [helpTopic, setHelpTopic] = useState('Aplikasi Mandala');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Ticket submitted:', { name, email, department, priority, helpTopic, subject, message });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line-dark)]">
          <h3 className="text-lg font-bold text-[var(--ink)]">Open New Ticket</h3>
          <button 
            onClick={onClose}
            className="text-[var(--text-dim)] hover:text-[var(--ink)] transition-colors p-1 rounded-md hover:bg-[var(--paper-2)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[var(--ink)]">Nama Pelapor <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[var(--ink)]">Email Pelapor <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[var(--ink)]">Departemen <span className="text-red-500">*</span></label>
              <select 
                value={department} 
                onChange={(e) => setDepartment(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
              >
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Infrastruktur IT">Infrastruktur IT</option>
                <option value="Humas & Protokoler">Humas & Protokoler</option>
                <option value="Akademik">Akademik</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[var(--ink)]">Prioritas <span className="text-red-500">*</span></label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[13px] font-bold text-[var(--ink)]">Topik Bantuan <span className="text-red-500">*</span></label>
              <select 
                value={helpTopic} 
                onChange={(e) => setHelpTopic(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
              >
                <option value="Aplikasi Mandala">Aplikasi Mandala</option>
                <option value="Akun SSO">Akun SSO</option>
                <option value="Wisuda">Wisuda</option>
                <option value="Sinkronisasi PDDIKTI">Sinkronisasi PDDIKTI</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[13px] font-bold text-[var(--ink)]">Subjek Tiket <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required
                placeholder="Tulis subjek singkat permasalahan"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[13px] font-bold text-[var(--ink)]">Pesan Detail <span className="text-red-500">*</span></label>
              <textarea 
                rows={4}
                required
                placeholder="Tulis kronologi detail permasalahan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl p-3 text-[14px] focus:outline-none focus:border-[var(--gold-soft)]"
              />
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
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
