import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface SendMessageResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

// Memory untuk Simulator
export const simulatorLogs: { phone: string; message: string; timestamp: string; sender: 'bot' | 'user'; mediaUrl?: string; mediaType?: string; }[] = [];

/**
 * Kirim pesan via WASender API dengan retry otomatis.
 * Jika WASender return 429 (rate limit) atau error jaringan sementara,
 * akan dicoba ulang hingga MAX_RETRIES kali dengan jeda exponential.
 */
export async function sendMessage(to: string, text: string): Promise<SendMessageResponse | undefined> {
  console.log('\n================ WASENDER OUTGOING MESSAGE ================');
  console.log(`Penerima : ${to}`);
  console.log(`Pesan    :\n${text}`);
  console.log('===========================================================\n');

  // Simpan ke memory simulator (maks 100 pesan)
  simulatorLogs.push({ phone: to, message: text, timestamp: new Date().toISOString(), sender: 'bot' });
  if (simulatorLogs.length > 100) simulatorLogs.shift();

  const MAX_RETRIES = 3;
  const BASE_DELAY_MS = 1000; // 1 detik, berlipat setiap retry

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.post<SendMessageResponse>(
        `${process.env.WASENDER_BASE_URL || 'https://www.wasenderapi.com/api'}/send-message`,
        { to, text },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.WASENDER_BEARER_TOKEN}`,
          },
          timeout: 10000, // 10 detik timeout
        }
      );
      if (attempt > 1) {
        console.log(`[WASender] Berhasil kirim ke ${to} pada percobaan ke-${attempt}`);
      }
      return response.data;
    } catch (error: any) {
      const status = error?.response?.status;
      const errBody = JSON.stringify(error?.response?.data || {});
      const errMsg = error?.message || 'Unknown error';

      console.error(`[WASender] Percobaan ${attempt}/${MAX_RETRIES} GAGAL kirim ke ${to}`);
      console.error(`  Status  : ${status || 'No response (network error)'}`);
      console.error(`  Message : ${errMsg}`);
      console.error(`  Body    : ${errBody}`);

      // Jika masih ada percobaan tersisa DAN errornya bukan 4xx permanen (selain 429)
      const isRetryable = !status || status === 429 || status >= 500;
      if (attempt < MAX_RETRIES && isRetryable) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1); // 1s, 2s, 4s
        console.warn(`[WASender] Mencoba ulang dalam ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
        continue;
      }

      // Jika 401/403 — token salah, tidak perlu retry
      if (status === 401 || status === 403) {
        console.error('[WASender] ❌ AUTENTIKASI GAGAL! Periksa WASENDER_BEARER_TOKEN di Environment Variables Render.');
      }

      return undefined;
    }
  }

  return undefined;
}