import Link from "next/link";

// Milestone-1 stub. The French practice flow (exam picker → TEF/TCF/DELF/DALF
// items → the three scoring engines) is built in the next milestone, once the
// original French content waves land. Until then this is an honest placeholder.
export const metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="font-display text-3xl font-bold text-almi-ink">Practice tests are on the way</h1>
      <p className="mt-4 text-almi-text">
        AlmiFrench is being built exam by exam — TEF, TCF, DELF and DALF, all four skills, every CEFR
        level. The honest scoring engines are in place; the practice content is being written now
        (original French material, never copied).
      </p>
      <p className="mt-3 text-sm text-almi-text-muted">
        In the meantime, see which exam your goal actually needs:
      </p>
      <div className="mt-6">
        <Link
          href="/which-french-test"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-almi-coral px-6 py-2.5 text-sm font-semibold text-almi-ink hover:bg-almi-coral-deep"
        >
          Which French test do you need? →
        </Link>
      </div>
    </div>
  );
}
