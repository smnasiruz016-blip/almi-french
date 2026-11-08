/** RR-401 · what the owner's factory seed would do, decided by a pure function (tested without a database).
 *  Matched on append.ts's own dedupe key (level, skill, title), so the build's seed and this seed agree on identity. */
import { itemKey, type FactoryItem } from "./import";

export type SeedRow = Omit<FactoryItem, "factoryId">;
export type LiveRow = { id: string; level: string; skill: string; title: string; taskType: string; examFamily: string | null; prompt: string; payload: unknown; active: boolean };

export const seedRowFor = (i: FactoryItem): SeedRow => {
  const { factoryId: _drop, ...row } = i;
  void _drop;
  return row;
};

const same = (r: SeedRow, l: LiveRow) =>
  l.taskType === r.taskType && l.examFamily === r.examFamily && l.prompt === r.prompt && JSON.stringify(l.payload) === JSON.stringify(r.payload) && l.active;

/** the owner's seed writes only with BOTH --confirm AND FACTORY_WRITE=yes; anything else is a dry run */
export const shouldWrite = (argv: string[], env: Record<string, string | undefined>) => argv.includes("--confirm") && env.FACTORY_WRITE === "yes";

/** the smallest database surface the seed needs, so the real seed path is proved on an in-memory fake */
export type SeedDb = {
  find: (rows: SeedRow[]) => Promise<LiveRow[]>;
  create: (row: SeedRow) => Promise<void>;
};

/** the whole seed: plan, then (only when write) create the missing rows. Never updates, deletes or deactivates. */
export async function runSeed(db: SeedDb, rows: SeedRow[], write: boolean) {
  const plan = planSeed(rows, await db.find(rows));
  let written = 0;
  if (write) for (const r of plan.create) { await db.create(r); written++; }
  return { ...plan, written };
}

export function planSeed(rows: SeedRow[], live: LiveRow[]) {
  const byKey = new Map(live.map((l) => [itemKey(l), l]));
  const create: SeedRow[] = [], equal: string[] = [], differs: string[] = [];
  for (const r of rows) {
    const l = byKey.get(itemKey(r));
    if (!l) { create.push(r); continue; }
    if (same(r, l)) equal.push(r.title);
    else differs.push(`${r.title}: the live row (${l.id}${l.active ? "" : ", INACTIVE"}) is not the same as the pack; NOT changed`);
  }
  return { create, equal, differs };
}
