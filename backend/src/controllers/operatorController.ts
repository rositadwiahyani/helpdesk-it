import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getOperatorDashboard = async (req: Request, res: Response) => {
  try {
    const { data: tickets, error: ticketsError } = await supabase
      .from('tickets')
      .select('*, category:categories(name), dept:departments(name), tech:staff_profiles!tickets_tech_id_fkey(name)')
      .order('created_at', { ascending: false });

    if (ticketsError) throw ticketsError;

    const { data: ticketLogs } = await supabase.from('ticket_logs').select('*');
    const { data: categories } = await supabase.from('categories').select('*');
    const { data: slaConfigs } = await supabase.from('sla_configs').select('*');
    const { data: departments } = await supabase.from('departments').select('*');

    const formattedCategories = (categories || []).map(cat => ({
      ...cat,
      slaData: (slaConfigs || []).find(sla => sla.category_id === cat.id)
    }));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCount = (tickets || []).filter(t => new Date(t.created_at) >= today).length;
    
    // Verified hari ini (berdasarkan log perubahan status)
    const verifiedLogs = (ticketLogs || []).filter(l => 
      (l.action === 'CHANGE_STATUS' || l.action === 'VERIFY') && 
      new Date(l.created_at) >= today
    );
    const verifiedCount = new Set(verifiedLogs.map(l => l.ticket_id)).size;

    return res.status(200).json({
      success: true,
      data: {
        tickets,
        ticketLogs,
        categories: formattedCategories,
        departments,
        counts: {
          todayCount,
          verifiedCount,
          openCount: (tickets || []).filter(t => t.status === 'Open').length,
          totalTickets: (tickets || []).length,
          process: (tickets || []).filter(t => t.status === 'Diproses').length,
          reject: (tickets || []).filter(t => t.status === 'Ditolak').length,
          done: (tickets || []).filter(t => t.status === 'Selesai').length,
          overdue: (tickets || []).filter(t => t.is_overdue).length
        }
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOpenTickets = async (req: Request, res: Response) => {
  try {
    const { data: tickets, error: ticketsError } = await supabase
      .from('tickets')
      .select('*, category:categories(name), dept:departments(name), tech:staff_profiles!tickets_tech_id_fkey(name)')
      .in('status', ['Open', 'Diproses'])
      .order('created_at', { ascending: false });

    if (ticketsError) throw ticketsError;

    const { data: categories } = await supabase.from('categories').select('*');
    const { data: slaConfigs } = await supabase.from('sla_configs').select('*');
    const { data: departments } = await supabase.from('departments').select('*');
    const { data: technicians } = await supabase.from('staff_profiles').select('id, name, role').in('role', ['teknisi', 'agent']);

    const formattedCategories = (categories || []).map(cat => ({
      ...cat,
      slaData: (slaConfigs || []).find(sla => sla.category_id === cat.id)
    }));

    return res.status(200).json({
      success: true,
      data: {
        tickets,
        categories: formattedCategories,
        departments,
        technicians
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRejectedTickets = async (req: Request, res: Response) => {
  try {
    const { data: tickets, error: ticketsError } = await supabase
      .from('tickets')
      .select('*, category:categories(name), dept:departments(name), tech:staff_profiles!tickets_tech_id_fkey(name)')
      .eq('status', 'Ditolak')
      .order('created_at', { ascending: false });

    if (ticketsError) throw ticketsError;
    
    const { data: categories } = await supabase.from('categories').select('*');
    const { data: departments } = await supabase.from('departments').select('*');

    return res.status(200).json({
      success: true,
      data: {
        tickets,
        categories: categories || [],
        departments: departments || []
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('*, category:categories(name), dept:departments(name), tech:staff_profiles!tickets_tech_id_fkey(name)')
      .eq('id', id)
      .single();

    if (ticketError) throw ticketError;

    const { data: msgs } = await supabase.from('ticket_messages').select('*').eq('ticket_id', id).order('created_at', { ascending: true });
    const { data: logs } = await supabase.from('ticket_logs').select('*').eq('ticket_id', id).order('created_at', { ascending: true });

    return res.status(200).json({
      success: true,
      data: {
        ticket,
        messages: msgs || [],
        logs: logs || []
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (updates.message) {
      await supabase.from('ticket_messages').insert({
        ticket_id: id,
        sender_type: 'ADMIN',
        message: updates.message
      });
      delete updates.message;
    }

    if (Object.keys(updates).length > 0) {
      updates.updated_at = new Date().toISOString();
      const { error } = await supabase.from('tickets').update(updates).eq('id', id);
      if (error) throw error;
      if (updates.status) {
        await supabase.from('ticket_logs').insert({ ticket_id: id, action: 'CHANGE_STATUS', notes: 'Status changed to ' + updates.status });
      }
    }

    return res.status(200).json({ success: true, message: 'Ticket updated' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
