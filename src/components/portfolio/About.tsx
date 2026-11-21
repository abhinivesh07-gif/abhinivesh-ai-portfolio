import { GraduationCap, Lightbulb, MapPin, Puzzle, RefreshCcw } from "lucide-react";
import { about, profile } from "@/data/portfolio";
import { IconTile, Reveal, Section, SectionHeading, SpotlightCard } from "./primitives";

const highlightIcons = { learner: RefreshCcw, innovation: Lightbulb, solver: Puzzle } as const;

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            A Little <span className="text-gradient">About Me</span>
          </>
        }
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "text-foreground/90" : undefined}>
              {p}
            </p>
          ))}
          <blockquote className="mt-8 border-l-2 border-cyan pl-5 font-display text-xl font-medium leading-snug text-foreground md:text-2xl">
            "{profile.tagline}"
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <SpotlightCard className="p-6 md:p-7">
            <p className="eyebrow mb-5">Quick facts</p>
            <dl className="space-y-5">
              <div className="flex gap-4">
                <GraduationCap className="mt-0.5 size-5 shrink-0 text-cyan" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Studying</dt>
                  <dd className="mt-1 font-medium text-foreground">B.E. CSE (AI & ML)</dd>
                  <dd className="text-sm text-muted-foreground">
                    {profile.college}, {profile.collegeCity}
                  </dd>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-cyan" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Based in</dt>
                  <dd className="mt-1 font-medium text-foreground">{profile.location}</dd>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <dt className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Focus</dt>
                <dd className="flex flex-wrap gap-2">
                  {["AI", "Machine Learning", "Python", "Hackathons"].map((t) => (
                    <span key={t} className="rounded-full border border-glass-border bg-accent/60 px-3 py-1 text-xs font-medium text-foreground">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </SpotlightCard>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {about.highlights.map((h, i) => {
          const Icon = highlightIcons[h.icon];
          return (
            <Reveal key={h.title} delay={i * 0.1}>
              <SpotlightCard className="h-full p-7">
                <IconTile>
                  <Icon />
                </IconTile>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
