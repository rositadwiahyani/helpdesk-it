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

    // Teks pesan (bisa kosong saat user kirim gambar/media)
    const message: string = msgData.messageBody || msgData.message?.conversation || '';

    // Tentukan tipe media dan ekstrak url + mediaKey untuk decrypt
    const imageMsg = msgData.message?.imageMessage;
    const documentMsg = msgData.message?.documentMessage;
    const videoMsg = msgData.message?.videoMessage;

    const mediaUrl: string | undefined =
      imageMsg?.url || documentMsg?.url || videoMsg?.url || undefined;

    const mediaKey: string | undefined =
      imageMsg?.mediaKey || documentMsg?.mediaKey || videoMsg?.mediaKey || undefined;

    const mediaType: string | undefined = imageMsg
      ? 'image'
      : documentMsg
      ? 'document'
      : videoMsg
      ? 'video'
      : undefined;

    console.log(`Pengirim  : ${sender}`);
    console.log(`Pesan     : ${message || '(kosong - kemungkinan media)'}`);
    console.log(`Media URL : ${mediaUrl || 'tidak ada'}`);
    console.log(`Media Key : ${mediaKey ? '(ada)' : 'tidak ada'}`);

    // Proses jika ada sender DAN (ada pesan teks ATAU ada media)
    if (sender && (message || mediaUrl)) {
      handleIncomingMessage(sender, message, mediaUrl, mediaKey, mediaType);
    } else {
      console.log('⚠️ Gagal mengekstrak sender/message dari payload.');
      console.log('DEBUG Payload:', JSON.stringify(req.body, null, 2));
    }

    // Selalu kembalikan 200 OK dengan cepat ke WASender
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;