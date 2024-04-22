/**
 * An array of routes that are publicly accessible
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  '/',
  '/blog',
  '/posts',
  '/posts/[slug]',
  '/auth/new-verification',
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
  '/write',
  '/profile',
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for  API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';