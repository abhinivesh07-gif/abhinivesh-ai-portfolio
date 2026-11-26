import { Award, Brain, Dumbbell, GraduationCap, Medal, Trophy, Volleyball } from "lucide-react";
import { achievements } from "@/data/portfolio";
import { Reveal, Section, SectionHeading, SpotlightCard } from "./primitives";
import { AchievementCounters } from "./AchievementCounters";

const icons = {
  karate: Dumbbell,
  throwball: Volleyball,
  trophy: Trophy,
  medal: Medal,
  academic: GraduationCap,
  quiz: Brain,
} as const;

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        index="06"
        eyebrow="Achievements"
        title={
          <>
            Discipline, Drive & <span className="text-gradient">Wins</span>
          </>
        }
        description="Milestones from the dojo, the court and the classroom — the habits behind how I approach every challenge."
      />
      <AchievementCounters />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => {
          const Icon = icons[a.icon];
          return (
            <Reveal key={a.title} delay={(i % 3) * 0.08}>
              <SpotlightCard className="h-full p-7">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-80" />
                    <div className="relative grid size-14 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground">
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <Award className="size-5 text-muted-foreground/50 transition-colors group-hover:text-cyan" />
                </div>
                <p className="eyebrow mt-6">{a.category}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">{a.title}</h3>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
