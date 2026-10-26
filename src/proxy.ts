// 410 Gone for the removed programmatic page families (owner ruling 17 Oct 2026:
// delete the old auto-generated pages, no redirects). Answered here, before any
// rendering, ISR write or database call.

import { NextResponse, type NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  return new NextResponse("410 Gone — this page has been removed.", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
      "x-robots-tag": "noindex",
    },
  });
}

export const config = {
  // ONLY the gone families. /study-in-france/<formation> and
  // /study-in-france/<formation>/<origin> (there is no /study-in-france index).
  matcher: ["/study-in-france/:path+"],
};
