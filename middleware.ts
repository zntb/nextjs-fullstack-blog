import NextAuth from 'next-auth';

import authConfig from './auth.config';
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
} from '@/routes';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log('isLoggedIn', isLoggedIn);

  // const isLoggedIn = true;

  const headers = new Headers(req.headers);
  headers.set('x-current-path', req.nextUrl.pathname);

  const pathname = nextUrl.pathname;

  console.log('pathname', pathname);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/profile', nextUrl));
    }

    return NextResponse.next();
  }

  if (!isLoggedIn && (!isPublicRoute || isProtectedRoute)) {
    let callbackUrl = nextUrl.pathname;
    console.log('callbackUrl', callbackUrl);

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next({
    headers,
  });
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
};
