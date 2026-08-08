import React, { ReactNode, useContext, useState, useRef, useEffect } from "react";
import CountBadge from "./CountBadge";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";
import { TreeContext } from "./Workspace";

type SubRowProps =
  | {
      variant: "branch";
      nodeId?: string; // ID untuk trigger expand/collapse sub kategori
      headerClassName: string;
      title: ReactNode;
      count: ReactNode;
      status: ReactNode;
      childrenWrapperClassName?: string;
      children?: ReactNode;
      onMoveUp?: () => void;
      onMoveDown?: () => void;
    }
  | { variant: "leaf-compact"; title: ReactNode; nodeId?: string; onMoveUp?: () => void; onMoveDown?: () => void; }
  | { variant: "leaf-bordered"; hasDivider: boolean; title: ReactNode; nodeId?: string; onMoveUp?: () => void; onMoveDown?: () => void; };

export default function SubRow(props: SubRowProps) {
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

  if (props.variant === "branch") {
    const isExpanded = ctx?.searchQuery 
      ? true 
      : (props.nodeId && ctx?.expandedNodes ? ctx.expandedNodes.includes(props.nodeId) : true);
    
    const hasTopBorder = props.headerClassName.includes("border-t");

    const handleToggle = () => {
      if (props.nodeId && ctx?.toggleNode) ctx.toggleNode(props.nodeId);
    };

    return (
      <div className="flex flex-col w-full">
        <div 
          className={`flex py-3.5 px-4 w-full items-center cursor-pointer hover:bg-gray-50/50 transition-colors ${hasTopBorder ? 'border-t border-t-gray-100' : ''} relative ${isActionOpen ? 'z-50' : 'z-10'}`}
          onClick={handleToggle}
        >
          <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
            {/* Drag Handle */}
            <div className="cursor-grab active:cursor-grabbing text-[#D1D5DB] hover:text-gray-400 px-1 select-none flex-shrink-0">
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

            <p className="text-[#4B5563] font-medium text-[14.5px] truncate ml-1.5">{props.title}</p>
          </div>
          
          {/* Count Badge */}
          <div className="flex justify-end shrink-0 mr-6">
            <span className="bg-[#F8F9FA] text-gray-500 border border-[#E5E7EB] px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide shadow-sm">
              {props.count}
            </span>
          </div>

          {/* Status Badge */}
          <div className="w-[80px] flex justify-end shrink-0 mr-4">
            {(props.status === 'AKTIF' || props.status === 'Aktif') ? (
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

          {/* Action Menu */}
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
                {props.onMoveUp && (
                  <button onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); props.onMoveUp?.(); }} className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E] transition-colors flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                    Pindah ke Atas
                  </button>
                )}
                {props.onMoveDown && (
                  <button onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); props.onMoveDown?.(); }} className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E] transition-colors flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                    Pindah ke Bawah
                  </button>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onEditItem?.({ id: props.nodeId, title: props.title }, 'category'); }}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E] transition-colors"
                >
                  Edit Data
                </button>
                <div className="h-px bg-gray-100 w-full my-1"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onDeleteItem?.(props.nodeId!, 'category'); }}
                  className="px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>
        {isExpanded && props.childrenWrapperClassName && (
          <div className={props.childrenWrapperClassName}>{props.children}</div>
        )}
      </div>
    );
  }

  // Jika berupa Leaf (Subkategori final)
  return (
    <div className={`flex py-3.5 px-4 w-full items-center hover:bg-gray-50/50 transition-colors ${props.variant === "leaf-bordered" && (props as any).hasDivider ? "border-b border-gray-100" : ""} relative ${isActionOpen ? 'z-50' : 'z-10'}`}>
      <div className="flex-1 flex items-center gap-3 min-w-0 pr-4 pl-3">
        {/* Drag Handle */}
        <div className="cursor-grab active:cursor-grabbing text-[#D1D5DB] hover:text-gray-400 px-1 select-none flex-shrink-0">
          <svg className="pointer-events-none" width="12" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="5" r="1.5"></circle><circle cx="15" cy="5" r="1.5"></circle><circle cx="9" cy="12" r="1.5"></circle><circle cx="15" cy="12" r="1.5"></circle><circle cx="9" cy="19" r="1.5"></circle><circle cx="15" cy="19" r="1.5"></circle></svg>
        </div>
        {/* Document Icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#CBD5E1] shrink-0">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <p className="text-[#4B5563] font-medium text-[14.5px] truncate ml-1.5">{props.title}</p>
      </div>

      <div className="w-[80px] flex justify-end shrink-0 mr-6">
         {/* Leaf tidak punya child count */}
      </div>

      {/* Status Badge */}
      <div className="w-[80px] flex justify-end shrink-0 mr-4">
        {/* Subkategori biasanya mewarisi aktif/nonaktif dari API, default kita anggap AKTIF di mock jika tidak ada prop */}
        <span className="bg-[#EEF4FF] text-blue-600 px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 border border-[#D1E0FF] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          Aktif
        </span>
      </div>

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
              {props.onMoveUp && (
                <button onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); props.onMoveUp?.(); }} className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E] transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  Pindah ke Atas
                </button>
              )}
              {props.onMoveDown && (
                <button onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); props.onMoveDown?.(); }} className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E] transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  Pindah ke Bawah
                </button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onEditItem?.({ id: (props as any).nodeId, title: props.title }, 'subcategory'); }}
                className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E] transition-colors"
              >
                Edit Data
              </button>
              <div className="h-px bg-gray-100 w-full my-1"></div>
              <button
                onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onDeleteItem?.((props as any).nodeId, 'subcategory'); }}
                className="px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          )}
      </div>
    </div>
  );
}