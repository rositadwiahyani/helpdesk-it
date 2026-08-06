"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import StaffHeader from "./StaffHeader";
import AgentModal from "./AgentModal";
import DeptModal from "./DeptModal";

type StaffTab = "Agents" | "Teams" | "Departments";

export default function StaffWorkspace() {
  const [activeTab, setActiveTab] = useState<StaffTab>("Agents");
  const [agents, setAgents] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
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
    <div className="flex flex-col items-start bg-[#F8F9FA] min-h-screen relative w-full pt-8 px-8 pb-16 gap-8">
      <StaffHeader activeTab={activeTab} setActiveTab={(t) => setActiveTab(t as StaffTab)} />
      
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center bg-white p-4 rounded-t border-b border-[#C3C6D1]">
        <div className="flex bg-[#F3F3F6] border border-[#C3C6D1] rounded px-4 py-2 w-64 items-center">
          <input type="text" placeholder={`Cari ${activeTab.toLowerCase()}...`} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        {(activeTab === 'Agents' || activeTab === 'Departments') && (
          <button 
            onClick={() => {
              if (activeTab === 'Agents') {
                setSelectedAgent(null);
                setIsAgentModalOpen(true);
              } else {
                setSelectedDept(null);
                setIsDeptModalOpen(true);
              }
            }}
            className="bg-[#001E40] text-white px-4 py-2 rounded text-sm hover:bg-[#00142d] transition-colors flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/></svg>
            Tambah {activeTab === 'Agents' ? 'Agen' : 'Departemen'}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-b border border-[#C3C6D1] border-t-0 flex flex-col overflow-hidden w-full">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <>
            {activeTab === "Agents" && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#C3C6D1] bg-[#F8FAFC]">
                    <th className="px-4 py-3 text-sm font-semibold text-[#43474F]">Nama</th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#43474F]">Email</th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#43474F]">Peran</th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#43474F]">Departemen</th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#43474F] w-24">Aksi</th>
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
                      <td className="px-4 py-3 text-sm">
                        <button 
                          onClick={() => {
                            setSelectedAgent(agent);
                            setIsAgentModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
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
                  <tr className="border-b border-[#C3C6D1] bg-[#F8FAFC]">
                    <th className="px-4 py-3 text-sm font-semibold text-[#43474F]">ID</th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#43474F]">Nama Departemen</th>
                    <th className="px-4 py-3 text-sm font-semibold text-[#43474F] w-24">Aksi</th>
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
          </>
        )}
      </div>

      <AgentModal 
        isOpen={isAgentModalOpen} 
        onClose={() => setIsAgentModalOpen(false)}
        onSuccess={() => { setIsAgentModalOpen(false); fetchData(); }}
        agent={selectedAgent}
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