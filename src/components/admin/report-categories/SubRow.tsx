import { ReactNode, useContext } from "react";
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
    }
  | { variant: "leaf-compact"; title: ReactNode; }
  | { variant: "leaf-bordered"; hasDivider: boolean; title: ReactNode; };

export default function SubRow(props: SubRowProps) {
  const ctx = useContext(TreeContext);

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
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" className="shrink-0"><path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM8 16C7.45 16 6.97917 15.8042 6.5875 15.4125C6.19583 15.0208 6 14.55 6 14C6 13.45 6.19583 12.9792 6.5875 12.5875C6.97917 12.1958 7.45 12 8 12C8.55 12 9.02083 12.1958 9.4125 12.5875C9.80417 12.9792 10 13.45 10 14C10 14.55 9.80417 15.0208 9.4125 15.4125C9.02083 15.8042 8.55 16 8 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM8 10C7.45 10 6.97917 9.80417 6.5875 9.4125C6.19583 9.02083 6 8.55 6 8C6 7.45 6.19583 6.97917 6.5875 6.5875C6.97917 6.19583 7.45 6 8 6C8.55 6 9.02083 6.19583 9.4125 6.5875C9.80417 6.97917 10 7.45 10 8C10 8.55 9.80417 9.02083 9.4125 9.4125C9.02083 9.80417 8.55 10 8 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4ZM8 4C7.45 4 6.97917 3.80417 6.5875 3.4125C6.19583 3.02083 6 2.55 6 2C6 1.45 6.19583 0.979167 6.5875 0.5875C6.97917 0.195833 7.45 0 8 0C8.55 0 9.02083 0.195833 9.4125 0.5875C9.80417 0.979167 10 1.45 10 2C10 2.55 9.80417 3.02083 9.4125 3.4125C9.02083 3.80417 8.55 4 8 4Z" fill="#43474F" fillOpacity="0.4" /></svg>
            <svg 
              width="12" height="8" viewBox="0 0 12 8" fill="none" 
              className={`shrink-0 transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
            >
              <path d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z" fill="#43474F" fillOpacity="0.4" />
            </svg>
            <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-medium leading-5 truncate">{props.title}</p>
          </div>
          <div className="w-[140px] flex justify-center shrink-0"><CountBadge variant="text">{props.count}</CountBadge></div>
          <div className="w-[140px] flex justify-center shrink-0"><StatusBadge variant="button">{props.status}</StatusBadge></div>
          <div className="w-[80px] flex justify-end shrink-0" onClick={(e) => e.stopPropagation()}>
            <ActionMenu variant="dots-14" />
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
        <div className="w-[80px] flex justify-end shrink-0"><ActionMenu variant="edit" /></div>
      </div>
    );
  }

  return (
    <div className={`flex py-2.5 px-4 w-full items-center ${props.hasDivider ? "border-b border-[rgba(195,198,209,0.50)]" : ""}`}>
      <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" className="shrink-0 opacity-40"><path d="M6.75 12.75L5.68125 11.6812L8.38125 9H0V0H1.5V7.5H8.38125L5.68125 4.8L6.73125 3.73125L11.25 8.25L6.75 12.75Z" fill="#1A1C1E" /></svg>
        <p className="text-[#1A1C1E] font-iBMPlexSans text-sm truncate">{props.title}</p>
      </div>
      <div className="w-[140px] flex justify-center shrink-0 opacity-60"><p className="text-[#1A1C1E] text-[10px] leading-5">—</p></div>
      <div className="w-[140px] flex justify-center shrink-0"><StatusBadge variant="text-5">AKTIF</StatusBadge></div>
      <div className="w-[80px] flex justify-end shrink-0"><ActionMenu variant="dots-3" /></div>
    </div>
  );
}