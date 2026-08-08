import { Router } from 'express';
import { getOperatorDashboard, getOpenTickets, getRejectedTickets, getTicketById, updateTicket, getResolvedTickets, getProcessingTickets, getAllOperatorTickets } from '../controllers/operatorController';

const router = Router();

// /api/operator/dashboard
router.get('/dashboard', getOperatorDashboard);
router.get('/tickets/all', getAllOperatorTickets);
router.get('/tickets/open', getOpenTickets);
router.get('/tickets/rejected', getRejectedTickets);
router.get('/tickets/processing', getProcessingTickets);
router.get('/tickets/resolved', getResolvedTickets);
router.get('/tickets/:id', getTicketById);
router.patch('/tickets/:id', updateTicket);

export default router;
