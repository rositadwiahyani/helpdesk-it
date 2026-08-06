import { Request, Response } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase';

export const getAdminDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayIso = today.toISOString();

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayIso = yesterday.toISOString();

    const nowIso = new Date().toISOString();

    // 1. Fetch Today's Tickets
    const { count: ticketsToday, error: errToday } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayIso);

    // Fetch Yesterday's Tickets for comparison
    const { count: ticketsYesterday, error: errYest } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', yesterdayIso)
      .lt('created_at', todayIso);

    let growth = 0;
    if (ticketsYesterday && ticketsYesterday > 0) {
      growth = ((ticketsToday || 0) - ticketsYesterday) / ticketsYesterday * 100;
    } else if ((ticketsToday || 0) > 0) {
      growth = 100;
    }

    // 2 & 3. Open Tickets & Overdue SLA will be computed from allTickets later

    // 4. Failed Messages / Webhooks (Mocked for now since table doesn't exist)
    const failedMessages = Math.floor(Math.random() * 5); // 0-4

    // 5. Recent Ticket Activity
    const { data: recentLogs, error: errLogs } = await supabase
      .from('ticket_logs')
      .select('*, tickets(ticket_num)')
      .order('created_at', { ascending: false })
      .limit(5);

    // 6. Categories for Pie Chart
    // Supabase JS doesn't support GROUP BY natively unless using RPC or fetching all
    // Let's fetch categories and then count, or fetch all tickets (if small) and group in JS.
    // Assuming relatively small dataset for MVP
    const { data: allTickets, error: errAll } = await supabase
      .from('tickets')
      .select('category_id, dept_id, status, sla_due');

    // Remove color from select, since it might not exist in the DB schema
    const { data: categories, error: errCats } = await supabase.from('categories').select('id, name');
    const { data: departments, error: errDepts } = await supabase.from('departments').select('id, name');

    let categoryStats: any[] = [];
    let deptStats: any[] = [];
    let slaStats = { within: 0, near: 0, overdue: 0 };
    let totalOpen = 0;
    let totalOverdue = 0;

    // Fallback colors for categories
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'];

    // Aggregate in JS
    if (allTickets && categories && departments) {
      // Categories
      const catCount = allTickets.reduce((acc: any, t) => {
        acc[t.category_id] = (acc[t.category_id] || 0) + 1;
        return acc;
      }, {});

      categoryStats = categories.map((c: any, index: number) => ({
        name: c.name,
        value: catCount[c.id] || 0,
        fill: c.color || colors[index % colors.length]
      })).filter(c => c.value > 0).sort((a, b) => b.value - a.value).slice(0, 5); // Top 5

      // Departments
      const deptData: any = {};
      departments.forEach(d => {
        deptData[d.id] = { name: d.name, total: 0, open: 0, closed: 0, overdue: 0 };
      });

      allTickets.forEach(t => {
        const stat = (t.status || '').toUpperCase();
        const isOpen = !['RESOLVED', 'CLOSED', 'DONE'].includes(stat);
        const isClosed = !isOpen;

        if (isOpen) totalOpen++;

        if (deptData[t.dept_id]) {
          const d = deptData[t.dept_id];
          d.total++;
          if (isOpen) d.open++;
          if (isClosed) d.closed++;
          if (t.sla_due && new Date(t.sla_due) < new Date() && isOpen) d.overdue++;
        }

        // SLA Stats
        if (isOpen) {
          if (t.sla_due) {
            const due = new Date(t.sla_due).getTime();
            const now = new Date().getTime();
            const diffHours = (due - now) / (1000 * 60 * 60);

            if (diffHours < 0) {
              slaStats.overdue++;
              totalOverdue++;
            }
            else if (diffHours < 24) slaStats.near++;
            else slaStats.within++;
          }
        }
      });

      deptStats = Object.values(deptData).filter((d: any) => d.total > 0).sort((a: any, b: any) => b.total - a.total);
    }

    // Ticket Trends (Last 30 days)
    const trendData = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      trendData.push({ name: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }), value: 0 });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { data: trendTickets } = await supabase
      .from('tickets')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (trendTickets) {
      trendTickets.forEach(t => {
        const dateStr = new Date(t.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        const item = trendData.find(x => x.name === dateStr);
        if (item) item.value++;
      });
    }

    res.json({
      summary: {
        today: ticketsToday || 0,
        growth: growth.toFixed(1),
        open: totalOpen,
        overdue: totalOverdue,
        failedMessages
      },
      recentLogs: recentLogs?.map(l => {
        let status = 'Update';
        let iconColor = 'bg-slate-100 text-slate-600';
        if (l.action === 'TICKET_CREATED') {
          status = 'New Ticket';
          iconColor = 'bg-blue-100 text-blue-600';
        } else if (l.action === 'STATUS_CHANGED') {
          status = 'Status Change';
          iconColor = 'bg-amber-100 text-amber-600';
        } else if (l.action === 'RESOLVED' || l.action === 'CLOSED') {
          status = 'Closed';
          iconColor = 'bg-emerald-100 text-emerald-600';
        }

        return {
          id: l.id,
          ticketNum: l.tickets?.ticket_num || 'Unknown',
          status,
          iconColor,
          message: l.notes || l.action,
          time: new Date(l.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        };
      }) || [],
      categories: categoryStats,
      departments: deptStats,
      slaHealth: [
        { name: 'Within SLA', value: slaStats.within, fill: '#34D399' },
        { name: 'Near Deadline', value: slaStats.near, fill: '#FBBF24' },
        { name: 'Overdue', value: slaStats.overdue, fill: '#EF4444' },
      ],
      ticketTrend: trendData
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({ error: 'Terjadi kesalahan internal server' });
  }
};

export const getQuickReplies = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin.from('quick_replies').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createQuickReply = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const { data, error } = await supabaseAdmin.from('quick_replies').insert([{ title, content }]).select().single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateQuickReply = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { data, error } = await supabaseAdmin.from('quick_replies').update({ title, content, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteQuickReply = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin.from('quick_replies').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
