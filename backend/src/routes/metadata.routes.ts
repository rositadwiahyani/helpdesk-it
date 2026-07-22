import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware';
import { getDepartments, getCategories, getTechnicians } from '../controllers/metadataController';

const router = Router();

router.use(requireAuth);

router.get('/departments', requireRole(['admin', 'pimpinan', 'operator', 'teknisi']), getDepartments);
router.get('/categories', requireRole(['admin', 'pimpinan', 'operator', 'teknisi']), getCategories);
router.get('/technicians', requireRole(['admin', 'pimpinan', 'operator', 'teknisi']), getTechnicians);

export default router;
