import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface SendMessageResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

export async function sendMessage(to: string, text: string): Promise<SendMessageResponse | undefined> {
  // 💡 TARUH LOG TESTING-NYA DI SINI (Sebelum try-catch)
  console.log('\n================ WASENDER OUTGOING MESSAGE ================');
  console.log(`Penerima : ${to}`);
  console.log(`Pesan    :\n${text}`);
  console.log('===========================================================\n');

  try {
    const response = await axios.post<SendMessageResponse>(
      `${process.env.WASENDER_BASE_URL}/send-message`,
      {
        instance_id: process.env.WASENDER_INSTANCE_ID,
        api_key: process.env.WASENDER_API_KEY,
        to: to,
        message: text,
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