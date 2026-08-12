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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden relative">
        <div className={`absolute top-0 left-0 w-full h-2 ${isPermanent ? 'bg-red-600' : 'bg-amber-500'}`}></div>
        
        <div className="p-6 pt-8 flex flex-col items-center text-center">
          <div className={`flex items-center justify-center w-14 h-14 rounded-full mb-4 ${isPermanent ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-[#1A1C1E] font-iBMPlexSans mb-2">
            {isPermanent ? 'Hapus Permanen?' : 'Konfirmasi Hapus'}
          </h2>
          
          <p className="text-[#43474F] font-iBMPlexSans text-sm mb-2">
            Anda akan menghapus <strong>{selectedCount}</strong> tiket.
          </p>
          
          {isPermanent ? (
            <p className="text-xs text-red-600 font-medium bg-red-50 p-2 rounded w-full font-iBMPlexSans">
              Tindakan ini permanen dan data tidak dapat dipulihkan.
            </p>
          ) : (
            <p className="text-xs text-amber-700 font-medium bg-amber-50 p-2 rounded w-full font-iBMPlexSans">
              Tiket akan dipindahkan ke folder "Dihapus".
            </p>
          )}
        </div>

        <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100 w-full justify-center">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-[#43474F] border border-[#C3C6D1] bg-white hover:bg-gray-100 rounded-lg transition-colors font-iBMPlexSans"
          >
            Batal
          </button>
          <button 
            onClick={() => {
                onConfirm();
                onClose();
            }}
            className={`flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors shadow-sm font-iBMPlexSans ${isPermanent ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-500 hover:bg-amber-600'}`}
          >
            {isPermanent ? 'Ya, Hapus Permanen' : 'Ya, Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
}
