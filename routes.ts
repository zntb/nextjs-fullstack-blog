/**
 * An array of routes that are publicly accessible
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = [
  '/',
  '/api/categories',
  '/posts',
  '/posts/(.*)',
  '/posts/[slug]',
  '/api/posts',
  '/api/posts/(.*)',
  '/api/posts/[slug]',
  '/api/posts/[slug]/(.*)',
  '/auth/new-verification',
  // '/write',
  // '/profile',
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /profile
 * @type {string[]}
 */
export const authRoutes: string[] = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
  '/auth/profile',
  // '/write',
  // '/profile',
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for  API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/profile';
