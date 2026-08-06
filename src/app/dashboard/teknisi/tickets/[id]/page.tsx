import SharedTicketDetail from '@/components/shared/tickets/SharedTicketDetail';

export default async function TeknisiTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <SharedTicketDetail ticketId={resolvedParams.id} />;
}
