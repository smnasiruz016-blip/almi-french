"use client";

// Honest per-skill result. TEF/TCF: estimated NCLC + CEFR (+ B2-inférieur
// warning). DELF/DALF: estimated /25 with the 5/25 note-éliminatoire flag. Never
// a fabricated official score — always points to confirming with the body.

export type SkillEstimate = {
  family: "TEF" | "TCF" | "DELF-DALF";
  skill: string;
  scale: number;
  score: number;
  fraction: number;
  nclc?: number;
  cefr?: string;
  b2Inferieur?: boolean;
  outOf25?: number;
  eliminated?: boolean;
  note: string;
  confirm: string;
};

export type Feedback = {
  levelEstimate: string;
  strengths: string[];
  improvements: string[];
  summary: string;
} | null;

export function Result({ estimate, feedback }: { estimate: SkillEstimate; feedback: Feedback }) {
  const pct = Math.round(estimate.fraction * 100);
  return (
    <div className="mt-6 rounded-2xl border border-almi-coral/30 bg-almi-paper p-6">
      <h2 className="font-display text-xl font-semibold text-almi-ink">Your estimate</h2>

      {estimate.family === "DELF-DALF" ? (
        <p className="mt-2 text-2xl font-bold text-almi-ink">
          ~{estimate.outOf25}/25
          {estimate.eliminated && (
            <span className="ml-2 align-middle text-sm font-semibold text-almi-coral-deep">
              below the 5/25 floor
            </span>
          )}
        </p>
      ) : (
        <p className="mt-2 text-2xl font-bold text-almi-ink">
          ~NCLC {estimate.nclc} <span className="text-base font-medium text-almi-text-muted">({estimate.cefr})</span>
          {estimate.b2Inferieur && (
            <span className="ml-2 align-middle text-sm font-semibold text-almi-coral-deep">B2 inférieur</span>
          )}
        </p>
      )}

      <p className="mt-1 text-sm text-almi-text-muted">
        Raw practice score: {pct}% · estimated {estimate.score}/{estimate.scale} on the {estimate.family} scale
      </p>
      <p className="mt-3 text-sm text-almi-text">{estimate.note}</p>

      {feedback && (
        <div className="mt-5 space-y-3 border-t border-almi-bg-peach pt-4 text-sm">
          <p className="font-semibold text-almi-ink">Feedback ({feedback.levelEstimate})</p>
          <p className="text-almi-text">{feedback.summary}</p>
          {feedback.strengths.length > 0 && (
            <div>
              <p className="font-medium text-almi-ink">Strengths</p>
              <ul className="ml-4 list-disc text-almi-text">
                {feedback.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {feedback.improvements.length > 0 && (
            <div>
              <p className="font-medium text-almi-ink">Work on next</p>
              <ul className="ml-4 list-disc text-almi-text">
                {feedback.improvements.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <p className="mt-5 rounded-xl bg-almi-bg-peach/50 px-4 py-3 text-xs text-almi-text-muted">{estimate.confirm}</p>
    </div>
  );
}
