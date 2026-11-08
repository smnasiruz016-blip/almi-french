// RR-401 · puts the factory's TCF items (src/content/factory/fr-factory-items.json) into the FrenchItem table. Run by the
// OWNER, never by the build. Dry run by default; it writes only with BOTH --confirm AND FACTORY_WRITE=yes.
//   - an item whose (level, skill, title) is already there and equal: left alone (re-running changes nothing)
//   - an item already there but different (or inactive): listed, NOT changed (a corrected pack needs the owner's word)
//   - nothing is ever deleted or deactivated
// It needs DATABASE_URL in the environment of this one process (the owner sets it; this script reads no file for it).
// Run: npx tsx scripts/factory/seed-fr-factory.ts                                       (dry run)
//      $env:FACTORY_WRITE="yes"; npx tsx scripts/factory/seed-fr-factory.ts --confirm   (write)
import { PrismaClient, Prisma } from "@prisma/client";
import { FACTORY_ITEMS } from "../../src/lib/factory/bank";
import { runSeed, seedRowFor, shouldWrite, type SeedRow } from "../../src/lib/factory/seed-plan";

const write = shouldWrite(process.argv, process.env);
const rows = FACTORY_ITEMS.map(seedRowFor);
const prisma = new PrismaClient();
const where = (rs: SeedRow[]) => ({ OR: rs.map((r) => ({ level: r.level, skill: r.skill, title: r.title })) });

async function main() {
  const res = await runSeed(
    {
      find: (rs) => prisma.frenchItem.findMany({ where: where(rs), select: { id: true, level: true, skill: true, title: true, taskType: true, examFamily: true, prompt: true, payload: true, active: true } }),
      create: async (r) => { await prisma.frenchItem.create({ data: { ...r, payload: r.payload as Prisma.InputJsonValue } }); },
    },
    rows,
    write,
  );
  console.log(`factory items ${rows.length} · create ${res.create.length} · already there and equal ${res.equal.length} · there but different (NOT changed) ${res.differs.length}`);
  for (const r of res.create) console.log(`  ${write ? "CREATED" : "WOULD CREATE"} ${r.level} ${r.skill} — ${r.title} (${r.payload.models.length} model answers)`);
  for (const d of res.differs) console.log(`  DIFFERS ${d}`);
  if (!write) { console.log("DRY RUN: nothing written. To write: set FACTORY_WRITE=yes and add --confirm."); return; }
  const back = await prisma.frenchItem.findMany({ where: where(rows), select: { id: true, active: true } });
  console.log(`WRITTEN ${res.written}. Read back: ${back.length} of ${rows.length} factory items present, ${back.filter((b) => b.active).length} active.`);
}
main().finally(() => prisma.$disconnect()).catch((e) => { console.error(String(e).slice(0, 300)); process.exit(1); });
