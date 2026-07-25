import { ReactNode, useContext } from "react";
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
        className="flex py-4 px-4 w-full items-center bg-white relative z-10 cursor-pointer hover:bg-[#F8F9FA] transition-colors"
        onClick={handleToggle}
      >
        <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
          <svg 
            width="12" height="8" viewBox="0 0 12 8" fill="none" 
            className={`shrink-0 transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
          >
            <path d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z" fill="#0059BB" />
          </svg>
          <div className={`flex justify-center items-center rounded-sm ${iconBgClassName} w-8 h-8 shrink-0`}>
            {icon}
          </div>
          <p className="text-[#001E40] font-iBMPlexSans text-base font-semibold leading-6 truncate">
            {title}
          </p>
        </div>
        <div className="w-[140px] flex justify-center shrink-0">
          <CountBadge variant="pill">{count}</CountBadge>
        </div>
        <div className="w-[140px] flex justify-center shrink-0">
          <StatusBadge variant="dot">{status}</StatusBadge>
        </div>
        <div className="w-[80px] flex justify-end shrink-0" onClick={(e) => e.stopPropagation()}>
          <ActionMenu variant="dots-16" />
        </div>
      </div>
      {/* Logic untuk hide/show children saat di collapse */}
      {isExpanded && (
        <div className={childrenWrapperClassName}>{children}</div>
      )}
    </div>
  );
}