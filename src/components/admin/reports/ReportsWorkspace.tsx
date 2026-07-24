import ReportsHeader from "./ReportsHeader";
import ReportsToolbar from "./ReportsToolbar";
import ReportsTableSection from "./ReportsTableSection";

export default function ReportsWorkspace() {
  return (
    <div className="flex w-full p-12 flex-col items-start gap-12 w-full">
      <ReportsHeader />
      {/* Menggunakan grid 1 kolom di mobile, dan 2 kolom (rasio ~66% : 33%) di tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] items-start gap-12 w-full">
        <ReportsToolbar />
        <ReportsTableSection />
      </div>
    </div>
  );
}