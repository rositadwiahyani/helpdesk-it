import { ReactNode, useContext, useState } from "react";
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

  if (props.variant === "branch") {
    const isExpanded = ctx?.searchQuery 
      ? true 
      : (props.nodeId && ctx?.expandedNodes ? ctx.expandedNodes.includes(props.nodeId) : true);
    
    const hasTopBorder = props.headerClassName.includes("border-t");

    const handleToggle = () => {
      if (props.nodeId && ctx?.toggleNode) ctx.toggleNode(props.nodeId);
    };

    return (
      <div className="flex flex-col items-end w-full">
        <div 
          className={`flex py-3 px-4 w-full items-center cursor-pointer hover:bg-[#F8F9FA] transition-colors ${hasTopBorder ? 'border-t border-t-[#C3C6D1]' : ''}`}
          onClick={handleToggle}
        >
          <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
            <div className="cursor-default text-transparent w-4 ml-4 shrink-0"></div>
            <svg 
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={`shrink-0 text-gray-500 transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <p className="text-gray-700 font-medium text-[14px] truncate ml-1">{props.title}</p>
          </div>
          <div className="w-[80px] flex justify-end shrink-0 text-gray-500 text-sm font-medium mr-4">{props.count}</div>
          <div className="w-[100px] flex justify-end shrink-0 mr-4"><span className="text-gray-500 text-xs font-semibold">{props.status}</span></div>
          <div className="flex items-center gap-2 mr-4">
             {props.onMoveUp ? (
               <button onClick={(e) => { e.stopPropagation(); props.onMoveUp!(); }} className="p-1.5 rounded bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors" title="Pindah ke Atas">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
               </button>
             ) : <div className="w-[26px]"></div>}
             {props.onMoveDown ? (
               <button onClick={(e) => { e.stopPropagation(); props.onMoveDown!(); }} className="p-1.5 rounded bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors" title="Pindah ke Bawah">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
               </button>
             ) : <div className="w-[26px]"></div>}
          </div>
          <div className="w-[40px] flex justify-end shrink-0 relative" onClick={(e) => { e.stopPropagation(); setIsActionOpen(!isActionOpen); }}>
            <button className="p-2 rounded hover:bg-gray-200 transition-colors">
              <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667C0 11.2083 0.163194 10.816 0.489583 10.4896C0.815972 10.1632 1.20833 10 1.66667 10C2.125 10 2.51736 10.1632 2.84375 10.4896C3.17014 10.816 3.33333 11.2083 3.33333 11.6667C3.33333 12.125 3.17014 12.5174 2.84375 12.8438C2.51736 13.1701 2.125 13.3333 1.66667 13.3333ZM1.66667 8.33333C1.20833 8.33333 0.815972 8.17014 0.489583 7.84375C0.163194 7.51736 0 7.125 0 6.66667C0 6.20833 0.163194 5.81597 0.489583 5.48958C0.815972 5.16319 1.20833 5 1.66667 5C2.125 5 2.51736 5.16319 2.84375 5.48958C3.17014 5.81597 3.33333 6.20833 3.33333 6.66667C3.33333 7.125 3.17014 7.51736 2.84375 7.84375C2.51736 8.17014 2.125 8.33333 1.66667 8.33333ZM1.66667 3.33333C1.20833 3.33333 0.815972 3.17014 0.489583 2.84375C0.163194 2.51736 0 2.125 0 1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0C2.125 0 2.51736 0.163194 2.84375 0.489583C3.17014 0.815972 3.33333 1.20833 3.33333 1.66667C3.33333 2.125 3.17014 2.51736 2.84375 2.84375C2.51736 3.17014 2.125 3.33333 1.66667 3.33333Z" fill="#43474F"/>
              </svg>
            </button>
            {isActionOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); }}></div>
                <div className="absolute right-0 top-10 w-40 bg-white border border-[#C3C6D1] rounded shadow-lg z-20 flex flex-col py-1">
                  {props.onMoveUp && (
                    <button onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); props.onMoveUp?.(); }} className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E]">
                      ↑ Pindah ke Atas
                    </button>
                  )}
                  {props.onMoveDown && (
                    <button onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); props.onMoveDown?.(); }} className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E]">
                      ↓ Pindah ke Bawah
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onEditItem?.({ id: props.nodeId, title: props.title }, 'category'); }}
                    className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E]"
                  >
                    Edit Data
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onDeleteItem?.(props.nodeId!, 'category'); }}
                    className="px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {isExpanded && props.childrenWrapperClassName && (
          <div className={props.childrenWrapperClassName}>{props.children}</div>
        )}
      </div>
    );
  }

  // Jika berupa Leaf, strukturnya dipertahankan 100%
  if (props.variant === "leaf-compact") {
    return (
      <div className="flex py-2 px-4 w-full items-center">
        <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" className="shrink-0"><path d="M6.75 12.75L5.68125 11.6812L8.38125 9H0V0H1.5V7.5H8.38125L5.68125 4.8L6.73125 3.73125L11.25 8.25L6.75 12.75Z" fill="#43474F" /></svg>
          <p className="text-[#43474F] font-iBMPlexSans text-[13px] leading-[18px] truncate">{props.title}</p>
        </div>
        <div className="w-[140px] flex justify-center shrink-0 opacity-60"><p className="text-[#43474F] text-[10px] leading-[18px]">—</p></div>
        <div className="w-[140px] flex justify-center shrink-0"><StatusBadge variant="text-18">AKTIF</StatusBadge></div>
        <div className="flex items-center gap-2 ml-auto mr-4">
           {props.onMoveUp ? (
             <button onClick={(e) => { e.stopPropagation(); props.onMoveUp!(); }} className="p-1.5 rounded bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors" title="Pindah ke Atas">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
             </button>
           ) : <div className="w-[26px]"></div>}
           {props.onMoveDown ? (
             <button onClick={(e) => { e.stopPropagation(); props.onMoveDown!(); }} className="p-1.5 rounded bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors" title="Pindah ke Bawah">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
             </button>
           ) : <div className="w-[26px]"></div>}
        </div>
        <div className="w-[40px] flex justify-end shrink-0 relative" onClick={(e) => { e.stopPropagation(); setIsActionOpen(!isActionOpen); }}>
          <button className="p-2 rounded hover:bg-gray-200 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33333 10.6667H2.28333L8.8 4.15L7.85 3.2L1.33333 9.71667V10.6667ZM0 12V9.16667L8.8 0.383333C8.93333 0.261111 9.08056 0.166667 9.24167 0.1C9.40278 0.0333333 9.57222 0 9.75 0C9.92778 0 10.1 0.0333333 10.2667 0.1C10.4333 0.166667 10.5778 0.266667 10.7 0.4L11.6167 1.33333C11.75 1.45556 11.8472 1.6 11.9083 1.76667C11.9694 1.93333 12 2.1 12 2.26667C12 2.44444 11.9694 2.61389 11.9083 2.775C11.8472 2.93611 11.75 3.08333 11.6167 3.21667L2.83333 12H0ZM10.6667 2.26667L9.73333 1.33333L10.6667 2.26667ZM8.31667 3.68333L7.85 3.2L8.8 4.15L8.31667 3.68333Z" fill="#43474F"/></svg>
          </button>
          {isActionOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); }}></div>
                <div className="absolute right-0 top-10 w-40 bg-white border border-[#C3C6D1] rounded shadow-lg z-20 flex flex-col py-1">
                  {props.onMoveUp && (
                    <button onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); props.onMoveUp?.(); }} className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E]">
                      ↑ Pindah ke Atas
                    </button>
                  )}
                  {props.onMoveDown && (
                    <button onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); props.onMoveDown?.(); }} className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E]">
                      ↓ Pindah ke Bawah
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onEditItem?.({ id: (props as any).nodeId, title: props.title }, 'subcategory'); }}
                    className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E]"
                  >
                    Edit Data
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onDeleteItem?.((props as any).nodeId, 'subcategory'); }}
                    className="px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex py-3 px-4 w-full items-center ${props.hasDivider ? "border-b border-gray-100" : ""}`}>
      <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
        <div className="cursor-default text-transparent w-4 ml-8 shrink-0"></div>
        <svg 
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="shrink-0 text-transparent"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        <p className="text-gray-700 font-medium text-[14px] truncate ml-1">{props.title}</p>
      </div>
      <div className="w-[80px] flex justify-end shrink-0 text-gray-500 text-sm font-medium mr-4"></div>
      <div className="w-[100px] flex justify-end shrink-0 mr-4"><span className="text-gray-500 text-xs font-semibold">AKTIF</span></div>
      <div className="flex items-center gap-2 mr-4">
         {props.onMoveUp ? (
           <button onClick={(e) => { e.stopPropagation(); props.onMoveUp!(); }} className="p-1.5 rounded bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors" title="Pindah ke Atas">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
           </button>
         ) : <div className="w-[26px]"></div>}
         {props.onMoveDown ? (
           <button onClick={(e) => { e.stopPropagation(); props.onMoveDown!(); }} className="p-1.5 rounded bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors" title="Pindah ke Bawah">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
           </button>
         ) : <div className="w-[26px]"></div>}
      </div>
      <div className="w-[40px] flex justify-end shrink-0 relative" onClick={(e) => { e.stopPropagation(); setIsActionOpen(!isActionOpen); }}>
          <button className="p-2 rounded hover:bg-gray-200 transition-colors">
            <svg width="3" height="12" viewBox="0 0 3 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5C0 10.0875 0.146875 9.73438 0.440625 9.44063C0.734375 9.14688 1.0875 9 1.5 9C1.9125 9 2.26562 9.14688 2.55938 9.44063C2.85313 9.73438 3 10.0875 3 10.5C3 10.9125 2.85313 11.2656 2.55938 11.5594C2.26562 11.8531 1.9125 12 1.5 12ZM1.5 7.5C1.0875 7.5 0.734375 7.35312 0.440625 7.05937C0.146875 6.76562 0 6.4125 0 6C0 5.5875 0.146875 5.23438 0.440625 4.94063C0.734375 4.64688 1.0875 4.5 1.5 4.5C1.9125 4.5 2.26562 4.64688 2.55938 4.94063C2.85313 5.23438 3 5.5875 3 6C3 6.4125 2.85313 6.76562 2.55938 7.05937C2.26562 7.35312 1.9125 7.5 1.5 7.5ZM1.5 3C1.0875 3 0.734375 2.85313 0.440625 2.55938C0.146875 2.26562 0 1.9125 0 1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0C1.9125 0 2.26562 0.146875 2.55938 0.440625C2.85313 0.734375 3 1.0875 3 1.5C3 1.9125 2.85313 2.26562 2.55938 2.55938C2.26562 2.85313 1.9125 3 1.5 3Z" fill="#43474F"/></svg>
          </button>
          {isActionOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); }}></div>
                <div className="absolute right-0 top-10 w-32 bg-white border border-[#C3C6D1] rounded shadow-lg z-20 flex flex-col py-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onEditItem?.({ id: (props as any).nodeId, title: props.title }, 'subcategory'); }}
                    className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E]"
                  >
                    Edit Data
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onDeleteItem?.((props as any).nodeId, 'subcategory'); }}
                    className="px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
      </div>
    </div>
  );
}