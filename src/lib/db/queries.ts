import type { Demo } from "@prisma/client";
import { prisma } from "./prisma";

export async function listDemosByOwner(ownerId: string): Promise<Demo[]> {
  return prisma.demo.findMany({
    where: { ownerId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDemoByIdForOwner(
  demoId: string,
  ownerId: string
): Promise<Demo | null> {
  return prisma.demo.findFirst({
    where: { id: demoId, ownerId },
  });
}

export type CreateDemoInput = {
  name: string;
  notes?: string | null;
};

export async function createDemoForOwner(
  input: CreateDemoInput,
  ownerId: string
): Promise<Demo> {
  return prisma.demo.create({
    data: {
      name: input.name,
      notes: input.notes ?? null,
      ownerId,
    },
  });
}
