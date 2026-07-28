import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

// Middleware: Hanya bisa diakses oleh role tertentu
router.use(requireAuth);
router.use(requireRole(['admin', 'administrasi', 'operator']));

// GET /api/admin/reporters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('reporters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/reporters
router.post('/', async (req: Request, res: Response) => {
  try {
    const { phone, name, nim_nip, unit, reporter_type, status } = req.body;
    const { data, error } = await supabase
      .from('reporters')
      .insert([{ phone, name, nim_nip, unit, reporter_type, status }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/admin/reporters/:id
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { data, error } = await supabase
      .from('reporters')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/reporters/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('reporters')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
