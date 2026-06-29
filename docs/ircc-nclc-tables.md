# Official IRCC TEF/TCF → NCLC conversion tables (provenance)

These power the TEF and TCF scoring engines (`src/lib/french/nclc-tables.ts`,
`verified: true`). They are the **official** Government of Canada / IRCC tables.

- **Source:** canada.ca — Government of Canada / IRCC, *"How to find your language
  level based on your test results."*
- **Bracket:** "If you took your test **after December 10, 2023**" (the current
  bracket — the only one built; older brackets exist on the same page but are
  intentionally not implemented since the tool estimates today's test).
- **Page modified:** 2025-09-08.
- **fetchedOn:** 2026-06-29 — transcribed verbatim by the founder from the official
  page (canada.ca bot-blocks automated fetches; founder supplied screenshots).
- **Cross-check:** the independently web-sourced NCLC 7/8/9 anchors matched these
  official rows with no conflicts; all 28 rows confirmed cell-by-cell.
- **Validity:** IRCC requires test results **< 2 years old** when applying — surfaced
  on result/guide pages.

## TEF Canada → NCLC
Reading, Writing, Listening, Speaking all on the 0–699 scale.

| NCLC | Reading | Writing | Listening | Speaking |
|---|---|---|---|---|
| 10 | 546–699 | 558–699 | 546–699 | 556–699 |
| 9  | 503–545 | 512–557 | 503–545 | 518–555 |
| 8  | 462–502 | 472–511 | 462–502 | 494–517 |
| 7  | 434–461 | 428–471 | 434–461 | 456–493 |
| 6  | 393–433 | 379–427 | 393–433 | 422–455 |
| 5  | 352–392 | 330–378 | 352–392 | 387–421 |
| 4  | 306–351 | 268–329 | 306–351 | 328–386 |

## TCF Canada → NCLC
Reading & Listening on 0–699; Writing & Speaking on 0–20 (mixed system).

| NCLC | Reading | Writing | Listening | Speaking |
|---|---|---|---|---|
| 10 | 549–699 | 16–20 | 549–699 | 16–20 |
| 9  | 524–548 | 14–15 | 523–548 | 14–15 |
| 8  | 499–523 | 12–13 | 503–522 | 12–13 |
| 7  | 453–498 | 10–11 | 458–502 | 10–11 |
| 6  | 406–452 | 7–9   | 398–457 | 7–9   |
| 5  | 375–405 | 6     | 369–397 | 6     |
| 4  | 342–374 | 4–5   | 331–368 | 4–5   |

## Key thresholds
- **NCLC 7 across all four skills** = the **50 CRS bonus points** threshold (with English CLB 5+).
- **NCLC 4** = the citizenship language threshold.
- **TEF "B2 inférieur" trap:** a TEF score that maps below NCLC 7 earns **0** French
  bonus points even if it looks "B2-ish" — the NCLC mapping is the immigration truth.
  The TEF engine surfaces this honestly.
