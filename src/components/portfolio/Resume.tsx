import { Download, FileText, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Section, SectionHeading, SpotlightCard } from "./primitives";
import { profile, resume } from "@/data/portfolio";

export function Resume() {
  return (
    <Section id="resume">
      <SectionHeading
        index="08"
        eyebrow="Resume"
        title={
          <>
            My <span className="text-gradient">Resume</span>
          </>
        }
        description={resume.intro}
      />

      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-brand-soft text-cyan">
                <FileText className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{resume.fileName}</p>
                <p className="text-xs text-muted-foreground">One page · PDF · Updated Nov 2026</p>
              </div>
            </div>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              A snapshot of my journey as a {(profile.role.split("|")[0] ?? profile.role).trim()} — education, skills,
              projects, certifications and achievements, all in one place.
            </p>

            <Button asChild variant="hero" size="xl" className="group">
              <a href={resume.pdfUrl} download={resume.fileName}>
                <Download className="transition-transform duration-300 group-hover:translate-y-0.5" />
                Download My Resume (PDF)
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <SpotlightCard className="p-3 sm:p-4">
            <a
              href={resume.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/preview relative block overflow-hidden rounded-xl border border-glass-border"
              aria-label="Open resume PDF in a new tab"
            >
              <img
                src={resume.previewImage}
                alt={resume.previewAlt}
                className="w-full transition-transform duration-700 group-hover/preview:scale-[1.02]"
                loading="lazy"
              />
              <span className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/preview:opacity-100">
                <span className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground">
                  <ZoomIn className="size-4 text-cyan" /> Click to open full resume
                </span>
              </span>
            </a>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
