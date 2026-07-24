import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Periksa cookie isLoggedIn yang di set oleh halaman login
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const userRole = request.cookies.get('userRole')?.value || '';

  // A. Jika user MENCOBA mengakses halaman dashboard tapi BELUM login
  if (url.pathname.startsWith('/dashboard') && !isLoggedIn) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // B. Role-Based Access Control (RBAC) untuk Dashboard
  if (isLoggedIn && url.pathname.startsWith('/dashboard')) {
    if (url.pathname.startsWith('/dashboard/teknisi') && userRole !== 'teknisi') {
      url.pathname = '/dashboard/operator';
      return NextResponse.redirect(url);
    }
    if (url.pathname.startsWith('/dashboard/operator') && userRole === 'teknisi') {
      url.pathname = '/dashboard/teknisi';
      return NextResponse.redirect(url);
    }
  }

  // C. Jika user SUDAH login tapi mencoba kembali ke halaman login/register
  if ((url.pathname.startsWith('/login') || url.pathname.startsWith('/register')) && isLoggedIn) {
    url.pathname = userRole === 'teknisi' ? '/dashboard/teknisi' : '/dashboard/operator';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 4. Tentukan halaman mana saja yang akan diawasi oleh Middleware ini
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
};