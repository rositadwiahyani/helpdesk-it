import React, { useState } from 'react';

export interface UsersFilterData {
  fakultas: string;
  startDate: string;
  endDate: string;
}

interface UsersFilterModalProps {
  onClose: () => void;
  onApply: (filters: UsersFilterData) => void;
  uniqueFakultas: string[];
}

export default function UsersFilterModal({ onClose, onApply, uniqueFakultas }: UsersFilterModalProps) {
  const [filters, setFilters] = useState<UsersFilterData>({
    fakultas: 'ALL',
    startDate: '',
    endDate: '',
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({ fakultas: 'ALL', startDate: '', endDate: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl animate-in fade-in zoom-in-95">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Filter Pelapor</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fakultas / Unit Kerja</label>
            <select 
              value={filters.fakultas}
              onChange={(e) => setFilters({...filters, fakultas: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">Semua Fakultas / Unit</option>
              {uniqueFakultas.map((fak) => (
                <option key={fak} value={fak}>{fak}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
              <input 
                type="date" 
                value={filters.startDate}
                onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-700"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
              <input 
                type="date" 
                value={filters.endDate}
                onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
          <button 
            onClick={handleReset}
            className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            Reset Filters
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 rounded transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={handleApply}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-sm"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
