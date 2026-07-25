import { useContext, useMemo, useState } from "react";
import Row from "./Row";
import SubRow from "./SubRow";
import { TreeContext } from "./Workspace";

const initialTreeData = [
  {
    id: "aplikasi",
    title: "Aplikasi",
    count: "5 Items",
    status: "AKTIF",
    iconBgClassName: "bg-[rgba(0,30,64,0.10)]",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM8 16C7.45 16 6.97917 15.8042 6.5875 15.4125C6.19583 15.0208 6 14.55 6 14C6 13.45 6.19583 12.9792 6.5875 12.5875C6.97917 12.1958 7.45 12 8 12C8.55 12 9.02083 12.1958 9.4125 12.5875C9.80417 12.9792 10 13.45 10 14C10 14.55 9.80417 15.0208 9.4125 15.4125C9.02083 15.8042 8.55 16 8 16ZM14 16C13.45 16 12.9792 15.8042 12.5875 15.4125C12.1958 15.0208 12 14.55 12 14C12 13.45 12.1958 12.9792 12.5875 12.5875C12.9792 12.1958 13.45 12 14 12C14.55 12 15.0208 12.1958 15.4125 12.5875C15.8042 12.9792 16 13.45 16 14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM8 10C7.45 10 6.97917 9.80417 6.5875 9.4125C6.19583 9.02083 6 8.55 6 8C6 7.45 6.19583 6.97917 6.5875 6.5875C6.97917 6.19583 7.45 6 8 6C8.55 6 9.02083 6.19583 9.4125 6.5875C9.80417 6.97917 10 7.45 10 8C10 8.55 9.80417 9.02083 9.4125 9.4125C9.02083 9.80417 8.55 10 8 10ZM14 10C13.45 10 12.9792 9.80417 12.5875 9.4125C12.1958 9.02083 12 8.55 12 8C12 7.45 12.1958 6.97917 12.5875 6.5875C12.9792 6.19583 13.45 6 14 6C14.55 6 15.0208 6.19583 15.4125 6.5875C15.8042 6.97917 16 7.45 16 8C16 8.55 15.8042 9.02083 15.4125 9.4125C15.0208 9.80417 14.55 10 14 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4ZM8 4C7.45 4 6.97917 3.80417 6.5875 3.4125C6.19583 3.02083 6 2.55 6 2C6 1.45 6.19583 0.979167 6.5875 0.5875C6.97917 0.195833 7.45 0 8 0C8.55 0 9.02083 0.195833 9.4125 0.5875C9.80417 0.979167 10 1.45 10 2C10 2.55 9.80417 3.02083 9.4125 3.4125C9.02083 3.80417 8.55 4 8 4ZM14 4C13.45 4 12.9792 3.80417 12.5875 3.4125C12.1958 3.02083 12 2.55 12 2C12 1.45 12.1958 0.979167 12.5875 0.5875C12.9792 0.195833 13.45 0 14 0C14.55 0 15.0208 0.195833 15.4125 0.5875C15.8042 0.979167 16 1.45 16 2C16 2.55 15.8042 3.02083 15.4125 3.4125C15.0208 3.80417 14.55 4 14 4Z" fill="#001E40" /></svg>,
    childrenWrapperClassName: "flex flex-col items-end border-l-2 border-l-[rgba(0,89,187,0.20)] w-[calc(100%-56px)]",
    children: [
      {
        id: "sso", title: "SSO", type: "branch", count: "5 Items", status: "AKTIF",
        childrenWrapperClassName: "flex flex-col items-end border-l border-l-[#C3C6D1] w-[calc(100%-48px)]",
        children: [
          { id: "sso-pembuatan", title: "Pembuatan Akun", type: "leaf-compact" },
          { id: "sso-reset-akun", title: "Reset Akun", type: "leaf-compact" },
          { id: "sso-perubahan", title: "Perubahan Profil", type: "leaf-compact" },
          { id: "sso-reset-otp", title: "Reset OTP", type: "leaf-compact" }
        ]
      },
      { id: "siap", title: "SIAP", type: "branch", count: "2 Items", status: "AKTIF" },
      { id: "gentayu", title: "Gentayu", type: "branch", count: "2 Items", status: "AKTIF" }
    ]
  },
  {
    id: "website",
    title: "Website dan Email",
    count: "4 Items",
    status: "AKTIF",
    iconBgClassName: "bg-[rgba(0,89,187,0.10)]",
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0125 20C8.6375 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3625 0 9.9875C0 8.6125 0.2625 7.32083 0.7875 6.1125C1.3125 4.90417 2.02917 3.84583 2.9375 2.9375C3.84583 2.02917 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.6375 0 10.0125 0C11.3875 0 12.6792 0.2625 13.8875 0.7875C15.0958 1.3125 16.1542 2.02917 17.0625 2.9375C17.9708 3.84583 18.6875 4.90417 19.2125 6.1125C19.7375 7.32083 20 8.6125 20 9.9875C20 11.3625 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.9708 16.1542 17.0625 17.0625C16.1542 17.9708 15.0958 18.6875 13.8875 19.2125C12.6792 19.7375 11.3875 20 10.0125 20ZM10 17.95C10.4333 17.35 10.8083 16.725 11.125 16.075C11.4417 15.425 11.7 14.7333 11.9 14H8.1C8.3 14.7333 8.55833 15.425 8.875 16.075C9.19167 16.725 9.56667 17.35 10 17.95ZM7.4 17.55C7.1 17 6.8375 16.4292 6.6125 15.8375C6.3875 15.2458 6.2 14.6333 6.05 14H3.1C3.58333 14.8333 4.1875 15.5583 4.9125 16.175C5.6375 16.7917 6.46667 17.25 7.4 17.55ZM12.6 17.55C13.5333 17.25 14.3625 16.7917 15.0875 16.175C15.8125 15.5583 16.4167 14.8333 16.9 14H13.95C13.8 14.6333 13.6125 15.2458 13.3875 15.8375C13.1625 16.4292 12.9 17 12.6 17.55ZM2.25 12H5.65C5.6 11.6667 5.5625 11.3375 5.5375 11.0125C5.5125 10.6875 5.5 10.35 5.5 10C5.5 9.65 5.5125 9.3125 5.5375 8.9875C5.5625 8.6625 5.6 8.33333 5.65 8H2.25C2.16667 8.33333 2.10417 8.6625 2.0625 8.9875C2.02083 9.3125 2 9.65 2 10C2 10.35 2.02083 10.6875 2.0625 11.0125C2.10417 11.3375 2.16667 11.6667 2.25 12ZM7.65 12H12.35C12.4 11.6667 12.4375 11.3375 12.4625 11.0125C12.4875 10.6875 12.5 10.35 12.5 10C12.5 9.65 12.4875 9.3125 12.4625 8.9875C12.4375 8.6625 12.4 8.33333 12.35 8H7.65C7.6 8.33333 7.5625 8.6625 7.5375 8.9875C7.5125 9.3125 7.5 9.65 7.5 10C7.5 10.35 7.5125 10.6875 7.5375 11.0125C7.5625 11.3375 7.6 11.6667 7.65 12ZM14.35 12H17.75C17.8333 11.6667 17.8958 11.3375 17.9375 11.0125C17.9792 10.6875 18 10.35 18 10C18 9.65 17.9792 9.3125 17.9375 8.9875C17.8958 8.6625 17.8333 8.33333 17.75 8H14.35C14.4 8.33333 14.4375 8.6625 14.4625 8.9875C14.4875 9.3125 14.5 9.65 14.5 10C14.5 10.35 14.4875 10.6875 14.4625 11.0125C14.4375 11.3375 14.4 11.6667 14.35 12ZM13.95 6H16.9C16.4167 5.16667 15.8125 4.44167 15.0875 3.825C14.3625 3.20833 13.5333 2.75 12.6 2.45C12.9 3 13.1625 3.57083 13.3875 4.1625C13.6125 4.75417 13.8 5.36667 13.95 6ZM8.1 6H11.9C11.7 5.26667 11.4417 4.575 11.125 3.925C10.8083 3.275 10.4333 2.65 10 2.05C9.56667 2.65 9.19167 3.275 8.875 3.925C8.55833 4.575 8.3 5.26667 8.1 6ZM3.1 6H6.05C6.2 5.36667 6.3875 4.75417 6.6125 4.1625C6.8375 3.57083 7.1 3 7.4 2.45C6.46667 2.75 5.6375 3.20833 4.9125 3.825C4.1875 4.44167 3.58333 5.16667 3.1 6Z" fill="#0059BB" /></svg>,
    childrenWrapperClassName: "flex flex-col items-end border-l-2 border-l-[rgba(0,89,187,0.20)] w-[calc(100%-56px)]",
    children: [
      { id: "web-domain", title: "Domain", type: "leaf-bordered" },
      { id: "web-website", title: "Website", type: "leaf-bordered" },
      { id: "web-email", title: "Email", type: "leaf-bordered" },
      { id: "web-lisensi", title: "Lisensi", type: "leaf-bordered" }
    ]
  },
  {
    id: "jaringan",
    title: "Jaringan dan Internet",
    count: "3 Items",
    status: "AKTIF",
    iconBgClassName: "bg-[rgba(0,89,187,0.10)]",
    icon: <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 19C1.45 19 0.979167 18.8042 0.5875 18.4125C0.195833 18.0208 0 17.55 0 17V13C0 12.45 0.195833 11.9792 0.5875 11.5875C0.979167 11.1958 1.45 11 2 11H12V7H14V11H16C16.55 11 17.0208 11.1958 17.4125 11.5875C17.8042 11.9792 18 12.45 18 13V17C18 17.55 17.8042 18.0208 17.4125 18.4125C17.0208 18.8042 16.55 19 16 19H2ZM2 17H16V13H2V17ZM4 16C4.28333 16 4.52083 15.9042 4.7125 15.7125C4.90417 15.5208 5 15.2833 5 15C5 14.7167 4.90417 14.4792 4.7125 14.2875C4.52083 14.0958 4.28333 14 4 14C3.71667 14 3.47917 14.0958 3.2875 14.2875C3.09583 14.4792 3 14.7167 3 15C3 15.2833 3.09583 15.5208 3.2875 15.7125C3.47917 15.9042 3.71667 16 4 16ZM7.5 16C7.78333 16 8.02083 15.9042 8.2125 15.7125C8.40417 15.5208 8.5 15.2833 8.5 15C8.5 14.7167 8.40417 14.4792 8.2125 14.2875C8.02083 14.0958 7.78333 14 7.5 14C7.21667 14 6.97917 14.0958 6.7875 14.2875C6.59583 14.4792 6.5 14.7167 6.5 15C6.5 15.2833 6.59583 15.5208 6.7875 15.7125C6.97917 15.9042 7.21667 16 7.5 16ZM11 16C11.2833 16 11.5208 15.9042 11.7125 15.7125C11.9042 15.5208 12 15.2833 12 15C12 14.7167 11.9042 14.4792 11.7125 14.2875C11.5208 14.0958 11.2833 14 11 14C10.7167 14 10.4792 14.0958 10.2875 14.2875C10.0958 14.4792 10 14.7167 10 15C10 15.2833 10.0958 15.5208 10.2875 15.7125C10.4792 15.9042 10.7167 16 11 16ZM11.25 6.25L9.8 4.8C10.2333 4.4 10.7167 4.08333 11.25 3.85C11.7833 3.61667 12.3667 3.5 13 3.5C13.6333 3.5 14.2167 3.61667 14.75 3.85C15.2833 4.08333 15.7667 4.4 16.2 4.8L14.75 6.25C14.5167 6.01667 14.2542 5.83333 13.9625 5.7C13.6708 5.56667 13.35 5.5 13 5.5C12.65 5.5 12.3292 5.56667 12.0375 5.7C11.7458 5.83333 11.4833 6.01667 11.25 6.25ZM8.75 3.75L7.35 2.35C8.08333 1.61667 8.93333 1.04167 9.9 0.625C10.8667 0.208333 11.9 0 13 0C14.1 0 15.1333 0.208333 16.1 0.625C17.0667 1.04167 17.9167 1.61667 18.65 2.35L17.25 3.75C16.7 3.2 16.0625 2.77083 15.3375 2.4625C14.6125 2.15417 13.8333 2 13 2C12.1667 2 11.3875 2.15417 10.6625 2.4625C9.9375 2.77083 9.3 3.2 8.75 3.75ZM2 17V13V17Z" fill="#0059BB" /></svg>,
    childrenWrapperClassName: "flex flex-col items-end border-l-2 border-l-[rgba(0,89,187,0.20)] w-[calc(100%-56px)]",
    children: [
      { id: "jar-wifi", title: "WiFi", type: "leaf-bordered" },
      { id: "jar-vpn", title: "VPN", type: "leaf-bordered" },
      { id: "jar-vm", title: "VM", type: "leaf-bordered" }
    ]
  },
  {
    id: "cyber",
    title: "Cyber Security",
    count: "2 Items",
    status: "AKTIF",
    iconBgClassName: "bg-[rgba(186,26,26,0.10)]",
    icon: <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.2458 13.9375 13.7375 16.0125C12.2292 18.0875 10.3167 19.4167 8 20ZM8 17.9C9.61667 17.4 10.9667 16.4125 12.05 14.9375C13.1333 13.4625 13.7667 11.8167 13.95 10H8V2.125L2 4.375V9.1C2 9.28333 2 9.43333 2 9.55C2 9.66667 2.01667 9.81667 2.05 10H8V17.9Z" fill="#BA1A1A" /></svg>,
    childrenWrapperClassName: "flex flex-col items-end border-l-2 border-l-[rgba(0,89,187,0.20)] w-[calc(100%-56px)]",
    children: [
      { id: "cyb-backdoor", title: "Backdoor", type: "leaf-bordered" },
      { id: "cyb-keamanan", title: "Keamanan Sistem", type: "leaf-bordered" }
    ]
  }
];

export default function Tree() {
  const ctx = useContext(TreeContext);
  const [treeData, setTreeData] = useState(initialTreeData);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    
    const updatedData = [...treeData];
    const [movedItem] = updatedData.splice(draggedIndex, 1);
    updatedData.splice(targetIndex, 0, movedItem);
    
    setTreeData(updatedData);
    setDraggedIndex(null);
  };

  const filteredData = useMemo(() => {
    if (!ctx?.searchQuery) return treeData;
    const lowerQuery = ctx.searchQuery.toLowerCase();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filterNodes = (nodes: any[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return nodes.reduce((acc: any[], node: any) => {
        const isMatch = node.title.toLowerCase().includes(lowerQuery);
        let filteredChildren = [];
        if (node.children) {
          filteredChildren = filterNodes(node.children);
        }

        if (isMatch) {
          acc.push({ ...node, children: node.children });
        } else if (filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren });
        }
        return acc;
      }, []);
    };

    return filterNodes(treeData);
  }, [ctx?.searchQuery, treeData]);

  return (
    <div className="w-full flex flex-col bg-[#FFF]">
      
      {/* DAFTAR KATEGORI DENGAN FITUR DRAG AND DROP (Header dihapus) */}
      <div className="w-full flex flex-col">
        {filteredData.map((row, index) => (
          <div
            key={row.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`w-full transition-colors cursor-grab active:cursor-grabbing ${
              draggedIndex === index ? "opacity-40 bg-blue-50" : "hover:bg-[#FAFAFB]"
            }`}
          >
            <Row
              nodeId={row.id}
              outerWrapperClassName={`flex flex-col items-end w-full ${index > 0 ? "border-t border-t-[#C3C6D1]" : ""}`}
              iconBgClassName={row.iconBgClassName}
              icon={row.icon}
              title={row.title}
              count={row.count}
              status={row.status}
              childrenWrapperClassName={row.childrenWrapperClassName}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {row.children?.map((child: any, cIndex: number) => {
                if (child.type === "branch") {
                  return (
                    <SubRow
                      key={child.id}
                      variant="branch"
                      nodeId={child.id}
                      headerClassName={`w-full relative ${cIndex > 0 ? "border-t border-t-[#C3C6D1]" : ""}`}
                      title={child.title}
                      count={child.count}
                      status={child.status}
                      childrenWrapperClassName={child.childrenWrapperClassName}
                    >
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {child.children?.map((subChild: any, scIndex: number) => (
                        <SubRow
                          key={subChild.id}
                          variant={subChild.type}
                          title={subChild.title}
                          hasDivider={subChild.type === "leaf-bordered" ? scIndex < child.children.length - 1 : undefined}
                        />
                      ))}
                    </SubRow>
                  );
                }
                
                return (
                  <SubRow
                    key={child.id}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    variant={child.type as any}
                    title={child.title}
                    hasDivider={child.type === "leaf-bordered" ? cIndex < row.children.length - 1 : undefined}
                  />
                );
              })}
            </Row>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="p-8 w-full flex justify-center text-center text-[#6B7280] text-sm">
            Tidak ada kategori yang sesuai dengan pencarian &quot;{ctx?.searchQuery}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}