import { z } from "zod";

/**
 * Define the schema for all required environment variables.
 * This is the ONLY place process.env should be accessed directly.
 * All other modules must import `env` from this file.
 */
const envSchema = z.object({
  DATABASE_URL: z.url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, "Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
  CLERK_SECRET_KEY: z.string().min(1, "Missing CLERK_SECRET_KEY"),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default("/sign-in"),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default("/sign-up"),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const formatted = parsed.error.issues
      .map((issue) => `  ✗ ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `\n❌ Invalid environment variables:\n${formatted}\n\nPlease check your .env file.\n`
    );
  }

  return parsed.data;
}

export const env: Env = validateEnv();
