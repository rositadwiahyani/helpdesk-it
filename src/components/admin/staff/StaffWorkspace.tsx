"use client";

import { useState } from "react";
import StaffTableSection from "./StaffTableSection";

type StaffTab = "agents" | "teams" | "departments";

export default function StaffWorkspace() {
  const [activeTab, setActiveTab] = useState<StaffTab>("agents");

  return (
    <StaffTableSection activeTab={activeTab} onTabChange={setActiveTab} />
  );
}