export default function Loading() {
  return (
    <div className="container-x section-y" role="status" aria-live="polite" aria-label="Loading page">
      <div className="mono-label flex items-center gap-3 text-slate">
        <span className="relative block h-px w-24 overflow-hidden bg-rule">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-[loading-bar_1.1s_ease-in-out_infinite] bg-gradient-to-r from-cobalt to-teal" />
        </span>
        Loading
      </div>
      <div className="mt-10 space-y-4" aria-hidden="true">
        <div className="h-14 max-w-2xl rounded-[var(--radius-field)] bg-paper-2" />
        <div className="h-5 max-w-xl rounded-full bg-paper-2" />
        <div className="h-5 max-w-lg rounded-full bg-paper-2" />
      </div>
    </div>
  );
}
