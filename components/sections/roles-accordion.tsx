"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import type { Role } from "@/lib/content/types";

export function RolesAccordion({ roles }: { roles: Role[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <ul className="space-y-3" data-testid="roles">
      {roles.map((r) => {
        const isOpen = open === r.slug;
        const panelId = `${baseId}-${r.slug}-panel`;
        const buttonId = `${baseId}-${r.slug}-button`;
        return (
          <li key={r.slug} className="card overflow-hidden">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : r.slug)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 px-5 py-5 text-left md:px-7 md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)_auto] md:gap-8"
              >
                <span className="text-[1.3rem] leading-tight tracking-[-0.02em] md:text-[1.5rem]">
                  {r.title}
                  <span className="ml-3 inline-block rounded-full bg-ink px-2 py-0.5 align-middle font-mono text-[0.75rem] uppercase tracking-[0.06em] text-ice">
                    Demo role
                  </span>
                </span>
                <span className="hidden text-graphite md:block">{r.team}</span>
                <span className="hidden text-graphite md:block">{r.location}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-rule transition-colors group-hover:border-ink group-hover:bg-paper-2"
                >
                  <Plus className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 px-5 pb-8 md:px-7 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-8">
                    <div>
                      <p className="mono-label text-slate md:hidden">
                        {r.team} · {r.location}
                      </p>
                      <p className="mt-2 text-[1.08rem] text-graphite md:mt-0">{r.summary}</p>
                      <p className="mono-label mt-4 text-slate">{r.type}</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="mono-label text-slate">Responsibilities</h4>
                        <ul className="mt-2 space-y-1.5 text-[0.96rem] text-graphite">
                          {r.responsibilities.map((x) => (
                            <li key={x}>— {x}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mono-label text-slate">What you would bring</h4>
                        <ul className="mt-2 space-y-1.5 text-[0.96rem] text-graphite">
                          {r.requirements.map((x) => (
                            <li key={x}>— {x}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="rounded-[var(--radius-field)] bg-ice/55 px-3 py-2 text-sm text-graphite sm:col-span-2">
                        Demo listing: this role is fictional and is not open for applications.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
