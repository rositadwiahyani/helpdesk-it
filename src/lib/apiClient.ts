export const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch data from backend with auth token
 * Use this ONLY in Client Components ('use client')
 */
export async function fetchClient(endpoint: string, options: RequestInit = {}) {
  let token = '';
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(/(^| )auth_token=([^;]+)/);
    if (match) token = match[2];
  }

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
  });

  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Terjadi kesalahan saat memanggil API');
  }

  return data;
}
