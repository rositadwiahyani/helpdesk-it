import { Router } from 'express';
import { loginHandler, getMe } from '../controllers/authController';

const router = Router();

/**
 * POST /api/auth/login
 * Endpoint untuk login staf/admin Helpdesk UNDIP
 */
router.post('/login', loginHandler);
router.get('/me', getMe);

export default router;