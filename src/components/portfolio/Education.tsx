import { GraduationCap, MapPin, School } from "lucide-react";
import { education } from "@/data/portfolio";
import { IconTile, Reveal, Section, SectionHeading, SpotlightCard } from "./primitives";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        index="05"
        eyebrow="Education"
        title={
          <>
            Where I'm <span className="text-gradient">Learning & Growing</span>
          </>
        }
      />
      <div className="relative grid gap-5 md:grid-cols-2">
        {education.map((ed, i) => {
          const Icon = i === 0 ? GraduationCap : School;
          return (
            <Reveal key={ed.institution} delay={i * 0.1}>
              <SpotlightCard className="h-full p-7 md:p-8">
                <div className="flex items-center justify-between">
                  <IconTile>
                    <Icon />
                  </IconTile>
                  <span
                    className={
                      i === 0
                        ? "rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground"
                        : "rounded-full border border-glass-border px-3 py-1 text-xs font-medium text-muted-foreground"
                    }
                  >
                    {ed.status}
                    {ed.period && ` · ${ed.period}`}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug text-foreground">{ed.degree}</h3>
                <p className="mt-3 font-medium text-cyan">{ed.institution}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {ed.place}
                </p>
                {ed.note && (
                  <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">{ed.note}</p>
                )}
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
