import { Router, Request, Response } from 'express';
import { simulatorLogs } from '../services/wasender';
import { handleIncomingMessage } from '../services/botService';

const router = Router();

// GET /api/simulator/messages/:phone
// Mendapatkan riwayat percakapan dari memory berdasarkan nomor telepon
router.get('/messages/:phone', (req: Request, res: Response) => {
  const { phone } = req.params;
  const msgs = simulatorLogs.filter(m => m.phone === phone);
  res.json({ success: true, data: msgs });
});

// POST /api/simulator/send
// Mengirim pesan dari "pengguna" (user) ke bot
router.post('/send', async (req: Request, res: Response) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: 'Phone dan message wajib diisi' });
    }

    // Simpan pesan user ke memory agar muncul di UI simulator
    simulatorLogs.push({ phone, message, timestamp: new Date().toISOString(), sender: 'user' });
    if (simulatorLogs.length > 100) simulatorLogs.shift();

    // Trigger logika bot secara async
    handleIncomingMessage(phone, message);

    res.json({ success: true });
  } catch (error) {
    console.error('Simulator Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
