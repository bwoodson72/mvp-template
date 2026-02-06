/**
 * proxy.ts — Route protection configuration (replaces middleware.ts)
 *
 * Next.js 16+ moves away from edge middleware for auth/routing.
 * Instead of middleware.ts, this project uses server-side checks:
 *
 * 1. ClerkProvider with `dynamic` mode handles auth state without middleware.
 * 2. Protected layouts call `requireUserId()` from `lib/auth/clerk.ts`,
 *    which uses Clerk's `auth()` server function and redirects if needed.
 * 3. Server actions also call `requireUserId()` to enforce ownership.
 *
 * This file defines which route prefixes are public vs protected,
 * providing a single source of truth that can be referenced by
 * server components and layouts.
 */

/** Routes accessible without authentication. */
export const publicRoutes: readonly string[] = [
  "/",
  "/sign-in",
  "/sign-up",
] as const;

/** Route prefixes that require authentication (checked in their layouts). */
export const protectedRoutes: readonly string[] = [
  "/dashboard",
] as const;

/**
 * Check whether a given pathname is a public route.
 * Useful for conditional rendering in shared server components.
 */
export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}
