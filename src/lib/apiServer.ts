import { cookies } from 'next/headers';

export const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch data from backend with auth token
 * Use this ONLY in Server Components
 */
export async function fetchServer(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store'
  });

  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Terjadi kesalahan saat memanggil API');
  }

  return data;
}
