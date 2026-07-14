'use client';
import { useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DashboardSubNav from '@/components/admin/layout/DashboardSubNav';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';

const columns: ColumnDef<any>[] = [
  { header: 'Name', accessorKey: 'name', className: 'font-bold w-48' },
  { header: 'Department', accessorKey: 'department' },
  { header: 'Email Address', accessorKey: 'email' },
  { header: 'Phone Number', accessorKey: 'phone' },
  { header: 'Extension', accessorKey: 'ext' },
  { header: 'Mobile Number', accessorKey: 'mobile' },
];

const data = [
  { name: 'application support', department: 'Sistem Informasi', email: 'cybersecurity@live.undip.ac.id', phone: '', ext: '', mobile: '' },
  { name: 'dsti undip', department: 'Sistem Informasi', email: 'dsti@undip.ac.id', phone: '', ext: '', mobile: '' },
  { name: 'fuji yatiningsih', department: 'Sistem Informasi', email: 'fujiyatiningsih1@gmail.com', phone: '', ext: '', mobile: '' },
  { name: 'Help IT', department: 'Sistem Informasi', email: 'wenny.anjarr@gmail.com', phone: '', ext: '', mobile: '' },
  { name: 'magang4 reka', department: 'Unit Layanan Terpadu', email: 'mrekafakhrezi@gmail.com', phone: '', ext: '', mobile: '081234567809' },
];

export default function AgentDirectoryPage() {
  const [searchName, setSearchName] = useState('');
  const [department, setDepartment] = useState('All Departments');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchName = item.name.toLowerCase().includes(searchName.toLowerCase());
      const matchDept = department === 'All Departments' || item.department === department;
      return matchName && matchDept;
    });
  }, [searchName, department]);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Dashboard</h2>
          <p className="text-[var(--text-dim)] text-sm">Direktori seluruh agen sistem helpdesk.</p>
        </div>

        <DashboardSubNav />

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm p-4 flex flex-col sm:flex-row sm:items-end gap-4 -mt-2">
          <div className="flex flex-col gap-2 w-full sm:w-72">
            <input 
              type="text" 
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Cari nama agen..." 
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[var(--text-dim)] text-sm">—</span>
            <select 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] min-w-[200px] flex-1 cursor-pointer transition-colors"
            >
              <option value="All Departments">All Departments</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Unit Layanan Terpadu">Unit Layanan Terpadu</option>
            </select>
            <button className="bg-[var(--paper-2)] text-[var(--text-dim)] px-5 py-2.5 rounded-xl text-sm font-bold border border-[var(--line)] hover:bg-[var(--line)] transition-colors flex-none">
              Filter
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
           <div className="flex items-center gap-2 mb-4 px-2">
             <h3 className="font-bold text-[18px] text-[var(--ink)]">Agents</h3>
             <button className="text-[var(--text-dim)] hover:text-[var(--gold-soft)] transition-colors">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </button>
           </div>
           
           <DataTable 
             columns={columns} 
             data={filteredData} 
             hideSearchBar={true}
           />
        </div>

      </div>
    </AdminLayout>
  );
}
