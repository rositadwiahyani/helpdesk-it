import SummaryCards from "@/components/admin/dashboard/SummaryCards";
import TicketTrendChart from "@/components/admin/dashboard/TicketTrendChart";
import DepartmentPerformanceTable from "@/components/admin/dashboard/DepartmentPerformanceTable";
import RecentTicketActivityTable from "@/components/admin/dashboard/RecentTicketActivityTable";
import SlaHealth from "@/components/admin/dashboard/SlaHealth";
import TopHelpTopicsPieChart from "@/components/admin/dashboard/TopHelpTopicsPieChart";
import { fetchServer } from "@/lib/apiServer";

export const dynamic = 'force-dynamic';

export default async function PimpinanDashboard() {
  let dashboardData: any = {};
  
  try {
    dashboardData = await fetchServer('/admin/dashboard');
  } catch (error: any) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    console.error("Gagal mengambil data dashboard pimpinan:", error);
  }

  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-[1440px] mx-auto pb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">Executive Summary</h1>
          <p className="text-[var(--text-dim)] text-sm font-medium">Ringkasan analitik dan performa layanan IT Helpdesk.</p>
        </div>
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
          
          {/* Department Performance Table */}
          <DepartmentPerformanceTable data={dashboardData.departments} />
          
          {/* Recent Ticket Activity */}
          <RecentTicketActivityTable data={dashboardData.recentLogs} />
        </div>

        {/* Right Column (Narrower - spans 1 col) */}
        <div className="flex flex-col gap-6 w-full">
          {/* Top Help Topics */}
          <TopHelpTopicsPieChart data={dashboardData.categories} />
          
          {/* SLA Health */}
          <SlaHealth data={dashboardData.slaHealth} />
        </div>

      </div>
    </div>
  );
}
