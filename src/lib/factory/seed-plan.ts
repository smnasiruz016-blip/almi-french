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

/** 🔴 RR-404: JSON with its keys sorted. Postgres stores `payload` as jsonb, which does NOT keep key order: a row written from the pack
 *  reads back with its keys reordered, and a plain JSON.stringify comparison then calls an identical row "different". */
export const canonicalJson = (v: unknown): string =>
  JSON.stringify(v, (_k, x) => (x && typeof x === "object" && !Array.isArray(x) ? Object.fromEntries(Object.keys(x).sort().map((k) => [k, (x as Record<string, unknown>)[k]])) : x));

const short = (s: string, n = 60) => (s.length > n ? `${s.slice(0, n)}…` : s);
/** the first place two texts part, with a few words of each side */
const firstDiff = (a: string, b: string) => { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; const from = Math.max(0, i - 15); return `at ${i}: live "${short(a.slice(from, i + 45))}" / pack "${short(b.slice(from, i + 45))}"`; };
/** every leaf path whose value differs (canonical), e.g. "models[1].text" */
function leafDiffs(a: unknown, b: unknown, path = "", out: string[] = []): string[] {
  if (canonicalJson(a) === canonicalJson(b)) return out;
  const obj = (x: unknown) => x !== null && typeof x === "object";
  if (obj(a) && obj(b) && Array.isArray(a) === Array.isArray(b)) {
    const keys = new Set([...Object.keys(a as object), ...Object.keys(b as object)]);
    for (const k of [...keys].sort()) leafDiffs((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], Array.isArray(a) ? `${path}[${k}]` : path ? `${path}.${k}` : k, out);
    return out;
  }
  const show = (x: unknown) => (x === undefined ? "(none)" : typeof x === "string" ? x : JSON.stringify(x));
  out.push(typeof a === "string" && typeof b === "string" ? `payload.${path} ${firstDiff(a, b)}` : `payload.${path}: live ${short(show(a))} / pack ${short(show(b))}`);
  return out;
}

/** 🔴 RR-404 · a short diff of one live row against the pack (what the owner reads before an update) */
export function rowDiff(r: SeedRow, l: LiveRow): string[] {
  const out: string[] = [];
  if (l.taskType !== r.taskType) out.push(`taskType: live ${l.taskType} / pack ${r.taskType}`);
  if (l.examFamily !== r.examFamily) out.push(`examFamily: live ${l.examFamily} / pack ${r.examFamily}`);
  if (l.prompt !== r.prompt) out.push(`prompt ${firstDiff(l.prompt, r.prompt)}`);
  out.push(...leafDiffs(l.payload, r.payload));
  if (!l.active) out.push("active: live false / pack true");
  return out;
}

const same = (r: SeedRow, l: LiveRow) => rowDiff(r, l).length === 0;

/** the owner's seed writes only with BOTH --confirm AND FACTORY_WRITE=yes; anything else is a dry run */
export const shouldWrite = (argv: string[], env: Record<string, string | undefined>) => argv.includes("--confirm") && env.FACTORY_WRITE === "yes";
/** 🔴 RR-404 · the owner's UPDATE of the differing factory rows needs BOTH --confirm AND FACTORY_UPDATE=yes */
export const shouldUpdate = (argv: string[], env: Record<string, string | undefined>) => argv.includes("--confirm") && env.FACTORY_UPDATE === "yes";

/** the smallest database surface the seed needs, so the real seed path is proved on an in-memory fake */
export type SeedDb = {
  find: (rows: SeedRow[]) => Promise<LiveRow[]>;
  create: (row: SeedRow) => Promise<void>;
  /** RR-404: one row, by its id, to the pack's version (only the update mode calls it) */
  update?: (id: string, row: SeedRow) => Promise<void>;
};

export type Differs = { title: string; id: string; active: boolean; diff: string[]; row: SeedRow };

/** the whole seed: plan, then (only when write) create the missing rows; (only when update) bring the differing rows to the pack.
 *  Nothing else: no row outside the pack's keys is read or changed, nothing is deleted. */
export async function runSeed(db: SeedDb, rows: SeedRow[], write: boolean, update = false) {
  const plan = planSeed(rows, await db.find(rows));
  let written = 0, updated = 0;
  if (write) for (const r of plan.create) { await db.create(r); written++; }
  if (update) {
    if (!db.update) throw new Error("update mode needs db.update");
    if (plan.differs.length > rows.length) throw new Error(`refused: ${plan.differs.length} differing rows for ${rows.length} pack items`);
    for (const d of plan.differs) { await db.update(d.id, d.row); updated++; }
  }
  return { ...plan, written, updated };
}

export function planSeed(rows: SeedRow[], live: LiveRow[]) {
  const byKey = new Map(live.map((l) => [itemKey(l), l]));
  const create: SeedRow[] = [], equal: string[] = [], differs: Differs[] = [];
  for (const r of rows) {
    const l = byKey.get(itemKey(r));
    if (!l) { create.push(r); continue; }
    if (same(r, l)) equal.push(r.title);
    else differs.push({ title: r.title, id: l.id, active: l.active, diff: rowDiff(r, l), row: r });
  }
  return { create, equal, differs };
}
