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
    // Tangani root /dashboard redirect sesuai role
    if (url.pathname === '/dashboard') {
      if (userRole === 'admin' || userRole === 'administrasi') url.pathname = '/dashboard/administrasi';
      else if (userRole === 'pimpinan') url.pathname = '/dashboard/pimpinan';
      else if (userRole === 'teknisi' || userRole === 'agent') url.pathname = '/dashboard/teknisi';
      else url.pathname = '/dashboard/operator';
      return NextResponse.redirect(url);
    }

    // Proteksi dashboard teknisi
    if (url.pathname.startsWith('/dashboard/teknisi') && (userRole !== 'teknisi' && userRole !== 'agent')) {
      url.pathname = userRole === 'admin' || userRole === 'administrasi' ? '/dashboard/administrasi' : '/dashboard/operator';
      return NextResponse.redirect(url);
    }
    
    // Proteksi dashboard admin
    if (url.pathname.startsWith('/dashboard/administrasi') && (userRole !== 'admin' && userRole !== 'administrasi')) {
      url.pathname = userRole === 'teknisi' || userRole === 'agent' ? '/dashboard/teknisi' : '/dashboard/operator';
      return NextResponse.redirect(url);
    }
  }

  // C. Jika user SUDAH login tapi mencoba kembali ke halaman login/register
  if ((url.pathname.startsWith('/login') || url.pathname.startsWith('/register')) && isLoggedIn) {
    if (userRole === 'admin' || userRole === 'administrasi') url.pathname = '/dashboard/administrasi';
    else if (userRole === 'pimpinan') url.pathname = '/dashboard/pimpinan';
    else if (userRole === 'teknisi' || userRole === 'agent') url.pathname = '/dashboard/teknisi';
    else url.pathname = '/dashboard/operator';
    
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
};