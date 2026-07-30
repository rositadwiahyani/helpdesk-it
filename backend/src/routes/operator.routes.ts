import { Router } from 'express';
import { getOperatorDashboard, getOpenTickets, getRejectedTickets, getTicketById, updateTicket, getUnhandledTickets, getResolvedTickets, getInProgressTickets } from '../controllers/operatorController';

const router = Router();

// /api/operator/dashboard
router.get('/dashboard', getOperatorDashboard);
router.get('/tickets/open', getOpenTickets);
router.get('/tickets/rejected', getRejectedTickets);
router.get('/tickets/unhandled', getUnhandledTickets);
router.get('/tickets/inprogress', getInProgressTickets);
router.get('/tickets/resolved', getResolvedTickets);
router.get('/tickets/:id', getTicketById);
router.patch('/tickets/:id', updateTicket);

export default router;
