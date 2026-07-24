import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

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
