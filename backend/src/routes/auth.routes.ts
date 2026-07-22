import { Router } from 'express';
import { loginHandler } from '../controllers/authController';

const router = Router();

/**
 * POST /api/auth/login
 * Endpoint untuk login staf/admin Helpdesk UNDIP
 */
router.post('/login', loginHandler);

export default router;