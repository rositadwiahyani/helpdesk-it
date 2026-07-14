import React, { useState } from 'react';

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onReset: () => void;
}

export default function AdvancedFilterModal({
  isOpen,
  onClose,
  onApply,
  onReset
}: AdvancedFilterModalProps) {
  const [keywords, setKeywords] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [department, setDepartment] = useState('All');
  const [agent, setAgent] = useState('All');
  const [helpTopic, setHelpTopic] = useState('All');
  const [createdDate, setCreatedDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  if (!isOpen) return null;

  const handleApply = () => {
    onApply({
      keywords,
      status,
      priority,
      department,
      agent,
      helpTopic,
      createdDate,
      updatedDate
    });
    onClose();
  };

  const handleReset = () => {
    setKeywords('');
    setStatus('All');
    setPriority('All');
    setDepartment('All');
    setAgent('All');
    setHelpTopic('All');
    setCreatedDate('');
    setUpdatedDate('');
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line-dark)]">
          <h3 className="text-lg font-bold text-[var(--ink)]">Advanced Filter</h3>
          <button 
            onClick={onClose}
            className="text-[var(--text-dim)] hover:text-[var(--ink)] transition-colors p-1 rounded-md hover:bg-[var(--paper-2)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-[13px] font-bold text-[var(--ink)]">Keywords</label>
            <input 
              type="text" 
              placeholder="Cari kata kunci di subjek atau pesan..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[var(--ink)]">Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="Waiting">Waiting</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[var(--ink)]">Priority</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
            >
              <option value="All">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[var(--ink)]">Department</label>
            <select 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
            >
              <option value="All">All Department</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Infrastruktur IT">Infrastruktur IT</option>
              <option value="Humas & Protokoler">Humas & Protokoler</option>
              <option value="Akademik">Akademik</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[var(--ink)]">Assigned Agent</label>
            <select 
              value={agent} 
              onChange={(e) => setAgent(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
            >
              <option value="All">All Agent</option>
              <option value="Support IT">Support IT</option>
              <option value="Developer Mandala">Developer Mandala</option>
              <option value="BAA Akademik">BAA Akademik</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[var(--ink)]">Help Topic</label>
            <select 
              value={helpTopic} 
              onChange={(e) => setHelpTopic(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
            >
              <option value="All">All Help Topic</option>
              <option value="Aplikasi Mandala">Aplikasi Mandala</option>
              <option value="Akun SSO">Akun SSO</option>
              <option value="Wisuda">Wisuda</option>
              <option value="Sinkronisasi PDDIKTI">Sinkronisasi PDDIKTI</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[var(--ink)]">Created Date</label>
            <input 
              type="date" 
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-[13px] font-bold text-[var(--ink)]">Updated Date</label>
            <input 
              type="date" 
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[var(--paper-2)]/50 border-t border-[var(--line-dark)]">
          <button 
            onClick={handleReset}
            className="text-red-600 hover:text-red-700 text-sm font-bold transition-colors"
          >
            Reset Filters
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-5 py-2 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleApply}
              className="bg-[var(--ink)] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
