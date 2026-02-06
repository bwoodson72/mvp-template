"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { requireUserId } from "@/lib/auth/clerk";
import { createDemoForOwner } from "@/lib/db/queries";
import { createDemoSchema } from "@/lib/validation/demo";

export type CreateDemoState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  demoId?: string;
};

export async function createDemoAction(
  _prev: CreateDemoState,
  formData: FormData
): Promise<CreateDemoState> {
  const ownerId = await requireUserId();

  const raw = {
    name: formData.get("name"),
    notes: formData.get("notes") || undefined,
  };

  const parsed = createDemoSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (!fieldErrors[key]) {
        fieldErrors[key] = [];
      }
      fieldErrors[key].push(issue.message);
    }
    return { success: false, fieldErrors };
  }

  try {
    const demo = await createDemoForOwner(parsed.data, ownerId);
    redirect(`/dashboard/demo/${demo.id}`);
  } catch (err: unknown) {
    // Next.js redirect() throws a special error — rethrow it
    if (isRedirectError(err)) {
      throw err;
    }
    return { success: false, error: "Failed to create demo. Please try again." };
  }
}
