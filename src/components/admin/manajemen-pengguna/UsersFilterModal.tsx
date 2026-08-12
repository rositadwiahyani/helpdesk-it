import React, { useState } from 'react';

export interface UsersFilterData {
  fakultas: string;
}

interface UsersFilterModalProps {
  onClose: () => void;
  onApply: (filters: UsersFilterData) => void;
  uniqueFakultas: string[];
}

export default function UsersFilterModal({ onClose, onApply, uniqueFakultas }: UsersFilterModalProps) {
  const [filters, setFilters] = useState<UsersFilterData>({
    fakultas: 'ALL',
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#F8F9FA]">
          <h2 className="text-lg font-bold text-[#001E40] font-iBMPlexSans">Filter Lanjutan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1C1E] mb-2 font-iBMPlexSans">Fakultas / Unit Kerja</label>
            <div className="relative">
              <select 
                value={filters.fakultas}
                onChange={(e) => setFilters({...filters, fakultas: e.target.value})}
                className="w-full border border-[#C3C6D1] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#0059BB] appearance-none bg-white text-gray-700"
              >
                <option value="ALL">Semua Fakultas / Unit</option>
                {uniqueFakultas.map((fak) => (
                  <option key={fak} value={fak}>{fak}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center px-6 py-4 border-t border-gray-100 gap-3 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-[#43474F] border border-[#C3C6D1] bg-white hover:bg-gray-50 rounded transition-colors font-iBMPlexSans"
          >
            Batal
          </button>
          <button 
            onClick={handleApply}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#001E40] hover:bg-[#00142d] rounded transition-colors shadow-sm font-iBMPlexSans"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );
}
