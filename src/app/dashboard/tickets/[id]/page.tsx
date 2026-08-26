import SharedTicketDetail from '@/components/shared/tickets/SharedTicketDetail';

export default function DashboardTicketDetailPage({ params }: { params: { id: string } }) {
  return <SharedTicketDetail ticketId={params.id} />;
}
