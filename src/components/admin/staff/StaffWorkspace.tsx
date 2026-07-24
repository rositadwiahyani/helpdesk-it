"use client";
import React, { useState } from 'react';
import StaffHeader from "./StaffHeader";
import StaffToolbar from "./StaffToolbar";
import StaffTableSection from "./StaffTableSection";

export default function StaffWorkspace() {
  const [activeTab, setActiveTab] = useState('Agents');

  return (
    <div className="flex p-6 flex-col items-start gap-6 w-full">
      <StaffHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <StaffToolbar />
      <StaffTableSection />
    </div>
  );
}