import { Router } from 'express';
import { getAdminDashboard } from '../controllers/adminController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/', requireRole(['admin', 'pimpinan', 'operator']), getAdminDashboard);

export default router;
