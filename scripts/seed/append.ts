// Aggregate seed runner (idempotent): brings the live item bank into line with the
// on-disk seed source. Safe to run on every deploy. Add new content waves by
// importing their ITEMS arrays here.
//
// TWO PHASES:
//   1. INSERT — any seed item not already present, matched by (level, skill, title).
//   2. RECONCILE — any ACTIVE row in the database whose (level, skill, title) is not
//      in the seed source is SUPERSEDED, and is deactivated.
//
// WHY PHASE 2 EXISTS. Inserting alone is not idempotent against EDITED content. When
// 121 malformed expression items were corrected, many were re-authored under new
// titles ("TEF — Acheter du pain" became "TEF Section A — Se renseigner : commander
// un buffet"). The insert phase saw a title it had never inserted, added it, and left
// the old row active — so production served BOTH the corrected item and the
// DELF-shaped one it replaced: 775 rows against a 733-item bank, 42 of them
// superseded duplicates that the conformance gate would reject.
//
// The gate guards the BANK. It cannot see the DATABASE. Reconciliation is what makes
// the database follow the bank.
//
// DEACTIVATE, NEVER DELETE. FrenchAttempt.itemId is a required FK with onDelete:
// Cascade — deleting an item would destroy every learner attempt attached to it.
// Setting active=false removes it from selection (poolIds filters active: true) while
// preserving history, and is reversible by flipping one column back.

import { PrismaClient, Prisma } from "@prisma/client";
import { ITEMS as A1 } from "./a1";
import { ITEMS as A2 } from "./a2";
import { ITEMS as B1 } from "./b1";
import { ITEMS as B2 } from "./b2";
import { ITEMS as C1 } from "./c1";
import { ITEMS as C2 } from "./c2";

const prisma = new PrismaClient();

const ALL: Prisma.FrenchItemCreateManyInput[] = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2];

/** FAIL-CLOSED THRESHOLD. Reconciliation reads the bank to decide what is obsolete,
 *  so a BUG IN THE BANK is indistinguishable from a deliberate purge: a failed import
 *  leaving ALL short, or a truncated file, would mark most of the live bank obsolete
 *  and deactivate it in a single deploy. So refuse beyond a conservative share and
 *  require an explicit opt-in for anything larger. A deploy must never be able to
 *  empty the product by accident. */
const MAX_DEACTIVATE_FRACTION = 0.15;
const MAX_DEACTIVATE_ABSOLUTE = 120;
/** Set RECONCILE_FORCE=1 for a deliberate large reconciliation. Never set it in the
 *  build — it exists for a human who has looked at the list first. */
const FORCE = process.env.RECONCILE_FORCE === "1";

const key = (r: { level: string; skill: string; title: string }) => `${r.level}|${r.skill}|${r.title}`;

/** Order-stable canonical JSON: object keys sorted recursively, ARRAY ORDER PRESERVED.
 *  Postgres jsonb reorders object keys, so a plain stringify of the DB value vs the seed
 *  value would differ every deploy and churn — but array order is meaningful here (it IS
 *  what the option-position de-game moves), so arrays are left as-authored. Two payloads
 *  compare equal iff they differ only in object-key order. */
function canonical(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(canonical).join(",")}]`;
  if (v && typeof v === "object") {
    return `{${Object.keys(v as Record<string, unknown>)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${canonical((v as Record<string, unknown>)[k])}`)
      .join(",")}}`;
  }
  return JSON.stringify(v);
}

async function main() {
  // ── Phase 1: insert-or-update ──────────────────────────────────────────────
  // Insert new items; UPDATE the payload of an existing item when the bank's content
  // has changed (matched by level+skill+title). Without the update branch, an edit that
  // keeps the title — e.g. de-gaming which option position is correct — would never reach
  // the database: Phase 1 would see the title "already present" and skip it, and Phase 2
  // only deactivates. The gate guards the bank; this is what makes the DB follow it on
  // content, not just existence. Canonical compare so unchanged items never churn.
  let created = 0;
  let updated = 0;
  for (const item of ALL) {
    const exists = await prisma.frenchItem.findFirst({
      where: { level: item.level, skill: item.skill, title: item.title },
      select: { id: true, payload: true },
    });
    if (!exists) {
      await prisma.frenchItem.create({ data: item });
      created += 1;
      continue;
    }
    if (canonical(exists.payload) !== canonical(item.payload)) {
      await prisma.frenchItem.update({ where: { id: exists.id }, data: { payload: item.payload } });
      updated += 1;
    }
  }
  console.log(
    `seed:append — ${created} created, ${updated} payload-updated, ${ALL.length - created - updated} unchanged (bank ${ALL.length})`,
  );

  // ── Phase 2: reconcile ─────────────────────────────────────────────────────
  const bankKeys = new Set(
    ALL.map((i) => key({ level: String(i.level), skill: String(i.skill), title: String(i.title) })),
  );

  const live = await prisma.frenchItem.findMany({
    where: { active: true },
    select: { id: true, level: true, skill: true, title: true },
  });
  const obsolete = live.filter((r) => !bankKeys.has(key(r)));

  if (obsolete.length === 0) {
    console.log(`seed:reconcile — nothing to deactivate; ${live.length} active rows match the bank.`);
    return;
  }

  const fraction = obsolete.length / live.length;
  const overLimit =
    obsolete.length > MAX_DEACTIVATE_ABSOLUTE || fraction > MAX_DEACTIVATE_FRACTION;

  console.log(
    `seed:reconcile — ${obsolete.length} of ${live.length} active rows are absent from the bank ` +
      `(${(fraction * 100).toFixed(1)}%).`,
  );
  for (const r of obsolete) console.log(`    obsolete: ${r.level} ${r.skill} — ${r.title}`);

  if (overLimit && !FORCE) {
    console.error(
      `\n✗ seed:reconcile REFUSED — ${obsolete.length} rows (${(fraction * 100).toFixed(1)}%) exceeds the ` +
        `safety limit (${MAX_DEACTIVATE_ABSOLUTE} rows / ${MAX_DEACTIVATE_FRACTION * 100}%).`,
    );
    console.error("  This usually means the BANK is wrong, not the database — a failed import or a");
    console.error("  truncated seed file makes the live bank look obsolete. Check the bank first.");
    console.error("  If the purge really is intended, re-run with RECONCILE_FORCE=1 after reading");
    console.error("  the list above. Nothing has been changed.\n");
    process.exit(1);
  }

  const res = await prisma.frenchItem.updateMany({
    where: { id: { in: obsolete.map((r) => r.id) } },
    data: { active: false },
  });
  console.log(
    `seed:reconcile — deactivated ${res.count} superseded row(s)${FORCE ? " (RECONCILE_FORCE)" : ""}. ` +
      `Rows are retained, not deleted: FrenchAttempt history is preserved and the change is reversible.`,
  );
}

/** Phase 3: ASSERT the database now matches the bank, and fail the build if not.
 *
 *  This exists because drift has twice been invisible until somebody thought to
 *  look: first when 733 items shipped while production served 384 (no seed step at
 *  all), then when reconciliation was missing and production served 775. A check
 *  that depends on being remembered is not a check. Running it here — in the same
 *  build step that just seeded, with the database in hand — means a deploy cannot
 *  succeed while the live bank disagrees with the source.
 *
 *  Compared at (level, skill) granularity, which is what /api/status reports, so a
 *  green build and a green status endpoint mean the same thing. */
async function verify() {
  const expected: Record<string, number> = {};
  for (const i of ALL) {
    const k = `${i.level}.${i.skill}`;
    expected[k] = (expected[k] ?? 0) + 1;
  }

  const rows = await prisma.frenchItem.groupBy({
    by: ["level", "skill"],
    where: { active: true },
    _count: true,
  });
  const actual: Record<string, number> = {};
  for (const r of rows) actual[`${r.level}.${r.skill}`] = r._count;

  const keys = [...new Set([...Object.keys(expected), ...Object.keys(actual)])].sort();
  const drift = keys.filter((k) => (expected[k] ?? 0) !== (actual[k] ?? 0));
  const total = Object.values(actual).reduce((s, n) => s + n, 0);

  if (drift.length) {
    console.error(`\n✗ seed:verify FAILED — live bank does not match the seed source.\n`);
    for (const k of drift) console.error(`    ${k}: bank ${expected[k] ?? 0} · live ${actual[k] ?? 0}`);
    console.error(`\n  bank total ${ALL.length} · live active ${total}\n`);
    process.exit(1);
  }
  console.log(`✓ seed:verify — live bank matches the source: ${total} active items across ${keys.length} cells.`);
}

/** Only ONE failure mode is tolerable here: the database being unreachable (a
 *  preview build without credentials, a transient outage). That degrades to an
 *  unseeded deploy, which is recoverable.
 *
 *  Everything else — the reconciliation safety refusal, a verification mismatch —
 *  MUST fail the build. This distinction has to live in the script, because the
 *  obvious alternative (`tsx append.ts || echo skipped` in package.json) makes the
 *  whole thing fail-OPEN: it would swallow the very refusal that exists to stop a
 *  deploy from emptying the product. */
/*  DELIBERATELY NOT TOLERATED: authentication failure (P1000, "credentials are not
 *  valid"). An unreachable database is an environment that has none; BAD CREDENTIALS
 *  are an environment that has the WRONG one, and silently shipping unseeded content
 *  on a misconfigured secret is exactly how production came to serve 384 items
 *  against a 733-item bank. It fails the build, loudly. Note this also means running
 *  this script locally against the repo's placeholder .env exits 1 — correctly. */
function isUnreachable(e: unknown): boolean {
  const code = (e as { errorCode?: string; code?: string })?.code ?? (e as { errorCode?: string })?.errorCode;
  const msg = e instanceof Error ? e.message : String(e);
  return (
    code === "P1001" || // can't reach database server
    code === "P1002" || // timed out
    code === "P1003" || // database does not exist
    /Environment variable not found: DATABASE_URL/i.test(msg) ||
    /Can't reach database server/i.test(msg)
  );
}

main()
  .then(verify)
  .catch((e) => {
    if (isUnreachable(e)) {
      console.warn("seed:prod — database unreachable; deploy continues UNSEEDED.");
      console.warn(`  (${e instanceof Error ? e.message.split("\n")[0] : String(e)})`);
      return; // tolerable: exit 0
    }
    console.error(e);
    process.exit(1); // drift, refusal, or anything else: fail the build
  })
  .finally(() => prisma.$disconnect());
