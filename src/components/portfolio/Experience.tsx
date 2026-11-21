import { CalendarDays, Flag, Globe, Lightbulb, Puzzle, Rocket, Trophy, Users } from "lucide-react";
import { experience } from "@/data/portfolio";
import { Reveal, Section, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

const icons = { rocket: Rocket, lightbulb: Lightbulb, flag: Flag, globe: Globe, users: Users, puzzle: Puzzle } as const;

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index="04"
        eyebrow="Hackathons & Experience"
        title={
          <>
            Innovation <span className="text-gradient">Beyond Classrooms</span>
          </>
        }
        description="Hackathons, ideathons and team builds where I learn by doing — fast, collaboratively, and with real problems."
      />

      <div className="relative">
        {/* timeline spine */}
        <div
          aria-hidden
          className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-cyan via-electric to-violet opacity-50 md:left-1/2"
        />

        <ol className="space-y-8 md:space-y-4">
          {experience.map((e, i) => {
            const Icon = icons[e.icon];
            const right = i % 2 === 1;
            return (
              <li key={e.title} className="relative md:grid md:grid-cols-2 md:gap-14">
                <span
                  aria-hidden
                  className="absolute left-5 top-6 z-10 grid size-10 -translate-x-1/2 place-items-center rounded-full border border-glass-border bg-background text-cyan shadow-glow md:left-1/2"
                >
                  <Icon className="size-4" />
                </span>

                <Reveal
                  y={16}
                  className={cn("pl-14 md:pl-0", right ? "md:col-start-2" : "md:col-start-1 md:text-right")}
                >
                  <div className="group glass rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-glow-violet">
                    <span className="eyebrow">{e.kind}</span>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
                    {(e.date || e.result) && (
                      <div className={cn("mt-4 flex flex-wrap gap-2", !right && "md:justify-end")}>
                        {e.date && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs text-foreground">
                            <CalendarDays className="size-3.5 text-cyan" /> {e.date}
                          </span>
                        )}
                        {e.result && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs text-foreground">
                            <Trophy className="size-3.5 text-cyan" /> {e.result}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
