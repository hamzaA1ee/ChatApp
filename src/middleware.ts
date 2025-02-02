// import type { NextRequest } from "next/server";
import { NextRequest, NextResponse } from 'next/server';
import toast from 'react-hot-toast';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;

  const { pathname } = req.nextUrl.clone();

  const publicRoutes = ['/auth/login', '/auth/register'];

  const protectedRoutes = ['/', '/chat'];

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/chat', req.url));
  }

  if (!token && protectedRoutes.includes(pathname)) {
    toast('Session has expired');
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|static|favicon.ico|assets|favicon|manifest.json|_next).*)',
  ],
};
