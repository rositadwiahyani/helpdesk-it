import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data: categories } = await supabase.from('categories').select('*');
  const { data: tickets } = await supabase.from('tickets').select('*').limit(1);
  return NextResponse.json({ ticketKeys: tickets && tickets[0] ? Object.keys(tickets[0]) : [] });
}
