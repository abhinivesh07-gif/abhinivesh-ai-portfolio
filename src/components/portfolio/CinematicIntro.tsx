import { useEffect, useRef } from "react";
import { ArrowRight, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import { ParticleScene } from "./ParticleScene";

export const INTRO_DURATION_MS = 3800;

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const skip = useRef<HTMLButtonElement>(null);
  const explore = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || window.location.hash) { onComplete(); return; }
    skip.current?.focus({ preventScroll: true });
    const timer = window.setTimeout(onComplete, INTRO_DURATION_MS);
    const onMotion = () => { if (media.matches) onComplete(); };
    media.addEventListener("change", onMotion);
    return () => { window.clearTimeout(timer); media.removeEventListener("change", onMotion); };
  }, [onComplete]);
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="intro-name" className="cinematic-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-intro px-5"
      onKeyDown={(event) => {
        if (event.key === "Escape") onComplete();
        if (event.key === "Tab") {
          event.preventDefault();
          if (event.target === skip.current) explore.current?.focus();
          else skip.current?.focus();
        }
      }}>
      <ParticleScene burst />
      <div aria-hidden="true" className="intro-spark" />
      <Button ref={skip} variant="ghost" size="sm" onClick={onComplete} className="absolute right-5 top-5 text-muted-foreground sm:right-8 sm:top-8">
        Skip intro <SkipForward />
      </Button>
      <div className="intro-reveal relative max-w-4xl text-center">
        <p className="mb-6 font-mono text-xs text-cyan">{profile.introRoles}</p>
        <h2 id="intro-name" className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
          {profile.name.toUpperCase()}
        </h2>
        <p className="mt-6 text-lg text-muted-foreground sm:text-2xl">{profile.introTagline}</p>
        <Button ref={explore} variant="hero" size="xl" className="mt-9" onClick={onComplete}>
          Explore Portfolio <ArrowRight />
        </Button>
      </div>
      <div aria-hidden="true" className="intro-progress absolute inset-x-0 bottom-0 h-px origin-left bg-cyan" />
    </div>
  );
}