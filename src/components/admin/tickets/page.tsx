'use client';
import { useState } from 'react';


export default function TicketsMonitoringPage() {
  const [activeTab, setActiveTab] = useState('All Tickets (248)');

  const tabs = [
    'All Tickets (248)',
    'New (12)',
    'In Progress (45)',
    'Waiting Verification (8)',
    'Resolved (156)',
    'Closed (27)',
  ];

  return (
    <div className="flex flex-col self-stretch gap-6 w-full max-w-[1200px] mx-auto">
      
      {/* Title & Action Buttons Header */}
      <div className="flex justify-between items-start self-stretch">
        <div className="flex flex-col shrink-0 items-start gap-1">
          <div className="flex items-center text-xs font-bold text-[#43474F] gap-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#1A1C1E]">Tickets</span>
          </div>
          <h1 className="text-[#001E40] text-[32px] font-bold">
            Tickets Monitoring
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2 mt-2">
          <button 
            className="flex items-center bg-white text-left py-[9px] px-[17px] gap-[7px] rounded border border-solid border-[#C3C6D1] shadow-sm hover:bg-gray-50"
            onClick={() => alert("Export CSV Pressed!")}
          >
            <span className="text-[#43474F] text-xs font-bold">Export CSV</span>
          </button>
          
          <button 
            className="flex items-center bg-white text-left py-[9px] px-[17px] gap-[7px] rounded border border-solid border-[#C3C6D1] shadow-sm hover:bg-gray-50"
            onClick={() => alert("Filters Pressed!")}
          >
            <span className="text-[#43474F] text-xs font-bold">Filters</span>
          </button>
          
          <button 
            className="flex items-center bg-[#0059BB] text-left py-[9px] px-4 gap-2 rounded text-white shadow-sm hover:bg-[#004494]"
            onClick={() => alert("New Ticket Pressed!")}
          >
            <span className="text-xs font-bold">New Ticket</span>
          </button>
        </div>
      </div>

      {/* Ticket Status Filter Tabs */}
      <div className="flex items-center self-stretch border-b border-[#C3C6D1] gap-6 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3.5 px-1 text-sm font-medium transition-colors border-b-2 ${
                isActive 
                  ? 'text-[#0059BB] border-[#0059BB] font-bold' 
                  : 'text-[#43474F] border-transparent hover:text-black'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tickets Table Section */}
      <div className="self-stretch bg-white rounded-lg border border-solid border-[#C3C6D1] shadow-sm overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-7 items-center bg-[#F3F3F6] p-4 text-xs font-bold text-[#43474F] border-b border-[#C3C6D1]">
          <div>NO. TIKET</div>
          <div>LAST UPDATE</div>
          <div className="col-span-2">SUBJECT</div>
          <div>FROM</div>
          <div>PRIORITY / ASSIGN</div>
          <div>STATUS</div>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-7 items-center p-4 border-b border-[#C3C6D1] text-sm hover:bg-gray-50">
          <div className="font-bold text-[#0059BB]">#TIC-2023-8942</div>
          <div className="text-[#43474F] text-xs">2 mins ago</div>
          <div className="col-span-2 flex flex-col">
            <span className="font-medium text-[#1A1C1E]">SIAKAD login failure - Database Timeout</span>
            <span className="text-[11px] text-[#43474F]">Category: Applications / Academic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#D5E3FF] text-[#001B3C] text-[10px] font-bold px-1.5 py-0.5 rounded-full">AS</div>
            <span className="text-[#1A1C1E]">Andi Saputra</span>
          </div>
          <div>
            <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] font-bold px-2 py-0.5 rounded">CRITICAL</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="bg-[#D5E3FF] text-[#001B3C] text-[11px] font-bold px-2 py-0.5 rounded w-fit">NEW</span>
            <span className="text-[#BA1A1A] text-[10px] font-bold">OVERDUE</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-7 items-center p-4 border-b border-[#C3C6D1] text-sm bg-[#F9F9FC] hover:bg-gray-50">
          <div className="font-bold text-[#0059BB]">#TIC-2023-8935</div>
          <div className="text-[#43474F] text-xs">15 mins ago</div>
          <div className="col-span-2 flex flex-col">
            <span className="font-medium text-[#1A1C1E]">WiFi access issue in Faculty of Law</span>
            <span className="text-[11px] text-[#43474F]">Category: Infrastructure / Networking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#D8E2FF] text-[#001A41] text-[10px] font-bold px-1.5 py-0.5 rounded-full">RM</div>
            <span className="text-[#1A1C1E]">Rina Maheswari</span>
          </div>
          <div>
            <span className="bg-[#FEF1D8] text-[#7D5100] text-[11px] font-bold px-2 py-0.5 rounded">HIGH</span>
          </div>
          <div>
            <span className="bg-[#D8E2FF] text-[#001A41] text-[11px] font-bold px-2 py-0.5 rounded">IN PROGRESS</span>
          </div>
        </div>

        {/* Table Footer / Pagination */}
        <div className="flex justify-between items-center p-4 bg-white text-[13px] text-[#43474F]">
          <span>Showing 1 - 4 of 248 tickets</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-[#0070EA] text-white text-xs font-bold rounded">1</button>
            <button className="px-3 py-1 hover:bg-gray-100 text-xs font-bold rounded">2</button>
            <button className="px-3 py-1 hover:bg-gray-100 text-xs font-bold rounded">3</button>
            <span>...</span>
            <button className="px-3 py-1 hover:bg-gray-100 text-xs font-bold rounded">62</button>
          </div>
        </div>

      </div>

      {/* Bottom Metric Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 self-stretch pb-8">
        
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#C3C6D1] shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[#43474F] text-xs font-bold">Avg. Response Time</span>
            <span className="text-[#001E40] text-2xl font-bold">12m 45s</span>
            <span className="text-green-600 text-[11px]">↑ 2.4% from last week</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#C3C6D1] shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[#43474F] text-xs font-bold">CSAT Score</span>
            <span className="text-[#001E40] text-2xl font-bold">4.8/5.0</span>
            <span className="text-green-600 text-[11px]">↑ 0.2 from last week</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#C3C6D1] shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[#43474F] text-xs font-bold">SLA Compliance</span>
            <span className="text-[#001E40] text-2xl font-bold">96.2%</span>
            <span className="text-[#BA1A1A] text-[11px]">↓ 1.5% from last week</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#C3C6D1] shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[#43474F] text-xs font-bold">Knowledge Articles</span>
            <span className="text-[#001E40] text-2xl font-bold">1,402</span>
            <span className="text-[#43474F] text-[11px]">12 new this month</span>
          </div>
        </div>

      </div>

    </div>
  );
}