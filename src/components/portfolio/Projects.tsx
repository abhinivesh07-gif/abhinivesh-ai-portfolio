import { ArrowUpRight, Github, Smartphone } from "lucide-react";
import { isValidDownloadUrl } from "@/lib/project-links";
import { projects } from "@/data/portfolio";
import { Reveal, Section, SectionHeading } from "./primitives";
import { LinkButton } from "./LinkButton";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        eyebrow="Projects"
        title={
          <>
            Ideas I'm <span className="text-gradient">Bringing to Life</span>
          </>
        }
        description="Concepts and builds where I apply AI and software development to real problems — built to make everyday student life easier."
      />

      <div className="space-y-10 md:space-y-14">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={p.title}>
              <article className="project-interactive group glass border-gradient relative grid overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-glow-violet md:grid-cols-2">
                <div className={cn("relative overflow-hidden", flip && "md:order-2")}>
                  <div className="aspect-[4/3] md:aspect-auto md:h-full">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      loading="lazy"
                      decoding="async"
                      width={960}
                      height={960}
                      className="size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-background/30" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-cyan/10 to-transparent opacity-0 group-hover:opacity-100" />
                  <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 font-mono text-[0.7rem] tracking-wider text-foreground">
                    {p.category}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <span className="text-gradient font-display text-5xl font-bold opacity-80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-3xl font-semibold text-foreground md:text-4xl">{p.title}</h3>
                  <p className="mt-2 font-medium text-cyan">{p.subtitle}</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{p.description}</p>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                    {p.tech.map((t) => (
                      <li key={t} className="rounded-full border border-glass-border bg-accent/50 px-3 py-1 font-mono text-xs text-foreground">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <LinkButton href={p.github} variant="glass">
                      <Github /> {p.githubLabel ?? "GitHub"}
                    </LinkButton>
                    <LinkButton href={p.demo} variant="hero">
                      Live Demo <ArrowUpRight />
                    </LinkButton>
                    {isValidDownloadUrl(p.apk) && (
                      <LinkButton href={p.apk.trim()} variant="glass">
                        <Smartphone /> Download APK
                      </LinkButton>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
