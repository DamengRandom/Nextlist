import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userInfo = request.cookies.get('user-info')?.value;
  const isUserInfoPage = request.nextUrl.pathname === '/user-info';

  if (!userInfo && !isUserInfoPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/user-info';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|public).*)'],
};