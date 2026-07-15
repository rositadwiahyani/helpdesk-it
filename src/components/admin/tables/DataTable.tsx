 'use client';
import React, { useState, useMemo, useEffect } from 'react';
// ==========================================
// TIPE DATA & PROPS
// ==========================================

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  className?: string; // Untuk mengatur lebar kolom spesifik (misal: "w-24")
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  searchPlaceholder?: string;
  hidePagination?: boolean;
  hideSearchBar?: boolean;
  footerLeft?: React.ReactNode;
  tableClassName?: string;
  initialSort?: { key: string; direction: 'asc' | 'desc' } | null;
}

export default function DataTable<T>({ 
  columns, 
  data,
  isLoading = false,
  emptyMessage = "Belum ada data.",
  searchPlaceholder = "Cari data...",
  hidePagination = false,
  hideSearchBar = false,
  footerLeft,
  tableClassName,
  initialSort
}: DataTableProps<T>) {
  
  // STATES
  const [globalSearch, setGlobalSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc'|'desc' } | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // LOGIC
  const { processedData, paginatedData, totalItems, validPage, totalPages } = useMemo(() => {
    let current = [...data];

    // 1. Search
    if (!hideSearchBar && globalSearch.trim() !== '') {
      const lower = globalSearch.toLowerCase();
      current = current.filter(item => {
        return columns.some(col => {
          if (!col.accessorKey) return false;
          const val = String((item as keyof T) ? (item as any)[col.accessorKey] : '').toLowerCase();
          return val.includes(lower);
        });
      });
    }

    // 2. Sort
    if (sortConfig) {
      current.sort((a: any, b: any) => {
        const aVal = a[sortConfig.key] ?? '';
        const bVal = b[sortConfig.key] ?? '';
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // 3. Paginate
    const total = current.length;
    const pages = Math.ceil(total / pageSize) || 1;
    const valid = Math.max(1, Math.min(currentPage, pages));
    const paginated = hidePagination ? current : current.slice((valid - 1) * pageSize, valid * pageSize);

    return { processedData: current, paginatedData: paginated, totalItems: total, validPage: valid, totalPages: pages };
  }, [data, columns, globalSearch, sortConfig, pageSize, currentPage, hideSearchBar, hidePagination]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sync external initial sort requests (e.g., when clicking a StatCard)
  useEffect(() => {
    if (initialSort) {
      setSortConfig(initialSort);
    }
  }, [initialSort]);
  
  return (
    <div className="flex flex-col w-full bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden">
      
      {/* HEADER: Search Bar */}
      {!hideSearchBar && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 border-b border-[var(--line-dark)]">
          <div className="relative w-full sm:w-72 group">
            <svg 
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dim)] group-focus-within:text-[var(--gold-soft)] transition-colors" 
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
            </svg>
            <input 
              type="text" 
              value={globalSearch}
              onChange={(e) => { setGlobalSearch(e.target.value); setCurrentPage(1); }}
              placeholder={searchPlaceholder}
              className="w-full bg-[var(--paper)] border border-[var(--line-dark)] rounded-full py-2 pl-10 pr-4 text-[13.5px] text-[var(--ink)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--gold-soft)] focus:bg-white transition-all"
            />
          </div>
        </div>
      )}

      {/* BODY: Wrapper Tabel untuk Scrollable X */}
      <div className="overflow-x-auto w-full">
        <table className={`w-full text-left border-collapse ${tableClassName || ''}`}>
          <thead>
            <tr className="bg-[var(--paper-2)]/50 border-b border-[var(--line)]">
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className={`px-6 py-4 text-[12px] font-bold text-[var(--text-dim)] uppercase tracking-wider ${col.className || ''}`}
                >
                  {col.accessorKey ? (
                    <button 
                      onClick={() => handleSort(col.accessorKey as string)}
                      className="flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors focus:outline-none group"
                    >
                      {col.header}
                      <div className="flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <svg className={`w-2 h-2 -mb-[3px] ${sortConfig?.key === col.accessorKey && sortConfig.direction === 'asc' ? 'text-[var(--gold)] opacity-100' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                        <svg className={`w-2 h-2 ${sortConfig?.key === col.accessorKey && sortConfig.direction === 'desc' ? 'text-[var(--gold)] opacity-100' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line-dark)]">
            
            {/* STATE 1: Loading */}
            {isLoading && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-[var(--gold-soft)] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[13.5px] text-[var(--text-dim)] font-medium">Memuat data...</span>
                  </div>
                </td>
              </tr>
            )}

            {/* STATE 2: Empty Data */}
            {!isLoading && paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="w-12 h-12 text-[var(--line)] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span className="text-[14.5px] font-semibold text-[var(--ink)]">{emptyMessage}</span>
                    <span className="text-[13px] text-[var(--text-dim)]">Coba sesuaikan pencarian Anda.</span>
                  </div>
                </td>
              </tr>
            )}

            {/* STATE 3: Data Exist */}
            {!isLoading && paginatedData.length > 0 && paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-[var(--paper)]/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`px-6 py-4 text-[14px] text-[var(--ink)] ${col.className || ''}`}>
                    {/* Render kustom (cell) jika ada, jika tidak render nilai properti langsung (accessorKey) */}
                    {col.cell 
                      ? col.cell(item) 
                      : col.accessorKey ? String((item as any)[col.accessorKey] ?? '-') : '-'
                    }
                  </td>
                ))}
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>

      {/* FOOTER (Kondisional: Tampil jika tidak hidePagination ATAU ada footerLeft) */}
      {(!hidePagination || footerLeft) && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--line)] bg-white/50">
          
          {/* Area Kiri: Slot tambahan (misal Export) atau Teks Info Pagination */}
          <div className="flex items-center gap-4">
            {footerLeft}
            
            {!hidePagination && (
              <div className="flex items-center gap-3">
                <select 
                  value={pageSize} 
                  onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                  className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-lg px-2 py-1.5 text-[13px] font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
                >
                  <option value={5}>5 / halaman</option>
                  <option value={10}>10 / halaman</option>
                  <option value={20}>20 / halaman</option>
                  <option value={30}>30 / halaman</option>
                  <option value={50}>50 / halaman</option>
                </select>
                <span className="text-[13px] text-[var(--text-dim)] font-medium hidden sm:block">
                  Menampilkan <span className="font-bold text-[var(--ink)]">{totalItems === 0 ? 0 : (validPage - 1) * pageSize + 1}</span> ke <span className="font-bold text-[var(--ink)]">{Math.min(validPage * pageSize, totalItems)}</span> dari <span className="font-bold text-[var(--ink)]">{totalItems}</span> data
                </span>
              </div>
            )}
          </div>
          
          {/* Area Kanan: Tombol Pagination */}
          {!hidePagination && (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <button 
                disabled={validPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-3.5 py-1.5 text-[13px] font-bold text-[var(--text-dim)] border border-[var(--line-dark)] rounded-lg hover:bg-[var(--paper-2)] hover:text-[var(--ink)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sebelumnya
              </button>
              <button 
                disabled={validPage === totalPages || totalItems === 0} 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-3.5 py-1.5 text-[13px] font-bold text-[var(--text-dim)] border border-[var(--line-dark)] rounded-lg hover:bg-[var(--paper-2)] hover:text-[var(--ink)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Berikutnya
              </button>
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}
