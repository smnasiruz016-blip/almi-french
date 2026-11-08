/**
 * RR-401 · how the BUILD's seed (scripts/seed/append.ts) treats factory items. Pure, so it is proved without a database.
 *
 * The build never inserts a factory item. But append.ts's reconcile phase deactivates every active row "absent from the
 * bank", and its verify phase fails the build when live counts differ from the bank. Without these two functions, the
 * owner's factory seed would be undone by the next deploy (7 rows of ~900 is under the 15% safety limit, so reconcile
 * would deactivate them silently), or would fail it.
 */
type Key = { level: string; skill: string; title: string };
const k = (r: Key) => `${r.level}|${r.skill}|${r.title}`;

/** keys reconcile must keep: the bank, plus the factory items (seeded by the owner, or not yet) */
export function keptKeys(bank: Key[], factoryKeys: Set<string>): Set<string> {
  return new Set([...bank.map(k), ...factoryKeys]);
}

/** expected active rows per "level.skill" cell: the bank, plus the factory rows that are ACTIVE in the database right now.
 *  A factory item the owner has not seeded yet adds nothing, so before the owner's seed the check is exactly what it was. */
export function expectedCells(bank: { level: string; skill: string }[], factoryLive: { level: string; skill: string }[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const i of [...bank, ...factoryLive]) out[`${i.level}.${i.skill}`] = (out[`${i.level}.${i.skill}`] ?? 0) + 1;
  return out;
}
