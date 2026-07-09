import TicketForm from '@/components/TicketForm';

export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <TicketForm />
      </div>
    </main>
  );
}