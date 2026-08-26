import SummaryCards from "@/components/admin/dashboard/SummaryCards";
import TicketTrendChart from "@/components/admin/dashboard/TicketTrendChart";
import DepartmentPerformanceTable from "@/components/admin/dashboard/DepartmentPerformanceTable";
import RecentTicketActivityTable from "@/components/admin/dashboard/RecentTicketActivityTable";
import TopHelpTopicsPieChart from "@/components/admin/dashboard/TopHelpTopicsPieChart";
import { fetchServer } from "@/lib/apiServer";

export default async function AdministrasiDashboard() {
  let dashboardData: any = {};
  
  try {
    dashboardData = await fetchServer('/admin/dashboard');
  } catch (error: any) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    console.error("Gagal mengambil data dashboard administrasi:", error);
    // Kita bisa mengatur state error atau menampilkan toast, tapi untuk SSR kita lewati sementara
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-10 w-full max-w-[1440px] mx-auto pb-10">
      {/* Page Header */}
      <div className="animate-in fade-in slide-in-from-left-4 duration-500">
          <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Dashboard Overview</h1>
          <p className="text-[var(--text-dim)] text-sm">Welcome back, Administrator. Here's what's happening today.</p>
      </div>

      {/* Row 1: Summary Cards */}
      <div className="w-full">
        <SummaryCards data={dashboardData.summary} />
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* Left Column (Wider - spans 2 cols on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full">
          {/* Ticket Trend Chart */}
          <TicketTrendChart data={dashboardData.ticketTrend} />
        </div>

        {/* Right Column (Narrower - spans 1 col) */}
        <div className="flex flex-col gap-6 w-full">
          {/* Top Help Topics (Moved to top of right column) */}
          <TopHelpTopicsPieChart data={dashboardData.categories} />
        </div>

      </div>

      {/* Full Width Tables Below Grid */}
      <div className="flex flex-col gap-6 w-full">
        {/* Department Performance Table */}
        <DepartmentPerformanceTable data={dashboardData.departments} />
        
        {/* Recent Ticket Activity */}
        <RecentTicketActivityTable data={dashboardData.recentLogs} />
      </div>
    </div>
  );
}