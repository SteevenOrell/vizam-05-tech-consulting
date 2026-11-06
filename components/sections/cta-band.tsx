import { LinkButton, SectionIndex } from "@/components/ui/primitives";

export function CtaBand({
  index = "∞",
  title = "Bring us the decision you are weighing.",
  text = "A first conversation is a working session, not a pitch. We will tell you what we would want to know, and whether we are the right people to help.",
}: {
  index?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-paper" aria-labelledby="cta-title">
      <div className="grid-hairlines-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x section-y relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SectionIndex n={index} label="Next step" dark />
          <h2 id="cta-title" className="mt-6 text-display">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-[1.1rem] text-mist">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
          <LinkButton href="/consultation" variant="on-dark">
            Request a consultation
          </LinkButton>
          <LinkButton href="/contact" variant="ghost-dark">
            General enquiry
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
