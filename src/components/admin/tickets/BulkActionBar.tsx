import React from 'react';

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onAssignSelected?: () => void;
  onDeleteSelected?: () => void;
}

export default function BulkActionBar({ selectedCount, onClearSelection, onAssignSelected, onDeleteSelected }: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-[var(--line-dark)] shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-6 animate-in slide-in-from-bottom-8 fade-in duration-300">
      
      {/* Counter */}
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-[var(--ink)] text-white text-[12.5px] font-bold flex items-center justify-center">
          {selectedCount}
        </span>
        <span className="text-[13.5px] font-bold text-[var(--ink)]">Selected</span>
      </div>

      <div className="w-px h-5 bg-[var(--line-dark)]"></div>

      {/* Bulk Actions */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onAssignSelected}
          className="bg-white border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper-2)] px-4 py-2 rounded-xl text-xs font-bold transition-colors"
        >
          Assign Selected
        </button>
        <button 
          onClick={() => alert(`Closing ${selectedCount} tickets...`)}
          className="bg-white border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper-2)] px-4 py-2 rounded-xl text-xs font-bold transition-colors"
        >
          Close Selected
        </button>
        <button 
          onClick={onDeleteSelected}
          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
        >
          Delete Selected
        </button>
      </div>

      <div className="w-px h-5 bg-[var(--line-dark)]"></div>

      {/* Clear Selection */}
      <button 
        onClick={onClearSelection}
        className="text-xs font-bold text-[var(--text-dim)] hover:text-[var(--ink)] transition-colors"
      >
        Clear
      </button>

    </div>
  );
}
