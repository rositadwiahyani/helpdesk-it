"use client";

import SummaryCards from "@/components/admin/dashboard/SummaryCards";
import TicketTrendChart from "@/components/admin/dashboard/TicketTrendChart";
import CategoryDistribution from "@/components/admin/dashboard/CategoryDistribution";
import OverviewTable from "@/components/admin/dashboard/OverviewTable";
import RecentActivities from "@/components/admin/dashboard/RecentActivities";

export default function DashboardAdministrasiPage() {
  return (
    <div className="relative z-0 flex w-full flex-col items-start gap-6 max-w-[1024px] mx-auto">
      {/* Title & Filter Section */}
      <section className="flex w-full items-end justify-around">
        <div className="flex w-full flex-1 items-start justify-between">
          <div className="inline-flex flex-col items-start gap-1">
            <h1 className="[font-family:'Nimbus_Sans-Bold',Helvetica] text-2xl font-bold leading-8 text-gray-900">
              Dashboard Administrator
            </h1>
            <p className="[font-family:'Nimbus_Sans-Regular',Helvetica] text-sm font-normal leading-5 text-gray-500">
              Ringkasan aktivitas dan metric sistem helpdesk.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-w-[280px] items-center justify-between rounded-lg border border-[#c3c6d1] bg-white px-4 py-2 shadow-sm"
          >
            <span className="inline-flex items-center">
              <span className="[font-family:'Nimbus_Sans-Regular',Helvetica] text-sm leading-5 text-gray-400">
                Report timeframe:
              </span>
              <span className="[font-family:'Nimbus_Sans-Bold',Helvetica] pl-2 text-sm font-bold leading-5 text-gray-700">
                06/21/2026 - 07/21/2026
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* 1. Cards Ringkasan */}
      <SummaryCards />

      {/* 2. Charts */}
      <section className="grid h-fit w-full grid-cols-3 grid-rows-[378px] gap-6">
        <TicketTrendChart />
        <CategoryDistribution />
      </section>

      {/* 3. Table dengan Tab */}
      <OverviewTable />

      {/* 4. Audit Log & Top Categories */}
      <RecentActivities />
    </div>
  );
}