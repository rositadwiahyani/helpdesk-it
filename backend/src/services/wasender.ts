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

export async function sendMessage(to: string, text: string): Promise<SendMessageResponse | undefined> {
  // 💡 TARUH LOG TESTING-NYA DI SINI (Sebelum try-catch)
  console.log('\n================ WASENDER OUTGOING MESSAGE ================');
  console.log(`Penerima : ${to}`);
  console.log(`Pesan    :\n${text}`);
  console.log('===========================================================\n');

  // Simpan ke memory simulator (maks 100 pesan)
  simulatorLogs.push({ phone: to, message: text, timestamp: new Date().toISOString(), sender: 'bot' });
  if (simulatorLogs.length > 100) simulatorLogs.shift();

  try {
    const response = await axios.post<SendMessageResponse>(
      `${process.env.WASENDER_BASE_URL || 'https://www.wasenderapi.com/api'}/send-message`,
      {
        to: to,
        text: text, // Sandbox API expects 'text', not 'message'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WASENDER_BEARER_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    // Karena belum ada instance WASender asli, bagian ini akan menangkap error koneksi ke WASender
    // Tapi console.log di atas sudah berhasil menampilkan pesan balasan bot ke terminal kamu!
    console.error('Info: WASender belum terhubung ke API/nomor asli.');
    return undefined;
  }
}