import { Request, Response } from 'express';
// 1. Import fungsi loginStaff dari file authService kamu (sesuaikan path-nya jika perlu)
import { loginStaff } from '../services/AuthService';

/**
 * POST /api/auth/login
 * Handler untuk memproses login staf/admin Helpdesk
 */
export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validasi input dasar
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email dan password wajib diisi.' 
      });
    }

    // Panggil fungsi login dari AuthService
    const authData = await loginStaff(email, password);

    return res.status(200).json({
      success: true,
      message: 'Login berhasil.',
      data: authData
    });
  } catch (error: any) {
    console.error('Error pada loginHandler:', error.message);
    return res.status(401).json({ 
      error: error.message || 'Login gagal. Periksa email dan password Anda.' 
    });
  }
};