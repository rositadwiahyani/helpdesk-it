import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Ambil token dari cookie
  const authToken = request.cookies.get('auth_token')?.value;

  // Jika mencoba akses dashboard tapi belum login
  if (url.pathname.startsWith('/dashboard')) {
    if (!authToken) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // Di production, di sini kita bisa verify JWT / fetch role dari Backend API.
    // Untuk tahap ini, kita sekadar memastikan token ada untuk basic protection.
    // Role based routing (di frontend) ditangani saat login. 
    // Namun idealnya, decode JWT payload (role) di sini untuk block unauthorized access.
  }

  // Jika sudah login tapi mencoba ke login
  if ((url.pathname.startsWith('/login') || url.pathname.startsWith('/register')) && authToken) {
    url.pathname = '/dashboard/operator'; // default, ideally redirect to their specific role dashboard
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