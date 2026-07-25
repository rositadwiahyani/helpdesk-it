import StaffAgentsSection from "./StaffAgentSection";
import StaffTeamsSection from "./StaffTeamsSection";
import StaffDepartmentsSection from "./StaffDepartmentsSection";

type StaffTab = "agents" | "teams" | "departments";

interface StaffTableSectionProps {
  activeTab: StaffTab;
  onTabChange: (tab: StaffTab) => void;
}

export default function StaffTableSection({
  activeTab,
  onTabChange,
}: StaffTableSectionProps) {
  if (activeTab === "teams") {
    return <StaffTeamsSection onTabChange={onTabChange} />;
  }

  if (activeTab === "departments") {
    return <StaffDepartmentsSection onTabChange={onTabChange} />;
  }

  return <StaffAgentsSection onTabChange={onTabChange} />;
}