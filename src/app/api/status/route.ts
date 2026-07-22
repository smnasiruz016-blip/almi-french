// Lightweight ops/health endpoint: confirms the practice item bank is seeded and
// reports ACTIVE item counts per (level, skill) — no PII, counts only.
//
// This is the same grouping the build's seed:verify phase asserts against the seed
// source, so a green build and a green status endpoint mean the same thing. It is
// deliberately NOT the granularity the Rule #7 gate uses: that counts per
// (exam family x level x skill), because Reading and Listening items are shared
// across exam doors while Writing and Speaking are per-family. Reporting the summed
// (level, skill) figure here is honest for a health check — it is the true count of
// active rows — but it must never be mistaken for per-module depth. Three thin
// families once summed to an apparent 16 and hid a 5-item module; Rule #7 exists
// because this endpoint cannot see that, and should not be asked to.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  try {
    const [byModule, total, approvedReviews] = await Promise.all([
      prisma.frenchItem.groupBy({
        by: ["level", "skill"],
        where: { active: true },
        _count: true,
      }),
      prisma.frenchItem.count({ where: { active: true } }),
      prisma.review.count({ where: { approved: true } }),
    ]);
    const items: Record<string, number> = {};
    for (const r of byModule) items[`${r.level}.${r.skill}`] = r._count;
    return NextResponse.json(
      { ok: true, itemsActive: total, items, approvedReviews },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "error" },
      { status: 500 },
    );
  }
}
