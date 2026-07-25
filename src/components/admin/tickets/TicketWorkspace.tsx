'use client';

import React, { useState } from 'react';
import TicketHeader from "./TicketHeader";
import TicketToolbar, { TabFilter } from "./TicketToolbar";
import TicketTableSection, { Ticket } from "./TicketTableSection";
import TicketStatistics from "./TicketStatistics";
import NewTicketModal from "./NewTicketModal";

export default function TicketWorkspace() {
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [newlyAddedTicket, setNewlyAddedTicket] = useState<Ticket | null>(null);

  const handleNewTicket = () => setIsNewTicketModalOpen(true);
  const handleExportCsv = () => alert("Proses Export CSV sedang berjalan. Data akan terunduh sesaat lagi.");
  const handleOpenFilters = () => alert("Membuka panel filter lanjutan (Advanced Filters).");

  const handleSubmitNewTicket = (ticketData: any) => {
    // Generate Inisial Pelapor
    const nameParts = ticketData.requesterName.trim().split(' ');
    const initials = nameParts.length > 1 
        ? (nameParts[0][0] + nameParts[1][0]).toUpperCase() 
        : (ticketData.requesterName.substring(0, 2).toUpperCase() || 'U');

    // Format Data Tiket Baru
    const ticketNum = `#TIC- ${new Date().getFullYear()}- ${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: Ticket = {
      id: Date.now().toString(),
      ticketNumber: ticketNum,
      lastUpdate: 'Just now',
      subject: ticketData.subject,
      category: `Category: ${ticketData.category || 'General'}`,
      requester: { 
        name: ticketData.requesterName, 
        initials: initials, 
        initialsBg: 'bg-[#D5E3FF]', 
        initialsText: 'text-[#001B3C]', 
        initialsWidth: 'w-6' 
      },
      priority: 'MEDIUM',
      assignee: ticketData.assignTo ? { name: ticketData.assignTo, avatarUrl: `https://ui-avatars.com/api/?name=${ticketData.assignTo}&background=random` } : null,
      status: 'NEW',
      isOverdue: false,
    };

    // Masukkan tiket baru ke tabel
    setNewlyAddedTicket(newTicket);
    setIsNewTicketModalOpen(false);

    // --- Notifikasi Alert Bawaan Browser ---
    alert(`Tiket ${ticketNum} berhasil ditambahkan! (Simulasi)`);
  };

  return (
    <div className="flex flex-col items-start gap-6 w-full relative">
      <TicketHeader />
      
      <TicketToolbar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewTicket={handleNewTicket} 
        onExportCsv={handleExportCsv}
        onOpenFilters={handleOpenFilters}
      />
      
      <TicketTableSection activeTab={activeTab} newlyAddedTicket={newlyAddedTicket} />
      
      <TicketStatistics />

      {isNewTicketModalOpen && (
        <NewTicketModal 
          onClose={() => setIsNewTicketModalOpen(false)} 
          onSubmit={handleSubmitNewTicket}
        />
      )}
    </div>
  );
}