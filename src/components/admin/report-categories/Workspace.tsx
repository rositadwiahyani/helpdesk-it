"use client";

import React, { useState, createContext } from "react";
import PageHeader from "./PageHeader";
import Stats from "./Stats";
import Toolbar from "./Toolbar";
import TableSection from "./TableSection";
import ActivityLog from "./ActivityLog";
import TipsCard from "./Tipscard";

export type TreeContextType = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  expandedNodes: string[];
  toggleNode: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
};

export const TreeContext = createContext<TreeContextType | null>(null);

export default function Workspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const allBranchIds = ["aplikasi", "sso", "siap", "gentayu", "website", "jaringan", "cyber"];
  const [expandedNodes, setExpandedNodes] = useState<string[]>(allBranchIds);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const expandAll = () => setExpandedNodes(allBranchIds);
  const collapseAll = () => setExpandedNodes([]);

  return (
    <TreeContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        expandedNodes,
        toggleNode,
        expandAll,
        collapseAll,
      }}
    >
      <div className="flex flex-col w-full min-h-screen pt-8 px-8 pb-16 gap-8 bg-[#F8F9FA]">
        <PageHeader />
        <Stats />
        
        {/* Menggabungkan Toolbar dan Tabel Kategori Menjadi Satu Kotak Utuh */}
        <div className="flex flex-col w-full bg-[#FFF] rounded-lg shadow-sm border border-[#C3C6D1] overflow-hidden">
          <Toolbar />
          <TableSection />
        </div>
        
        <div className="flex flex-row items-stretch gap-6 w-full">
          <div className="flex-[3] min-w-0">
            <ActivityLog />
          </div>
          <div className="flex-[2] min-w-0">
            <TipsCard />
          </div>
        </div>
      </div>
    </TreeContext.Provider>
  );
}