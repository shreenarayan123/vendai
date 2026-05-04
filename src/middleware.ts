import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose'


const PUBLIC_ROUTES = [
  '/favicon.ico',
  '/auth',
  '/portal',
  '/images',
];


const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const IGNORED_ROUTES = ['/chatbot'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

 const isPublic = pathname === '/' || PUBLIC_ROUTES.some(route => 
  pathname === route || pathname.startsWith(route)
);
  const isIgnored = IGNORED_ROUTES.some(route => pathname.startsWith(route));

  if (isPublic || isIgnored) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    console.log('⛔ No JWT token found. Redirecting to /auth/sign-in');
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }
  try {
   const { payload } = await jwtVerify(token, secret)
    return NextResponse.next();
  } catch (err) {
    console.error('🚫 Invalid or expired token:', err);
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
