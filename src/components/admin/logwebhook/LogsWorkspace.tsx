"use client";

import React, { useState, useCallback } from "react";
import LogsHeader from "./LogsHeader";
import LogsToolbar from "./LogsToolbar";
import LogsTableSection from "./LogsTableSection";
import LogsSummaryCards from "./LogsSummaryCards";

export default function LogsWorkspace() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Shared states yang nantinya bisa diteruskan ke LogsTableSection atau komponen lain
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    
    // Simulasi request refresh API
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }, [isRefreshing]);

  const handleFilterClick = useCallback(() => {
    setIsFilterActive((prev) => !prev);
  }, []);

  return (
    <div className="flex p-8 flex-col items-start gap-8 w-[1071px]">
      <div className="flex justify-between items-center w-full">
        <LogsHeader />
        <LogsToolbar 
          onFilterClick={handleFilterClick}
          onRefreshClick={handleRefresh}
          isRefreshing={isRefreshing}
        />
      </div>
      {/* Nantinya kamu bisa meneruskan state seperti isFilterActive atau searchQuery ke komponen di bawah ini jika diperlukan */}
      <LogsTableSection />
      <LogsSummaryCards />
    </div>
  );
}