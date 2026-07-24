import { Router } from 'express';
import { loginHandler, updateProfileHandler } from '../controllers/authController';

const router = Router();

/**
 * POST /api/auth/login
 * Endpoint untuk login staf/admin Helpdesk UNDIP
 */
router.post('/login', loginHandler);

/**
 * PUT /api/auth/profile
 * Endpoint untuk update profile
 */
router.put('/profile', updateProfileHandler);

export default router;