import { ReactNode, useContext, useState, useRef, useEffect } from "react";
import CountBadge from "./CountBadge";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";
import { TreeContext } from "./Workspace";

type RowProps = {
  nodeId?: string; // Menambahkan Prop ID untuk mendeteksi baris 
  outerWrapperClassName: string;
  icon: ReactNode;
  iconBgClassName: string;
  title: ReactNode;
  count: ReactNode;
  status: ReactNode;
  childrenWrapperClassName: string;
  children: ReactNode;
};

export default function Row({
  nodeId,
  outerWrapperClassName,
  icon,
  iconBgClassName,
  title,
  count,
  status,
  childrenWrapperClassName,
  children,
}: RowProps) {
  const ctx = useContext(TreeContext);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsActionOpen(false);
      }
    };
    if (isActionOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActionOpen]);

  // Jika ada fitur pencarian, otomatis expand agar user bisa lihat highlight-nya
  const isExpanded = ctx?.searchQuery 
    ? true 
    : (nodeId && ctx?.expandedNodes ? ctx.expandedNodes.includes(nodeId) : true);

  const handleToggle = () => {
    if (nodeId && ctx?.toggleNode) ctx.toggleNode(nodeId);
  };

  return (
    <div className={outerWrapperClassName}>
      <div 
        className={`flex py-3.5 px-4 w-full items-center bg-white border-b border-gray-100 relative cursor-pointer hover:bg-gray-50/50 transition-colors ${isActionOpen ? 'z-50' : 'z-10'}`}
        onClick={handleToggle}
      >
        <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
          {/* Drag Handle */}
          <div className="cursor-grab active:cursor-grabbing text-[#D1D5DB] hover:text-gray-400 px-1">
            <svg className="pointer-events-none" width="12" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="5" r="1.5"></circle><circle cx="15" cy="5" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="19" r="1.5"></circle><circle cx="15" cy="19" r="1.5"></circle></svg>
          </div>
          
          <svg 
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`shrink-0 text-gray-400 hover:text-gray-600 transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>

          {/* Folder Icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A3AED0] shrink-0 ml-1">
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
          </svg>

          <p className="text-[#1A1C1E] font-semibold text-[15px] truncate ml-1.5">
            {title}
          </p>
        </div>

        {/* Count Badge */}
        <div className="flex justify-end shrink-0 mr-6">
          <span className="bg-[#F8F9FA] text-gray-500 border border-[#E5E7EB] px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide shadow-sm">
            {count}
          </span>
        </div>

        {/* Status Badge */}
        <div className="w-[80px] flex justify-end shrink-0 mr-4">
          {(status === 'AKTIF' || status === 'Aktif') ? (
            <span className="bg-[#EEF4FF] text-blue-600 px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 border border-[#D1E0FF] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Aktif
            </span>
          ) : (
             <span className="bg-[#F3F4F6] text-gray-600 px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 border border-[#E5E7EB] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              Nonaktif
            </span>
          )}
        </div>

        {nodeId !== "root-layanan" ? (
          <div 
            className="w-[40px] flex justify-end shrink-0 relative" 
            ref={menuRef} 
            onClick={(e) => { e.stopPropagation(); setIsActionOpen(!isActionOpen); }}
            onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
            draggable
          >
            <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>

            {isActionOpen && (
              <div className="absolute right-0 bottom-full mb-1 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20 flex flex-col py-1 overflow-hidden">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onAddSubcategory?.(nodeId!); }}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E] transition-colors"
                >
                  Tambah Subkategori
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onEditItem?.({ id: nodeId, title }, 'category'); }}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E] transition-colors"
                >
                  Edit Data
                </button>
                <div className="h-px bg-gray-100 w-full my-1"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onDeleteItem?.(nodeId!, 'category'); }}
                  className="px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-[40px] flex justify-end shrink-0"></div>
        )}
      </div>
      
      {/* Logic untuk hide/show children saat di collapse */}
      {isExpanded && (
        <div className={childrenWrapperClassName}>{children}</div>
      )}
    </div>
  );
}