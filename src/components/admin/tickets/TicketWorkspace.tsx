import TicketHeader from "./TicketHeader";
import TicketToolbar from "./TicketToolbar";
import TicketTableSection from "./TicketTableSection";
import TicketStatistics from "./TicketStatistics";

export default function TicketWorkspace() {
  return (
    <div className="flex flex-col items-start gap-6 w-full">
      <TicketHeader />
      <TicketToolbar />
      <TicketTableSection />
      <TicketStatistics />
    </div>
  );
}