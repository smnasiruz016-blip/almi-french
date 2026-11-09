// RR-401 · puts the factory's TCF items (src/content/factory/fr-factory-items.json) into the FrenchItem table. Run by the
// OWNER, never by the build. Dry run by default; it writes only with BOTH --confirm AND FACTORY_WRITE=yes.
//   - an item whose (level, skill, title) is already there and equal: left alone (re-running changes nothing)
//   - an item already there but different (or inactive): listed with a short diff, NOT changed (a corrected pack needs the owner's word)
//   - nothing is ever deleted or deactivated
// RR-404 · UPDATE MODE: with BOTH --confirm AND FACTORY_UPDATE=yes, the rows listed as DIFFERS (and only they: matched by the pack's
// own keys, changed by their id) are brought to the gated pack version. The dry run shows the same list and diff first.
// Equality ignores jsonb's key order (Postgres reorders a payload's keys; that alone is never a difference).
// It needs DATABASE_URL in the environment of this one process (the owner sets it; this script reads no file for it).
// Run: npx tsx scripts/factory/seed-fr-factory.ts                                         (dry run: create + differs, with diffs)
//      $env:FACTORY_WRITE="yes"; npx tsx scripts/factory/seed-fr-factory.ts --confirm     (create the missing rows)
//      $env:FACTORY_UPDATE="yes"; npx tsx scripts/factory/seed-fr-factory.ts --confirm    (update the DIFFERS rows to the pack)
import { PrismaClient, Prisma } from "@prisma/client";
import { FACTORY_ITEMS } from "../../src/lib/factory/bank";
import { runSeed, seedRowFor, shouldUpdate, shouldWrite, type SeedRow } from "../../src/lib/factory/seed-plan";

const write = shouldWrite(process.argv, process.env);
const update = shouldUpdate(process.argv, process.env);
const rows = FACTORY_ITEMS.map(seedRowFor);
const prisma = new PrismaClient();
const where = (rs: SeedRow[]) => ({ OR: rs.map((r) => ({ level: r.level, skill: r.skill, title: r.title })) });
const select = { id: true, level: true, skill: true, title: true, taskType: true, examFamily: true, prompt: true, payload: true, active: true } as const;

async function main() {
  const res = await runSeed(
    {
      find: (rs) => prisma.frenchItem.findMany({ where: where(rs), select }),
      create: async (r) => { await prisma.frenchItem.create({ data: { ...r, payload: r.payload as Prisma.InputJsonValue } }); },
      update: async (id, r) => { await prisma.frenchItem.update({ where: { id }, data: { taskType: r.taskType, examFamily: r.examFamily, prompt: r.prompt, payload: r.payload as Prisma.InputJsonValue, active: true } }); },
    },
    rows,
    write,
    update,
  );
  console.log(`factory items ${rows.length} · create ${res.create.length} · already there and equal ${res.equal.length} · there but different ${res.differs.length}`);
  for (const r of res.create) console.log(`  ${write ? "CREATED" : "WOULD CREATE"} ${r.level} ${r.skill} — ${r.title} (${r.payload.models.length} model answers)`);
  for (const d of res.differs) {
    console.log(`  ${update ? "UPDATED" : "DIFFERS"} ${d.title} (row ${d.id}${d.active ? "" : ", INACTIVE"})`);
    for (const line of d.diff.slice(0, 6)) console.log(`      ${line}`);
    if (d.diff.length > 6) console.log(`      … and ${d.diff.length - 6} more`);
  }
  if (!write && !update) {
    console.log("DRY RUN: nothing written.");
    if (res.create.length) console.log("  To create the missing rows: FACTORY_WRITE=yes and --confirm.");
    if (res.differs.length) console.log("  To bring the DIFFERS rows to the pack: FACTORY_UPDATE=yes and --confirm.");
    return;
  }
  const back = await runSeed({ find: (rs) => prisma.frenchItem.findMany({ where: where(rs), select }), create: async () => {} }, rows, false);
  console.log(`WRITTEN ${res.written} · UPDATED ${res.updated}. Read back: ${back.equal.length} of ${rows.length} equal to the pack, ${back.differs.length} differ, ${back.create.length} missing.`);
  if (back.equal.length !== rows.length) process.exitCode = 1;
}
main().finally(() => prisma.$disconnect()).catch((e) => { console.error(String(e).slice(0, 300)); process.exit(1); });
