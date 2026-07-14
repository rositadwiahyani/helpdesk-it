'use client';
import { useState } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DashboardSubNav from '@/components/admin/layout/DashboardSubNav';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';
import StatCard from '@/components/admin/cards/StatCard';

// ==========================================
// DUMMY DATA STATISTIK
// ==========================================
const DUMMY_DEPT = [
  { name: 'Infrastruktur Jaringan', opened: 45, assigned: 12, overdue: 2, closed: 30, reopened: 1, deleted: 0, serviceTime: '4j 15m', responseTime: '45m' },
  { name: 'Layanan Akun', opened: 120, assigned: 40, overdue: 0, closed: 80, reopened: 5, deleted: 2, serviceTime: '1j 30m', responseTime: '15m' },
  { name: 'Sistem Informasi', opened: 65, assigned: 25, overdue: 5, closed: 32, reopened: 3, deleted: 0, serviceTime: '8j 00m', responseTime: '2j 10m' },
];

const DUMMY_TOPIC = [
  { name: 'Gangguan eduroam', opened: 30, assigned: 10, overdue: 1, closed: 19, reopened: 0, deleted: 0, serviceTime: '2j 10m', responseTime: '30m' },
  { name: 'Lupa Password SSO', opened: 100, assigned: 15, overdue: 0, closed: 85, reopened: 2, deleted: 0, serviceTime: '0j 45m', responseTime: '10m' },
  { name: 'Error E-Learning', opened: 50, assigned: 20, overdue: 3, closed: 26, reopened: 1, deleted: 1, serviceTime: '5j 30m', responseTime: '1j 00m' },
];

const DUMMY_AGENT = [
  { name: 'Budi (Jaringan)', opened: 15, assigned: 15, overdue: 1, closed: 12, reopened: 0, deleted: 0, serviceTime: '3j 20m', responseTime: '20m' },
  { name: 'Siti (Akun)', opened: 40, assigned: 40, overdue: 0, closed: 38, reopened: 1, deleted: 0, serviceTime: '1j 15m', responseTime: '12m' },
  { name: 'Agus (Sisfo)', opened: 25, assigned: 25, overdue: 4, closed: 15, reopened: 2, deleted: 0, serviceTime: '7j 45m', responseTime: '1j 30m' },
];

// ==========================================
// DEFINISI KOLOM (REUSABLE UNTUK SEMUA TAB)
// ==========================================
const getColumns = (firstColHeader: string): ColumnDef<any>[] => [
  { header: firstColHeader, accessorKey: 'name', className: 'w-48 font-bold' },
  { header: 'Opened', accessorKey: 'opened' },
  { header: 'Assigned', accessorKey: 'assigned' },
  { 
    header: 'Overdue', 
    cell: (item) => (
      <span className={item.overdue > 0 ? 'text-red-600 font-bold' : ''}>{item.overdue}</span>
    )
  },
  { header: 'Closed', accessorKey: 'closed' },
  { header: 'Reopened', accessorKey: 'reopened' },
  { header: 'Deleted', accessorKey: 'deleted' },
  { header: 'Service Time', accessorKey: 'serviceTime' },
  { header: 'Response Time', accessorKey: 'responseTime' },
];

export default function DashboardPage() {
  // STATE MANAGEMENT
  const [presetRange, setPresetRange] = useState('Last 7 Days');
  const [activeTab, setActiveTab] = useState<'department' | 'topic' | 'agent'>('department');
  
  // Data Tabel berdasarkan Tab Aktif
  let currentData = DUMMY_DEPT;
  let firstColHeader = 'Department';
  
  if (activeTab === 'topic') {
    currentData = DUMMY_TOPIC;
    firstColHeader = 'Help Topic';
  } else if (activeTab === 'agent') {
    currentData = DUMMY_AGENT;
    firstColHeader = 'Agent';
  }

  // FUNGSI EXPORT DATA (Hanya mengekspor data yang sedang tampil di tabel)
  const handleExport = () => {
    const columns = getColumns(firstColHeader);
    const headers = columns.map(col => col.header).join(',');
    
    const rows = currentData.map(item => {
      return columns.map(col => {
        const val = col.accessorKey ? (item as any)[col.accessorKey] : '-';
        return `"${val}"`;
      }).join(',');
    });
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Export_${activeTab}_${presetRange.replace(/ /g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* HEADER DASHBOARD */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Dashboard</h2>
          <p className="text-[var(--text-dim)] text-sm">Ringkasan aktivitas tiket dan performa helpdesk.</p>
        </div>

        {/* SUB NAVIGATION TABS */}
        <DashboardSubNav />

        {/* 4 STATISTIC CARDS (DIKEMBALIKAN SESUAI PERMINTAAN) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Tiket Masuk" value="161" description="Total bulan ini" icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
          } />
          <StatCard title="Sedang Diproses" value="114" description="Menunggu respon" icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          } />
          <StatCard title="Tiket Tertunda" value="80" description="Melewati SLA" trend="-5%" trendUp={false} icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          } />
          <StatCard title="Tiket Selesai" value="90" description="Berhasil ditutup" trend="+12%" trendUp={true} icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          } />
        </div>

        {/* 1. REPORT FILTER PANEL */}
        <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm p-4 lg:p-5 flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[var(--ink)]">Report Timeframe</label>
            <select 
              value={presetRange}
              onChange={(e) => setPresetRange(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] min-w-[200px]"
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="This Week">This Week</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Year">This Year</option>
              <option value="Custom">Custom Date Range...</option>
            </select>
          </div>

          {presetRange === 'Custom' && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[var(--ink)]">Dari Tanggal</label>
                <input type="date" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)]" />
              </div>
              <span className="mt-6 text-[var(--text-dim)]">-</span>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[var(--ink)]">Sampai Tanggal</label>
                <input type="date" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)]" />
              </div>
            </div>
          )}

          <div className="mt-4 md:mt-0 md:ml-auto">
            <button className="w-full md:w-auto bg-[var(--ink)] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Refresh
            </button>
          </div>
        </div>

        {/* 2. TICKET ACTIVITY CHART (PLACEHOLDER) */}
        <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[16px] text-[var(--ink)]">Ticket Activity</h3>
            
            {/* Chart Legend */}
            <div className="hidden sm:flex flex-wrap items-center gap-4 text-[12px] font-bold">
              <span className="flex items-center gap-1.5 text-[var(--text-dim)]"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Created</span>
              <span className="flex items-center gap-1.5 text-[var(--text-dim)]"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Assigned</span>
              <span className="flex items-center gap-1.5 text-[var(--text-dim)]"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Closed</span>
              <span className="flex items-center gap-1.5 text-[var(--text-dim)]"><span className="w-3 h-3 rounded-full bg-gray-500"></span> Edited</span>
              <span className="flex items-center gap-1.5 text-[var(--text-dim)]"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Reopened</span>
              <span className="flex items-center gap-1.5 text-[var(--text-dim)]"><span className="w-3 h-3 rounded-full bg-red-500"></span> Overdue</span>
              <span className="flex items-center gap-1.5 text-[var(--text-dim)]"><span className="w-3 h-3 rounded-full bg-pink-500"></span> Resent</span>
            </div>
          </div>
          
          {/* Mock Chart Area */}
          <div className="w-full h-64 sm:h-80 bg-[var(--paper)] rounded-xl border-2 border-dashed border-[var(--line-dark)] flex items-center justify-center relative overflow-hidden">
            {/* Garis-garis dekorasi grid untuk mensimulasikan chart */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-30">
              <div className="border-b border-r border-[var(--line-dark)]"></div><div className="border-b border-r border-[var(--line-dark)]"></div><div className="border-b border-r border-[var(--line-dark)]"></div><div className="border-b border-[var(--line-dark)]"></div>
              <div className="border-b border-r border-[var(--line-dark)]"></div><div className="border-b border-r border-[var(--line-dark)]"></div><div className="border-b border-r border-[var(--line-dark)]"></div><div className="border-b border-[var(--line-dark)]"></div>
              <div className="border-b border-r border-[var(--line-dark)]"></div><div className="border-b border-r border-[var(--line-dark)]"></div><div className="border-b border-r border-[var(--line-dark)]"></div><div className="border-b border-[var(--line-dark)]"></div>
              <div className="border-r border-[var(--line-dark)]"></div><div className="border-r border-[var(--line-dark)]"></div><div className="border-r border-[var(--line-dark)]"></div><div></div>
            </div>
            
            {/* Visual Gelombang (Simulasi Grafik) */}
            <div className="absolute inset-x-0 bottom-0 h-32 flex items-end opacity-20">
              <svg className="w-full h-full text-blue-500" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,100 L0,50 Q25,80 50,30 T100,60 L100,100 Z" />
              </svg>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-40 flex items-end opacity-20">
              <svg className="w-full h-full text-emerald-500" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,100 L0,80 Q30,10 60,70 T100,40 L100,100 Z" />
              </svg>
            </div>

            <span className="text-[var(--text-dim)] font-bold tracking-wide relative z-10 flex flex-col items-center gap-2">
              <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              Area Grafik / Chart Placeholder
            </span>
          </div>
        </div>

        {/* 3. STATISTICS TABLE (TABBED) */}
        <div className="flex flex-col gap-4 mt-2">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <button 
              onClick={() => setActiveTab('department')}
              className={`px-5 py-2.5 rounded-full text-[13.5px] font-bold whitespace-nowrap transition-colors ${activeTab === 'department' ? 'bg-[var(--ink)] text-white shadow-sm' : 'bg-white text-[var(--text-dim)] border border-[var(--line)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]'}`}
            >
              Department
            </button>
            <button 
              onClick={() => setActiveTab('topic')}
              className={`px-5 py-2.5 rounded-full text-[13.5px] font-bold whitespace-nowrap transition-colors ${activeTab === 'topic' ? 'bg-[var(--ink)] text-white shadow-sm' : 'bg-white text-[var(--text-dim)] border border-[var(--line)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]'}`}
            >
              Help Topic
            </button>
            <button 
              onClick={() => setActiveTab('agent')}
              className={`px-5 py-2.5 rounded-full text-[13.5px] font-bold whitespace-nowrap transition-colors ${activeTab === 'agent' ? 'bg-[var(--ink)] text-white shadow-sm' : 'bg-white text-[var(--text-dim)] border border-[var(--line)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]'}`}
            >
              Agent
            </button>
          </div>

          {/* DataTable Component */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <DataTable 
              columns={getColumns(firstColHeader)} 
              data={currentData} 
              searchPlaceholder={`Cari ${firstColHeader.toLowerCase()}...`}
              hidePagination={true}
              footerLeft={
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-1.5 text-[13px] font-bold text-[var(--gold-soft)] hover:text-[var(--gold-dim)] transition-colors px-2 py-1 rounded-md hover:bg-blue-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
              }
            />
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
