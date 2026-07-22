'use client';
import React from 'react';
import Link from 'next/link';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';
import { Ticket } from '@/lib/mock/tickets';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import ActionDropdown from '@/components/admin/common/ActionDropdown';

interface TicketTableProps {
  tickets: Ticket[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading?: boolean;
  initialSort?: { key: string; direction: 'asc' | 'desc' } | null;
}

export default function TicketTable({
  tickets,
  selectedIds,
  setSelectedIds,
  isLoading = false
  , initialSort = null
}: TicketTableProps) {

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(tickets.map(t => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const columns: ColumnDef<Ticket>[] = [
    {
      header: '',
      cell: (ticket) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(ticket.id)}
          onChange={(e) => handleToggleSelectOne(ticket.id, e.target.checked)}
          className="w-4 h-4 text-[var(--gold)] focus:ring-[var(--gold-soft)] rounded border-[var(--line-dark)] cursor-pointer"
        />
      ),
      className: "w-12 px-4"
    },
    {
      header: 'No. Tiket',
      accessorKey: 'id',
      cell: (ticket) => (
        <Link 
          href={`/admin/tickets/${ticket.id}`} 
          className="font-mono font-bold text-[var(--gold-soft)] hover:text-[var(--gold-dim)] hover:underline transition-colors block whitespace-nowrap"
        >
          {ticket.id.startsWith('#') ? ticket.id : `#${ticket.id}`}
        </Link>
      ),
      className: "w-32"
    },
    {
      header: 'Last Update',
      accessorKey: 'updatedDate',
      cell: (ticket) => (
        <span className="text-[13px] text-[var(--text-dim)] block whitespace-nowrap">
          {ticket.updatedDate.substring(0, 16)}
        </span>
      ),
      className: "w-44"
    },
    {
      header: 'Subject',
      accessorKey: 'subject',
      cell: (ticket) => (
        <Link 
          href={`/admin/tickets/${ticket.id}`} 
          className="font-bold text-[var(--ink)] hover:text-[var(--gold-soft)] hover:underline transition-colors block truncate"
          title={ticket.subject}
        >
          {ticket.subject}
        </Link>
      ),
      className: "" // Kosongkan agar mengambil sisa ruang tabel (flexible)
    },
    {
      header: 'From',
      accessorKey: 'requester',
      cell: (ticket) => (
        <div className="truncate">
          <div className="font-bold text-[var(--ink)] truncate">{ticket.requester}</div>
          <div className="text-[11.5px] text-[var(--text-dim)] truncate">{ticket.email}</div>
        </div>
      ),
      className: "w-52"
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      cell: (ticket) => <PriorityBadge priority={ticket.priority} />,
      className: "w-28"
    },
    {
      header: 'Assign To',
      accessorKey: 'assignedTo',
      cell: (ticket) => (
        <span className="font-medium text-[var(--ink)] truncate block">
          {ticket.assignedTo || 'Unassigned'}
        </span>
      ),
      className: "w-36"
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (ticket) => (
        <StatusBadge
          status={ticket.status}
          // NOTE: field 'overdue' belum ada di tipe Ticket (lib/mock/tickets.ts).
          // Tambahkan `overdue?: boolean;` pada interface Ticket lalu hapus cast "as any" ini.
          overdue={(ticket as any).overdue}
        />
      ),
      className: "w-44"
    }
  ];

  return (
    <div className="w-full">
      {/* Dynamic select all indicator */}
      {tickets.length > 0 && (
        <div className="flex items-center gap-2 mb-3 px-6 text-xs text-[var(--text-dim)] font-bold">
          <input
            type="checkbox"
            checked={selectedIds.length === tickets.length && tickets.length > 0}
            onChange={(e) => handleToggleSelectAll(e.target.checked)}
            className="w-4 h-4 text-[var(--gold)] focus:ring-[var(--gold-soft)] rounded border-[var(--line-dark)] cursor-pointer"
          />
          <span>Select All / Deselect All ({selectedIds.length} selected)</span>
        </div>
      )}

      <DataTable
        columns={columns}
        data={tickets}
        isLoading={isLoading}
        initialSort={initialSort}
        emptyMessage="No tickets found"
        hideSearchBar={true}
        tableClassName="table-fixed w-full"
      />
    </div>
  );
}