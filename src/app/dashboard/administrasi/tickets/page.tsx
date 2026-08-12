import TicketWorkspace from "@/components/admin/tickets/TicketWorkspace";

export default function TicketsPage() {
  return (
    <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <TicketWorkspace />
      </div>
    </div>
  );
}