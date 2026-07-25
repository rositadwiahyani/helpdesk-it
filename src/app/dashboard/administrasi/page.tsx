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
          <TopHelpTopicsPieChart />
          <QuickActions />
          <MostBusyDepartments />
          <SystemAuditLog />
          <SlaHealth />
        </div>
        
      </div>
    </div>
  );
}