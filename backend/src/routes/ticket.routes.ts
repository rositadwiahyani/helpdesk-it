import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware';
import {
  getTicketsForDashboard,
  getTicketByNum,
  updateTicketByStaff,
  getTicketMessages,
  sendStaffResponse
} from '../controllers/ticketController';

const router = Router();

// Semua endpoint tiket di bawah mewajibkan header "Authorization: Bearer <token>"
router.use(requireAuth);

// 1. GET /api/admin/tickets - Ambil daftar tiket
router.get(
  '/',
  requireRole(['admin', 'pimpinan', 'operator', 'teknisi']),
  getTicketsForDashboard
);

// 2. GET /api/admin/tickets/:ticketNum - Ambil detail tiket berdasarkan nomor tiket
router.get(
  '/:ticketNum',
  requireRole(['admin', 'pimpinan', 'operator', 'teknisi']),
  getTicketByNum
);

// 3. PATCH /api/admin/tickets/:id - Ubah status / disposisi tiket
router.patch(
  '/:id',
  requireRole(['admin', 'operator', 'teknisi']),
  updateTicketByStaff
);

// 4. GET /api/admin/tickets/:ticketId/messages - Ambil riwayat pesan tiket
router.get(
  '/:ticketId/messages',
  requireRole(['admin', 'pimpinan', 'operator', 'teknisi']),
  getTicketMessages
);

// 5. POST /api/admin/tickets/:ticketId/messages - Kirim balasan pesan tiket
router.post(
  '/:ticketId/messages',
  requireRole(['admin', 'operator', 'teknisi']),
  sendStaffResponse
);

export default router;