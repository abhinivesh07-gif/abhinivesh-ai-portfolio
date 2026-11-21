import { Code2, Database, Globe, Layers, Sparkles } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { IconTile, Reveal, Section, SectionHeading, SpotlightCard } from "./primitives";
import { TechIcon } from "./TechIcon";
import { cn } from "@/lib/utils";

const groupIcons = { code: Code2, globe: Globe, database: Database, layers: Layers, sparkles: Sparkles } as const;

// Bento layout spans for the five groups (desktop)
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title={
          <>
            The <span className="text-gradient">Toolkit</span> I Build With
          </>
        }
        description="Languages, tools and concepts I use and keep sharpening — from writing clean code to exploring intelligent systems."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((g, i) => {
          const Icon = groupIcons[g.icon];
          return (
            <Reveal key={g.title} delay={(i % 3) * 0.08} className={cn(spans[i], i === 4 && "sm:col-span-2 lg:col-span-2")}>
              <SpotlightCard className="h-full p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <IconTile>
                    <Icon />
                  </IconTile>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(g.skills.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{g.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{g.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center gap-2 rounded-lg border border-glass-border bg-background/50 px-3 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
                    >
                      <TechIcon icon={s.icon} className="size-4 text-cyan" />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
