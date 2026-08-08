import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { sendMessage } from '../services/wasender';

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

    // Diselesaikan oleh Sistem (Self-Service)
    const systemResolvedCount = (tickets || []).filter(t => 
      t.status === 'RESOLVED_BY_SYSTEM' && new Date(t.created_at) >= today
    ).length;

    // Menunggu Verifikasi
    const waitingVerificationCount = (tickets || []).filter(t => 
      t.status === 'WAITING VERIFICATION'
    ).length;

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
          systemResolvedCount,
          waitingVerificationCount,
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
      .in('status', ['WAITING VERIFICATION'])
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
      const { data: updatedTicket, error } = await supabase.from('tickets').update(updates).eq('id', id).select('id, ticket_num, phone, reporter_name').single();
      if (error) throw error;
      if (updates.status) {
        await supabase.from('ticket_logs').insert({ ticket_id: id, action: 'CHANGE_STATUS', notes: 'Status changed to ' + updates.status });
        
        // Auto WA Notif
        if (updatedTicket?.phone) {
          let msg = `Halo ${updatedTicket.reporter_name || 'Pelapor'},\n\nStatus tiket pengaduan Anda (*${updatedTicket.ticket_num || updatedTicket.id}*) telah diperbarui menjadi: *${updates.status}*.`;
          if (updates.status === 'WAITING VERIFICATION') {
            msg += '\n\nTiket Anda telah berhasil diverifikasi oleh operator dan akan segera diteruskan ke teknisi terkait.';
          } else if (updates.status === 'REJECTED') {
            msg += '\n\nMohon maaf, tiket Anda ditolak karena alasan tertentu. Silakan cek detail tiket atau hubungi Helpdesk.';
          }
          sendMessage(updatedTicket.phone, msg).catch(e => console.error('Gagal kirim WA auto notif operator:', e));
        }
      }
    }

    return res.status(200).json({ success: true, message: 'Ticket updated' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUnhandledTickets = async (req: Request, res: Response) => {
  try {
    const { data: tickets, error: ticketsError } = await supabase
      .from('tickets')
      .select('*, category:categories(name), dept:departments(name), tech:staff_profiles!tickets_tech_id_fkey(name)')
      .in('status', ['Open', 'NEW'])
      .not('dept_id', 'is', null)
      .is('tech_id', null)
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

export const getResolvedTickets = async (req: Request, res: Response) => {
  try {
    const { data: tickets, error: ticketsError } = await supabase
      .from('tickets')
      .select('*, category:categories(name), dept:departments(name), tech:staff_profiles!tickets_tech_id_fkey(name)')
      .in('status', ['RESOLVED', 'CLOSED', 'RESOLVED_BY_SYSTEM'])
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

export const getProcessingTickets = async (req: Request, res: Response) => {
  try {
    const { data: tickets, error: ticketsError } = await supabase
      .from('tickets')
      .select('*, category:categories(name), dept:departments(name), tech:staff_profiles!tickets_tech_id_fkey(name)')
      .in('status', ['Open', 'NEW', 'IN PROGRESS', 'Diproses'])
      .not('dept_id', 'is', null)
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

export const getAllOperatorTickets = async (req: Request, res: Response) => {
  try {
    const { data: tickets, error: ticketsError } = await supabase
      .from('tickets')
      .select('*, category:categories(name), dept:departments(name), tech:staff_profiles!tickets_tech_id_fkey(name)')
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
