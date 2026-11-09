import { GhostNumeral } from "@/components/ui/ghost-numeral";
import { GradientField } from "@/components/ui/gradient-field";
import { LinkButton, SectionIndex } from "@/components/ui/primitives";

/** Closing band: a rounded aurora panel inside a paper section, so it reads as one more bento card. */
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
    <section className="bg-paper px-3 pb-3 pt-4 md:px-4 md:pb-4" aria-labelledby="cta-title">
      <div className="on-dark relative overflow-hidden rounded-[var(--radius-panel)] bg-ink text-paper">
        <GradientField tone="aurora" focus={[0.95, 0.08]} columns={26} aspect={2.2} seed={11} />
        <GhostNumeral
          value="NEXT"
          tone="dark"
          variant="outline"
          className="absolute -bottom-2 right-3 h-[4.5rem] md:right-10 md:h-[9rem]"
        />
        <div className="container-x section-y relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionIndex n={index} label="Next step" dark />
            <h2 id="cta-title" className="mt-6 text-display">
              {title}
            </h2>
            <p className="mt-6 max-w-2xl text-[1.1rem] text-paper">{text}</p>
          </div>
          <div className="relative flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
            <LinkButton href="/consultation" variant="on-dark">
              Request a consultation
            </LinkButton>
            <LinkButton href="/contact" variant="ghost-dark">
              General enquiry
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
