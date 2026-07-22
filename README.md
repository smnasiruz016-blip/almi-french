# AlmiFrench

AI-powered **French exam practice** — a **separate** product in the AlmiWorld family,
on its own subdomain **almifrench.almiworld.com**.

Three scoring engines behind eleven exam "doors":

| family | doors | engine |
|---|---|---|
| **TEF** | TEF Canada, TEFAQ, TEF Naturalisation (IRN), TEF Études | Engine A |
| **TCF** | TCF Canada, TCF Québec, TCF IRN, TCF DAP, TCF Tout Public | Engine B |
| **DELF / DALF** | DELF A1–B2, DALF C1–C2 | Engine C |

A door is not an engine. TEFAQ and TEF Canada score identically; TCF Québec and
TCF Canada likewise. The doors exist because candidates arrive knowing which one they
need — the scoring model behind them is shared, and the code says so.

Four skills across six CEFR levels (A1–C2). Compréhension écrite and orale are
auto-marked; expression écrite and orale are AI-assessed (Claude Sonnet, plus Whisper
transcription for speaking).

## Honesty doctrine

Results are **practice estimates on each exam's own scale** — NCLC for TEF and TCF,
/25 per épreuve for DELF and DALF — never a fabricated overall, and never presented as
an official result. Where a fact is not verified, the product says so rather than
guessing: **DALF C1/C2 word maxima are our practice convention, not the exam's** (the
real exam sets a floor), and TEF's preparation time is a practice convention because
the administrator does not publish one.

All content is **original**. No item is copied from an official bank or a real DALF
dossier; the dossier extracts in the DALF items were written for this product.

$12/month + 7-day trial; objective tasks free, AI feedback paid.

## What the build enforces

`build` runs these in order, and any failure blocks the deploy:

| gate | asserts |
|---|---|
| `fork-hygiene` | no ancestor or other-product identity anywhere in `src`, `scripts`, `prisma` — **or in this README and package.json** |
| `rule7` | every module holds ≥ 15 items, counted at **(exam family × level × skill)** — the granularity a learner actually practises |
| `conformance` | every expression item matches a **real task of its own exam**, derived from `src/lib/french/exam-structure.ts` |
| `seed-keys` | the seeder's dedupe key `(level, skill, title)` is unique, so no item can be silently dropped |
| `uniqueness` | per-origin pSEO content is not a name-swap of another origin |
| `seed:prod` | seeds, **reconciles** superseded rows, then asserts the live bank matches the source — failing the build on drift |

Run the reachability proof with `npm run proof:reachability`: it confirms a practice
session rotates through the whole bank without repeating, from the on-disk source and
without database credentials.

## Exam structure is recorded, not remembered

`src/lib/french/exam-structure.ts` (TEF, TCF, DALF) and `src/lib/french/delf-structure.ts`
(DELF A1–B2) hold each exam's task shapes together with their sources and a stated
ranking. Sourcing is graded honestly: DELF is verified against France Éducation
International, TEF's oral against its own administrator, and DALF rests on a secondary
guide because FEI bot-blocks automated fetching — which the file says plainly rather
than implying more confidence than it has.

Items are authored against those files and the conformance gate checks them against the
same definitions, so content and structure cannot quietly diverge.
