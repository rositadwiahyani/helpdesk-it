import React from 'react';

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  status: string;
}

interface UserFormProps {
  formData: UserFormData;
  onChange: (field: keyof UserFormData, value: string) => void;
  isEditMode?: boolean;
}

export default function UserForm({ formData, onChange, isEditMode = false }: UserFormProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold text-[var(--ink)]">Nama Lengkap <span className="text-red-500">*</span></label>
        <input 
          type="text" 
          placeholder="Masukkan nama lengkap"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" 
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold text-[var(--ink)]">Email Address <span className="text-red-500">*</span></label>
        <input 
          type="email" 
          placeholder="email@example.com"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" 
        />
      </div>

      {!isEditMode && (
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[var(--ink)]">Password Sementara <span className="text-red-500">*</span></label>
          <input 
            type="password" 
            placeholder="********"
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
            className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" 
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold text-[var(--ink)]">Status <span className="text-red-500">*</span></label>
        <select 
          value={formData.status}
          onChange={(e) => onChange('status', e.target.value)}
          className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors cursor-pointer"
        >
          <option value="Active (Registered)">Active (Registered)</option>
          <option value="Guest">Guest</option>
          <option value="Locked (Pending Activation)">Locked (Pending Activation)</option>
        </select>
      </div>
    </div>
  );
}
