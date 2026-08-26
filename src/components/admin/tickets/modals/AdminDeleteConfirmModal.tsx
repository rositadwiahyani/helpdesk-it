'use client';

import React from 'react';

interface AdminDeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
  isPermanent?: boolean;
}

export default function AdminDeleteConfirmModal({ onClose, onConfirm, selectedCount, isPermanent = false }: AdminDeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded p-6 w-full max-w-sm shadow-md animate-in fade-in zoom-in-95 relative">
        <div className="flex flex-col text-left">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            {isPermanent ? 'Hapus Permanen?' : 'Konfirmasi Hapus'}
          </h2>
          
          <p className="text-gray-500 text-sm mb-5">
            Anda akan menghapus <strong>{selectedCount}</strong> tiket.
            {isPermanent ? ' Tindakan ini permanen.' : ' Tiket akan dipindahkan ke folder "Dihapus".'}
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Batal
          </button>
          <button 
            onClick={() => {
                onConfirm();
                onClose();
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            {isPermanent ? 'Hapus Permanen' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
}
