import SummaryCards from "@/components/admin/dashboard/SummaryCards";
import TicketTrendChart from "@/components/admin/dashboard/TicketTrendChart";
import DepartmentPerformanceTable from "@/components/admin/dashboard/DepartmentPerformanceTable";
import RecentTicketActivityTable from "@/components/admin/dashboard/RecentTicketActivityTable";
import SlaHealth from "@/components/admin/dashboard/SlaHealth";
import TopHelpTopicsPieChart from "@/components/admin/dashboard/TopHelpTopicsPieChart";
import MostBusyDepartments from "@/components/admin/dashboard/MostBusyDepartments";
import SystemAuditLog from "@/components/admin/dashboard/SystemAuditLog";
import QuickActions from "@/components/admin/dashboard/QuickActions";

export default function DashboardAdministrasiPage() {
  return (
    <div className="flex flex-col gap-6 w-full mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Real-time metrics and system health for UNDIP IT Support.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors focus:ring-2 focus:ring-slate-200 focus:outline-none">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export Report
          </button>
          <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-sm transition-colors focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            New Ticket
          </button>
        </div>
      </div>

      {/* 1. Summary Cards */}
      <SummaryCards />

      {/* 2. Main Content Grid (Left & Right Columns) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <TicketTrendChart />
          <DepartmentPerformanceTable />
          <RecentTicketActivityTable />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <SlaHealth />
          <TopHelpTopicsPieChart />
          <MostBusyDepartments />
          <SystemAuditLog />
          <QuickActions />
        </div>
        
      </div>
    </div>
  );
}