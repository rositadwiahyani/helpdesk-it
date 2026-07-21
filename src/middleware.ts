import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 1. Inisialisasi Supabase Client khusus untuk Middleware (Server-Side)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // 2. Ambil data sesi user aktif
  const { data: { user } } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // 3. LOGIKA PROTEKSI RUTE (GUARD)

  // A. Jika user MENCOBA mengakses halaman dashboard tapi BELUM login
  if (url.pathname.startsWith('/dashboard') && !user) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // B. Jika user SUDAH login tapi mencoba kembali ke halaman login/register
  if ((url.pathname.startsWith('/login') || url.pathname.startsWith('/register')) && user) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}

// 4. Tentukan halaman mana saja yang akan diawasi oleh Middleware ini
export const config = {
  matcher: [

  ],
};