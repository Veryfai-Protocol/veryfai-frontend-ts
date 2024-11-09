/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_KEYS } from './app/lib/enums';

export const config = {
  matcher: ['/checker/:path*'],
};

export async function middleware(req: NextRequest) {
  const cookie = req.cookies;
  console.log(cookie);
  const signinUrl = new URL('/', req.url);

  if (cookie.has(COOKIE_KEYS.AccessToken)) {
    return NextResponse.next();
  } else {
    const res = NextResponse.redirect(signinUrl);
    return res;
  }
}
