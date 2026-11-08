// RR-401 · the factory model answers for one task, at every NCLC level the gate let through, each with its note. Shown
// exactly as beta-g wrote them (only *italics* in a note are rendered as italics). Models and notes only: no new scoring.
import { MODEL_ANSWER_LABEL, TRADEMARK_LINE } from "@/lib/factory/labels";

export type ModelAnswer = { level: string; cefr: string; text: string; note: string; wordCount: number; withMistakes: boolean };

function NoteText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return <>{parts.map((p, i) => (/^\*[^*]+\*$/.test(p) ? <em key={i}>{p.slice(1, -1)}</em> : <span key={i}>{p}</span>))}</>;
}

export function ModelAnswers({ models, written }: { models: ModelAnswer[]; written: boolean }) {
  if (!models.length) return null;
  return (
    <details className="mt-6 rounded-2xl border border-almi-bg-peach bg-almi-paper p-5">
      <summary className="cursor-pointer font-semibold text-almi-ink">
        Model answers ({models.map((m) => m.level).join(" / ")})
      </summary>
      <p className="mt-2 text-xs text-almi-text-muted">{MODEL_ANSWER_LABEL}.</p>
      <div className="mt-4 space-y-6">
        {models.map((m) => (
          <section key={m.level}>
            <h3 className="font-semibold text-almi-ink">
              {m.level} <span className="text-sm font-medium text-almi-text-muted">({m.cefr})</span>
              {m.withMistakes && <span className="ml-2 text-sm font-medium text-almi-coral-text">with mistakes on purpose</span>}
            </h3>
            <p lang="fr" className="mt-2 whitespace-pre-line text-sm text-almi-text">{m.text}</p>
            {written && <p className="mt-1 text-xs text-almi-text-muted">{m.wordCount} words (punctuation, greeting and signature not counted)</p>}
            <p className="mt-2 text-sm text-almi-text">
              <span className="font-medium text-almi-ink">Notes: </span>
              <NoteText text={m.note} />
            </p>
          </section>
        ))}
      </div>
      <p className="mt-5 text-xs text-almi-text-muted">{TRADEMARK_LINE}</p>
    </details>
  );
}
