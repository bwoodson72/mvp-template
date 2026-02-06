import { auth } from "@clerk/nextjs/server";

/**
 * Get the authenticated user's ID in a server context (Server Components,
 * Server Actions, Route Handlers). Redirects to sign-in if not authenticated.
 *
 * @returns The current user's Clerk userId (never null — redirects first).
 */
export async function requireUserId(): Promise<string> {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  return userId;
}
