import Workspace from "@/components/admin/report-categories/Workspace";

export default function KategoriLaporanPage() {
  return (
    <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both w-full h-full">
        <Workspace />
      </div>
    </div>
  );
}