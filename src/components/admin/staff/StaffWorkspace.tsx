'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import StaffHeader from "./StaffHeader";
import AgentModal from "./AgentModal";
import DeptModal from "./DeptModal";

type StaffTab = "Agents" | "Teams" | "Departments";

export default function StaffWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StaffTab>("Agents");
  const [agents, setAgents] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data: deptData } = await supabase.from('departments').select('*').order('name');
    const { data: staffData } = await supabase.from('staff_profiles').select('*, dept:departments(name)').in('role', ['teknisi', 'operator', 'admin']).order('name');
    
    if (deptData) setDepartments(deptData);
    if (staffData) setAgents(staffData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-start gap-4 w-full relative">
      <StaffHeader />
      
      {/* Toolbar - Now ABOVE the tabs */}
      <div className="flex w-full justify-between items-center w-full mb-2 mt-2">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder={`Cari ${activeTab.toLowerCase()}...`} 
              className="pl-9 pr-4 py-2 text-sm border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] w-full" 
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
        {(activeTab === 'Agents' || activeTab === 'Departments') && (
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => {
                if (activeTab === 'Agents') {
                  setIsAgentModalOpen(true);
                } else if (activeTab === 'Departments') {
                  setSelectedDept(null);
                  setIsDeptModalOpen(true);
                }
              }}
              title={`Tambah ${activeTab}`} 
              className="flex items-center gap-2 px-4 py-2 bg-[#001E40] text-white rounded hover:bg-[#00142d] text-sm font-iBMPlexSans"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              Tambah {activeTab === 'Agents' ? 'Staf' : 'Dept'}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full overflow-hidden relative">
        {/* Tabs - Now BELOW the toolbar and inside the card structure, or just top of the content */}
        <div className="flex items-center border-b border-b-[#C3C6D1] w-full bg-[#FAFAFA]">
          <button
            onClick={() => setActiveTab('Agents')}
            className={`cursor-pointer text-nowrap flex py-3 px-6 flex-col justify-center items-center border-b-2 w-fit ${
              activeTab === 'Agents' ? 'border-b-[#001E40] bg-white' : 'border-b-[rgba(0,0,0,0.00)]'
            }`}
          >
            <p className={`font-iBMPlexSans text-sm leading-5 w-fit ${activeTab === 'Agents' ? 'text-[#001E40] font-bold' : 'text-[#43474F]'}`}>
              Agents
            </p>
          </button>
          <button
            onClick={() => setActiveTab('Teams')}
            className={`cursor-pointer text-nowrap flex py-3 px-6 flex-col justify-center items-center border-b-2 w-fit ${
              activeTab === 'Teams' ? 'border-b-[#001E40] bg-white' : 'border-b-[rgba(0,0,0,0.00)]'
            }`}
          >
            <p className={`font-iBMPlexSans text-sm leading-5 w-fit ${activeTab === 'Teams' ? 'text-[#001E40] font-bold' : 'text-[#43474F]'}`}>
              Teams
            </p>
          </button>
          <button
            onClick={() => setActiveTab('Departments')}
            className={`cursor-pointer text-nowrap flex py-3 px-6 flex-col justify-center items-center border-b-2 w-fit ${
              activeTab === 'Departments' ? 'border-b-[#001E40] bg-white' : 'border-b-[rgba(0,0,0,0.00)]'
            }`}
          >
            <p className={`font-iBMPlexSans text-sm leading-5 w-fit ${activeTab === 'Departments' ? 'text-[#001E40] font-bold' : 'text-[#43474F]'}`}>
              Departments
            </p>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col w-full bg-white relative">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <div className="w-full overflow-x-auto">
              {activeTab === "Agents" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-b-[#C3C6D1] bg-[#F3F3F6]">
                      <th className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-[11px] font-bold tracking-[0.05em]">NAMA</th>
                      <th className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-[11px] font-bold tracking-[0.05em]">EMAIL</th>
                      <th className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-[11px] font-bold tracking-[0.05em]">PERAN</th>
                      <th className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-[11px] font-bold tracking-[0.05em]">DEPARTEMEN</th>
                      <th className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-[11px] font-bold tracking-[0.05em] w-24">AKSI</th>
                    </tr>
                  </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id} className="border-b border-[#E5E7EB] hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-[#1A1C1E]">
                        <Link href={`/dashboard/administrasi/staff/${agent.id}`} className="hover:text-blue-600 hover:underline font-bold">
                          {agent.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#43474F]">{agent.email}</td>
                      <td className="px-4 py-3 text-sm text-[#43474F] uppercase">{agent.role}</td>
                      <td className="px-4 py-3 text-sm text-[#43474F]">{agent.dept?.name || '-'}</td>
                      <td className="px-4 py-3 text-sm text-center">
                        <button 
                          onClick={() => {
                            router.push(`/dashboard/administrasi/staff/${agent.id}?edit=true`);
                          }}
                          className="p-1.5 text-[#1E3A8A] hover:bg-slate-100 rounded transition-colors inline-flex" 
                          title="Edit Data"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {agents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">Belum ada data agen.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeTab === "Departments" && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-b-[#C3C6D1] bg-[#F3F3F6]">
                    <th className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-[11px] font-bold tracking-[0.05em]">ID</th>
                    <th className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-[11px] font-bold tracking-[0.05em]">NAMA DEPARTEMEN</th>
                    <th className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-[11px] font-bold tracking-[0.05em] w-24">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.id} className="border-b border-[#E5E7EB] hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-[#43474F]">{dept.id}</td>
                      <td className="px-4 py-3 text-sm text-[#1A1C1E] font-medium">{dept.name}</td>
                      <td className="px-4 py-3 text-sm">
                        <button 
                          onClick={() => {
                            setSelectedDept(dept);
                            setIsDeptModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {departments.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500">Belum ada data departemen.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeTab === "Teams" && (
              <div className="p-8 text-center text-gray-500">
                Fitur Teams sedang dalam pengembangan.
              </div>
            )}
            </div>
        )}
        </div>
      </div>

      {/* Modals */}
      <AgentModal 
        isOpen={isAgentModalOpen} 
        onClose={() => setIsAgentModalOpen(false)}
        onSuccess={() => { setIsAgentModalOpen(false); fetchData(); }}
        agent={null}
        departments={departments}
      />
      <DeptModal 
        isOpen={isDeptModalOpen} 
        onClose={() => setIsDeptModalOpen(false)}
        onSuccess={() => { setIsDeptModalOpen(false); fetchData(); }}
        dept={selectedDept}
      />
    </div>
  );
}