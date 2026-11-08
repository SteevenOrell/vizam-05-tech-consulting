import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;
  const base = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 font-mono text-[0.78rem] uppercase tracking-[0.05em] transition-colors";
  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-between gap-4 border-t border-rule pt-6">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={`${base} gap-1 border-rule hover:border-ink hover:bg-paper-2`} rel="prev">
          <ChevronLeft aria-hidden="true" className="size-4" /> Previous
        </Link>
      ) : (
        <span className={`${base} gap-1 border-rule text-slate`} aria-disabled="true">
          <ChevronLeft aria-hidden="true" className="size-4" /> Previous
        </span>
      )}
      <ol className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <Link
              href={hrefFor(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={`${base} font-mono ${p === page ? "border-ink bg-ink text-ice" : "border-rule hover:border-ink hover:bg-paper-2"}`}
            >
              {p}
            </Link>
          </li>
        ))}
      </ol>
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className={`${base} gap-1 border-rule hover:border-ink hover:bg-paper-2`} rel="next">
          Next <ChevronRight aria-hidden="true" className="size-4" />
        </Link>
      ) : (
        <span className={`${base} gap-1 border-rule text-slate`} aria-disabled="true">
          Next <ChevronRight aria-hidden="true" className="size-4" />
        </span>
      )}
    </nav>
  );
}
