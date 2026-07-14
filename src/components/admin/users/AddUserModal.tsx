import React, { useState } from 'react';
import UserForm, { UserFormData } from './UserForm';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    status: 'Active (Registered)'
  });

  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line-dark)]">
          <h3 className="text-lg font-bold text-[var(--ink)]">Tambah User Baru</h3>
          <button 
            onClick={onClose}
            className="text-[var(--text-dim)] hover:text-[var(--ink)] transition-colors p-1 rounded-md hover:bg-[var(--paper-2)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <UserForm formData={formData} onChange={handleChange} isEditMode={false} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[var(--paper-2)]/50 border-t border-[var(--line-dark)]">
          <button 
            onClick={onClose}
            className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-5 py-2 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors"
          >
            Batal
          </button>
          <button 
            onClick={() => {
              // Dummy submit logic
              console.log('Submit add user:', formData);
              onClose();
            }}
            className="bg-[var(--ink)] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] transition-colors"
          >
            Simpan User
          </button>
        </div>
      </div>
    </div>
  );
}
