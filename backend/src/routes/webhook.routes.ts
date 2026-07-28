import { Router, Request, Response } from 'express';
import { handleIncomingMessage } from '../services/botService';

const router = Router();

router.post('/whatsapp', async (req: Request, res: Response) => {
  try {
    const { sender, message } = req.body;

    if (sender && message) {
      // Jalankan logika bot secara async (tidak menahan response HTTP)
      handleIncomingMessage(sender, message);
    }

    // Selalu kembalikan 200 OK dengan cepat ke WASender
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;