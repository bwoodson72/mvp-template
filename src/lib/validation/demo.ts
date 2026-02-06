import { z } from "zod";

/** Schema for creating a new Demo item. */
export const createDemoSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
  notes: z.string().max(500, "Notes must be 500 characters or less").optional(),
});

export type CreateDemoInput = z.infer<typeof createDemoSchema>;
