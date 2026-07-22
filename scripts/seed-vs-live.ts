// Read-only: compare the on-disk seed bank against what production actually
// serves via /api/status. Closes the "does the live DB match the seed source?"
// caveat on the reachability proof, without any credentials.
//
// Run: npx tsx scripts/seed-vs-live.ts

import { ITEMS as A1 } from "./seed/a1";
import { ITEMS as A2 } from "./seed/a2";
import { ITEMS as B1 } from "./seed/b1";
import { ITEMS as B2 } from "./seed/b2";
import { ITEMS as C1 } from "./seed/c1";
import { ITEMS as C2 } from "./seed/c2";

const ALL = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2].filter((i) => i.active !== false);

async function main() {
  const seed: Record<string, number> = {};
  for (const it of ALL) {
    const k = `${it.level}.${it.skill}`;
    seed[k] = (seed[k] ?? 0) + 1;
  }

  const res = await fetch("https://almifrench.almiworld.com/api/status");
  const live = (await res.json()) as { itemsActive: number; items: Record<string, number> };

  const keys = new Set([...Object.keys(seed), ...Object.keys(live.items)]);
  let mismatches = 0;
  for (const k of [...keys].sort()) {
    const s = seed[k] ?? 0;
    const l = live.items[k] ?? 0;
    if (s !== l) {
      console.log(`  MISMATCH ${k}: seed ${s} · live ${l}`);
      mismatches++;
    }
  }
  console.log(`cells compared: ${keys.size} | mismatches: ${mismatches}`);
  console.log(`seed total: ${ALL.length} | live itemsActive: ${live.itemsActive}`);
  console.log(mismatches === 0 && ALL.length === live.itemsActive ? "\n✓ live DB matches the seed bank" : "\n✗ drift between seed and live");
}

main();
