import { Router } from 'express';
import { getAdminDashboard, getQuickReplies, createQuickReply, updateQuickReply, deleteQuickReply } from '../controllers/adminController';
import { getBotMenus, createBotMenu, updateBotMenu, deleteBotMenu, reorderBotMenus } from '../controllers/botMenuController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.use(requireAuth);

router.get('/dashboard', requireRole(['admin', 'pimpinan']), getAdminDashboard);

router.get('/quick-replies', requireRole(['admin', 'operator', 'teknisi']), getQuickReplies);
router.post('/quick-replies', requireRole(['admin', 'operator']), createQuickReply);
router.put('/quick-replies/:id', requireRole(['admin', 'operator']), updateQuickReply);
router.delete('/quick-replies/:id', requireRole(['admin', 'operator']), deleteQuickReply);

// Bot Menus (Admin only)
router.get('/bot-menus', requireRole(['admin']), getBotMenus);
router.post('/bot-menus', requireRole(['admin']), createBotMenu);
router.put('/bot-menus/reorder', requireRole(['admin']), reorderBotMenus);
router.put('/bot-menus/:id', requireRole(['admin']), updateBotMenu);
router.delete('/bot-menus/:id', requireRole(['admin']), deleteBotMenu);

import { createStaff, updateStaff } from '../controllers/adminController';
router.post('/staff', requireRole(['admin']), createStaff);
router.put('/staff/:id', requireRole(['admin']), updateStaff);

import { getBotTemplates, updateBotTemplates } from '../controllers/metadataController';
router.get('/bot-templates', requireRole(['admin']), getBotTemplates);
router.put('/bot-templates', requireRole(['admin']), updateBotTemplates);

import { createDepartment, updateDepartment, updateSLA } from '../controllers/adminController';
router.post('/departments', requireRole(['admin']), createDepartment);
router.put('/departments/:id', requireRole(['admin']), updateDepartment);

router.put('/sla', requireRole(['admin']), updateSLA);

export default router;
