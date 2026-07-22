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
      .eq('is_active', true)
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
      .from('help_topics')
      .select('id, topic_name, parent_topic_id')
      .eq('is_active', true);
      
    if (error) throw error;
    
    // Format categories to match what frontend expects
    const formattedData = data.map(cat => ({
      id: cat.id,
      name: cat.topic_name,
      parent_id: cat.parent_topic_id
    }));
    
    res.status(200).json({ success: true, data: formattedData });
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
