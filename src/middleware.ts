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

  // C. Ambil data role jika user login
  let role = null;
  if (user) {
    const { data: profile } = await supabase.from('staff_profiles').select('role').eq('id', user.id).maybeSingle();
    role = profile?.role?.toLowerCase() || null;
  }

  // Helper untuk mendapatkan path tujuan berdasarkan role
  const getRoleDashboardPath = (userRole: string | null) => {
    if (!userRole) return '/login';
    if (userRole === 'admin' || userRole === 'administrator') return '/dashboard/administrasi';
    return `/dashboard/${userRole}`;
  };

  // A. Jika user MENCOBA mengakses halaman dashboard tapi BELUM login
  if (url.pathname.startsWith('/dashboard') && !user) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // B. Jika user SUDAH login tapi mencoba kembali ke halaman login/register
  if ((url.pathname.startsWith('/login') || url.pathname.startsWith('/register')) && user) {
    url.pathname = getRoleDashboardPath(role);
    return NextResponse.redirect(url);
  }

  // C. Otorisasi Rute Dashboard berdasarkan Role
  if (url.pathname.startsWith('/dashboard') && user) {
    
    // 0. Jika mengakses persis /dashboard, redirect ke dashboard role
    if (url.pathname === '/dashboard') {
      url.pathname = getRoleDashboardPath(role);
      return NextResponse.redirect(url);
    }

    if (role) {
      // 1. Lindungi rute Teknisi
      if (url.pathname.startsWith('/dashboard/teknisi') && role !== 'teknisi' && role !== 'agent') {
        url.pathname = getRoleDashboardPath(role);
        return NextResponse.redirect(url);
      }
      
      // 2. Lindungi rute Operator
      if (url.pathname.startsWith('/dashboard/operator') && role !== 'operator') {
        url.pathname = getRoleDashboardPath(role);
        return NextResponse.redirect(url);
      }

      // 3. Lindungi rute Pimpinan
      if (url.pathname.startsWith('/dashboard/pimpinan') && role !== 'pimpinan') {
        url.pathname = getRoleDashboardPath(role);
        return NextResponse.redirect(url);
      }

      // 4. Lindungi rute Admin
      if (url.pathname.startsWith('/dashboard/administrasi') && role !== 'admin' && role !== 'administrator') {
        url.pathname = getRoleDashboardPath(role);
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}

// 4. Tentukan halaman mana saja yang akan diawasi oleh Middleware ini
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
};