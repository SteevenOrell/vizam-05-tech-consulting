import type { DecisionRecord as DR } from "@/lib/content/types";

/** Signature component: a decision record as a rounded card with a midnight header strip. */
export function DecisionRecord({ record, headingLevel = 3 }: { record: DR; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="card overflow-hidden" aria-labelledby={`dr-${record.id}`}>
      <header className="on-dark flex flex-wrap items-center justify-between gap-2 bg-ink px-5 py-3 text-paper">
        <p className="mono-label text-phosphor">Decision record · {record.id}</p>
        <p className="mono-label text-mist">Status: recommended</p>
      </header>
      <div className="p-5 md:p-7">
        <H id={`dr-${record.id}`} className="text-[1.35rem] leading-tight md:text-[1.6rem]">
          {record.title}
        </H>
        <dl className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <dt className="mono-label text-slate">Context</dt>
            <dd className="mt-1.5 text-graphite">{record.context}</dd>
          </div>
          <div>
            <dt className="mono-label text-slate">Options considered</dt>
            <dd className="mt-1.5">
              <ol className="space-y-1.5 text-graphite">
                {record.options.map((o, i) => (
                  <li key={o} className="flex gap-2">
                    <span className="font-mono text-sm text-slate">{String.fromCharCode(65 + i)}.</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ol>
            </dd>
          </div>
          <div>
            <dt className="mono-label text-slate">Consequences</dt>
            <dd className="mt-1.5">
              <ul className="space-y-1.5 text-graphite">
                {record.consequences.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="rounded-[var(--radius-field)] bg-ice/55 p-4 md:col-span-2">
            <dt className="mono-label text-signal">Decision</dt>
            <dd className="mt-1.5 text-[1.08rem] text-ink">{record.decision}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
