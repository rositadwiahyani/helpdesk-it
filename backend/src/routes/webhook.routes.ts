import { Router, Request, Response } from 'express';
import { handleIncomingMessage } from '../services/botService';

const router = Router();

router.post('/whatsapp', async (req: Request, res: Response) => {
  try {
    console.log('\n--- Menerima Webhook dari WaSender ---');
    
    const event = req.body?.event;
    const msgData = req.body?.data?.messages;

    // Hanya proses event messages.received dan bukan pesan dari bot sendiri
    if (event !== 'messages.received' || !msgData || msgData.key?.fromMe === true) {
      return res.status(200).json({ status: 'ignored' });
    }

    // Ekstrak sender dan pesan dari struktur payload asli WaSender
    const sender: string = msgData.key?.cleanedSenderPn || msgData.key?.senderPn?.replace('@s.whatsapp.net', '');
    const message: string = msgData.messageBody || msgData.message?.conversation || '';
    const mediaUrl: string | undefined = msgData.message?.imageMessage?.url || msgData.message?.documentMessage?.url || undefined;

    console.log(`Pengirim : ${sender}`);
    console.log(`Pesan    : ${message}`);

    if (sender && message) {
      handleIncomingMessage(sender, message, mediaUrl);
    } else {
      console.log('⚠️ Gagal mengekstrak sender/message dari payload.');
    }

    // Selalu kembalikan 200 OK dengan cepat ke WASender
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;