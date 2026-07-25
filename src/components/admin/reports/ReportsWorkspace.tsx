import ReportsHeader from "./ReportsHeader";
import ReportsToolbar from "./ReportsToolbar";
import ReportsTableSection from "./ReportsTableSection";

export default function ReportsWorkspace() {
  return (
    // PERUBAHAN: Menghapus max-w-[1024px] agar layout mengisi ruang kosong di sebelah kanan
    <div className="flex p-12 flex-col items-start gap-12 w-full">
      <ReportsHeader />
      
      <div className="flex flex-col items-start gap-12 w-full">
        <ReportsToolbar />
        <ReportsTableSection />
      </div>
    </div>
  );
}