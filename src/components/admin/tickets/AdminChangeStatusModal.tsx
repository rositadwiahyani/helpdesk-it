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
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl animate-in fade-in zoom-in-95">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Change Status</h2>
        <p className="text-sm text-gray-600 mb-4">
          You are changing the status of <strong>{selectedCount}</strong> selected ticket(s).
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">New Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
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
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-sm"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
