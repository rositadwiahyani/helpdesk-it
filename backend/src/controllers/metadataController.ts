import { Request, Response } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase';

/**
 * GET /api/admin/departments
 */
export const getDepartments = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('id, name')
      .eq('status', true)
      .order('name');
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/admin/categories
 */
export const getCategories = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id');
      
    if (error) throw error;
    
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * PUT /api/admin/categories/reorder
 */
export const reorderCategories = async (req: Request, res: Response) => {
  try {
    const { updates } = req.body;
    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ success: false, message: 'Updates array is required' });
    }

    const results = await Promise.all(
      updates.map(u => supabaseAdmin.from('categories').update({ sort_order: u.sort_order }).eq('id', u.id))
    );

    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
      console.error("Errors reordering:", errors);
      return res.status(500).json({ success: false, message: 'Partial failure updating sort orders' });
    }

    res.status(200).json({ success: true, message: 'Urutan berhasil disimpan' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/admin/technicians
 */
export const getTechnicians = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('staff_profiles')
      .select('id, name, email, role, dept_id')
      .in('role', ['teknisi', 'agent']);
      
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
