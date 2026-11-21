import { BadgeCheck, CalendarDays, Building2, ExternalLink, ScrollText } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { Reveal, Section, SectionHeading } from "./primitives";
import { LinkButton } from "./LinkButton";

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        index="07"
        eyebrow="Certifications"
        title={
          <>
            Certificates & <span className="text-gradient">Learning</span>
          </>
        }
        description="Courses and programs I've completed beyond the curriculum."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.1}>
            <article className="group glass border-gradient flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-glow-violet">
              <div className="relative aspect-[16/9] overflow-hidden border-b border-glass-border bg-surface">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={`${c.title} certificate`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="relative grid size-full place-items-center">
                    <div className="bg-grid absolute inset-0 opacity-70" />
                    <div className="absolute inset-6 rounded-xl border border-dashed border-glass-border" />
                    <div className="relative flex flex-col items-center gap-3 text-center">
                      <div className="grid size-14 place-items-center rounded-2xl bg-gradient-brand-soft text-cyan">
                        <ScrollText className="size-6" />
                      </div>
                      <span className="font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground">
                        CERTIFICATE
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-1 size-5 shrink-0 text-cyan" />
                  <h3 className="text-lg font-semibold leading-snug text-foreground">{c.title}</h3>
                </div>
                {(c.issuer || c.date) && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 pl-8 text-sm text-muted-foreground">
                    {c.issuer && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="size-3.5" /> {c.issuer}
                      </span>
                    )}
                    {c.date && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" /> {c.date}
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-auto pl-8 pt-6">
                  <LinkButton href={c.url} size="sm" className="rounded-full px-4">
                    View Certificate <ExternalLink />
                  </LinkButton>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
