/**
 * Seed script — creates sample Demo records.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *   npx tsx scripts/seed.ts <ownerId>
 *
 * If no ownerId is provided, "seed-user-001" is used as default.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const ownerId = process.argv[2] ?? "seed-user-001";

  console.log(`Seeding demos for ownerId: ${ownerId}`);

  const demos = await Promise.all([
    prisma.demo.create({
      data: {
        name: "My First Demo",
        notes: "This is a seeded demo item for testing.",
        ownerId,
      },
    }),
    prisma.demo.create({
      data: {
        name: "Second Demo",
        notes: null,
        ownerId,
      },
    }),
  ]);

  console.log(`Created ${demos.length} demo records:`);
  for (const demo of demos) {
    console.log(`  - ${demo.id}: ${demo.name}`);
  }
}

main()
  .catch((e: unknown) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
