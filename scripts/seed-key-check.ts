// Read-only: does any pair of seed items share append.ts's dedupe key
// (level, skill, title)? append.ts skips an item when that tuple already exists,
// so a collision means the second item is SILENTLY never inserted — the bank would
// look complete on disk while production stayed short.
//
// Run: npx tsx scripts/seed-key-check.ts

import { ITEMS as A1 } from "./seed/a1";
import { ITEMS as A2 } from "./seed/a2";
import { ITEMS as B1 } from "./seed/b1";
import { ITEMS as B2 } from "./seed/b2";
import { ITEMS as C1 } from "./seed/c1";
import { ITEMS as C2 } from "./seed/c2";

const ALL = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2].filter((i) => i.active !== false);

const seen = new Map<string, number>();
for (const it of ALL) {
  const k = `${it.level}|${it.skill}|${it.title}`;
  seen.set(k, (seen.get(k) ?? 0) + 1);
}
const dupes = [...seen.entries()].filter(([, n]) => n > 1);

console.log(`items: ${ALL.length} | distinct (level, skill, title): ${seen.size} | colliding tuples: ${dupes.length}`);
for (const [k, n] of dupes.slice(0, 20)) console.log(`  x${n}  ${k}`);
process.exit(dupes.length ? 1 : 0);
