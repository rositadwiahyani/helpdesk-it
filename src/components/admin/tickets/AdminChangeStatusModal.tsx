'use client';

import React, { useState } from 'react';
import { TicketStatus } from './TicketTableSection';

interface AdminChangeStatusModalProps {
  onClose: () => void;
  onSubmit: (newStatus: TicketStatus | 'DITOLAK' | 'DELETED') => void;
  selectedCount: number;
}

export default function AdminChangeStatusModal({ onClose, onSubmit, selectedCount }: AdminChangeStatusModalProps) {
  const [status, setStatus] = useState<string>('');

  const handleSubmit = () => {
    if (!status) {
      alert('Please select a status first.');
      return;
    }
    onSubmit(status as any);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded p-6 w-full max-w-sm shadow-md animate-in fade-in zoom-in-95">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Change Status</h2>
        <p className="text-sm text-gray-500 mb-5">
          Changing status of <strong>{selectedCount}</strong> ticket(s).
        </p>
        
        <div className="mb-6">
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-gray-500"
          >
            <option value="" disabled>Select a new status...</option>
            <option value="OPEN">OPEN</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="WAITING VERIFICATION">WAITING VERIFICATION</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
            <option value="DITOLAK">REJECTED</option>
            <option value="DELETED">DELETED</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 hover:bg-black rounded transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
