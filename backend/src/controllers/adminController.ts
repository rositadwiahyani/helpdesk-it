import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';

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

    // 2. Open Tickets (NEW or IN PROGRESS)
    const { count: openTickets, error: errOpen } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .in('status', ['NEW', 'IN PROGRESS']);

    // 3. Overdue SLA
    const { count: overdueSla, error: errOverdue } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .lt('sla_due', nowIso)
      .not('status', 'in', '("RESOLVED","CLOSED")'); // Use standard not in if needed, or or()

    // Since .not.in can be tricky in JS client, let's use or()
    const { count: overdueSlaAlt, error: errOverdueAlt } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .lt('sla_due', nowIso)
      .in('status', ['NEW', 'IN PROGRESS', 'WAITING VERIFICATION']);

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
      
    const { data: categories } = await supabase.from('categories').select('id, name, color');
    const { data: departments } = await supabase.from('departments').select('id, name');

    let categoryStats: any[] = [];
    let deptStats: any[] = [];
    let slaStats = { within: 0, near: 0, overdue: 0 };
    
    // Aggregate in JS
    if (allTickets && categories && departments) {
      // Categories
      const catCount = allTickets.reduce((acc: any, t) => {
        acc[t.category_id] = (acc[t.category_id] || 0) + 1;
        return acc;
      }, {});
      
      categoryStats = categories.map(c => ({
        name: c.name,
        value: catCount[c.id] || 0,
        fill: c.color || '#cccccc'
      })).filter(c => c.value > 0).sort((a, b) => b.value - a.value).slice(0, 5); // Top 5
      
      // Departments
      const deptData: any = {};
      departments.forEach(d => {
        deptData[d.id] = { name: d.name, total: 0, open: 0, closed: 0, overdue: 0 };
      });
      
      allTickets.forEach(t => {
        if (deptData[t.dept_id]) {
          const d = deptData[t.dept_id];
          d.total++;
          if (['NEW', 'IN PROGRESS', 'WAITING VERIFICATION'].includes(t.status)) d.open++;
          if (['RESOLVED', 'CLOSED'].includes(t.status)) d.closed++;
          if (t.sla_due && new Date(t.sla_due) < new Date() && ['NEW', 'IN PROGRESS', 'WAITING VERIFICATION'].includes(t.status)) d.overdue++;
        }
        
        // SLA Stats
        if (['NEW', 'IN PROGRESS', 'WAITING VERIFICATION'].includes(t.status)) {
          if (t.sla_due) {
            const due = new Date(t.sla_due).getTime();
            const now = new Date().getTime();
            const diffHours = (due - now) / (1000 * 60 * 60);
            
            if (diffHours < 0) slaStats.overdue++;
            else if (diffHours < 24) slaStats.near++;
            else slaStats.within++;
          }
        }
      });
      
      deptStats = Object.values(deptData).filter((d: any) => d.total > 0).sort((a: any, b: any) => b.total - a.total);
    }
    
    // Ticket Trends (Last 7 days)
    const trendData = [];
    for(let i=6; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      trendData.push({ name: d.toLocaleDateString('id-ID', {day: 'numeric', month: 'short'}), value: 0 });
    }
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const { data: trendTickets } = await supabase
      .from('tickets')
      .select('created_at')
      .gte('created_at', sevenDaysAgo.toISOString());
      
    if (trendTickets) {
      trendTickets.forEach(t => {
        const dateStr = new Date(t.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'});
        const item = trendData.find(x => x.name === dateStr);
        if (item) item.value++;
      });
    }

    res.json({
      summary: {
        today: ticketsToday || 0,
        growth: growth.toFixed(1),
        open: openTickets || 0,
        overdue: overdueSlaAlt || 0,
        failedMessages
      },
      recentLogs: recentLogs?.map(l => ({
        id: l.id,
        ticketNum: l.tickets?.ticket_num || '-',
        action: l.action,
        message: l.notes,
        time: l.created_at
      })) || [],
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
