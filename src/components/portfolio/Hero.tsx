import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, MapPin, Sparkles, Send } from "lucide-react";
import { siPython, siJavascript, siMysql, siOpenjdk, siCplusplus, siPandas } from "simple-icons";
import { Button } from "@/components/ui/button";
import { LinkButton } from "./LinkButton";
import { SocialLinks } from "./SocialLinks";
import { profile } from "@/data/portfolio";
import { ParticleScene } from "./ParticleScene";

const codeLines = [
  { text: "import numpy as np", left: "3%", top: "9%" },
  { text: "model.fit(X_train, y_train)", left: "38%", top: "11%" },
  { text: "def solve(problem):", left: "88%", top: "16%" },
  { text: "accuracy = model.score(X, y)", left: "56%", top: "90%" },
  { text: "class Innovation:", left: "84%", top: "84%" },
  { text: "for idea in ideas:", left: "2%", top: "92%" },
];

const floating = [
  { icon: siPython, label: "Python", pos: "left-[2%] top-[14%]", delay: 0 },
  { icon: siOpenjdk, label: "Java", pos: "right-[0%] top-[8%]", delay: 1.2 },
  { icon: siPandas, label: "Pandas", pos: "-left-[4%] bottom-[24%]", delay: 2.1 },
  { icon: siMysql, label: "MySQL", pos: "right-[-2%] bottom-[30%]", delay: 0.6 },
  { icon: siJavascript, label: "JavaScript", pos: "-left-[8%] top-[44%]", delay: 1.7 },
  { icon: siCplusplus, label: "C++", pos: "right-[22%] -top-[4%]", delay: 2.6 },
];

function Portrait() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* orbit rings */}
      <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-cyan/25" />
      <div className="absolute inset-[9%] animate-spin-reverse rounded-full border border-violet/25">
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-cyan shadow-glow" />
      </div>
      <div className="absolute inset-[18%] animate-pulse-glow rounded-full bg-gradient-brand opacity-60 blur-3xl" />

      {/* photo / monogram */}
      <div className="absolute inset-[20%] overflow-hidden rounded-full border border-glass-border bg-surface p-1.5 shadow-glow">
        <div className="relative size-full overflow-hidden rounded-full bg-gradient-brand-soft">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.name}
              className="size-full object-cover"
              width={400}
              height={400}
            />
          ) : (
            <div className="grid size-full place-items-center">
              <div className="bg-grid absolute inset-0 opacity-60" />
              <span className="text-gradient relative font-display text-6xl font-bold sm:text-7xl">
                {profile.initials}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-cyan/15 to-transparent" />
        </div>
      </div>

      {/* floating tech chips */}
      {floating.map(({ icon, label, pos, delay }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + delay * 0.2, duration: 0.6 }}
          className={`absolute ${pos}`}
        >
          <div
            className="glass flex animate-float items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-foreground"
            style={{ animationDelay: `${delay}s` }}
          >
            <svg viewBox="0 0 24 24" className="size-4 text-cyan" fill="currentColor" aria-hidden>
              <path d={icon.path} />
            </svg>
            <span className="hidden sm:inline">{label}</span>
          </div>
        </motion.div>
      ))}

      {/* status card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="glass absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2 text-xs"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        <span className="text-muted-foreground">Open to</span>
        <span className="font-semibold text-foreground">hackathons & collaborations</span>
      </motion.div>
    </div>
  );
}

function CodeBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0" />
      <div className="absolute inset-0 opacity-40 lg:left-1/3"><ParticleScene /></div>

      {/* drifting code fragments */}
      <div className="absolute inset-0 hidden md:block">
        {codeLines.map((line, i) => (
          <span
            key={line.text}
            className="absolute animate-float-slow whitespace-nowrap font-mono text-[0.72rem] text-muted-foreground/25"
            style={{ left: line.left, top: line.top, animationDelay: `${i * 0.9}s` }}
          >
            {line.text}
          </span>
        ))}
      </div>

      {/* neural network lines */}
      <svg className="absolute right-0 top-0 hidden h-full w-1/2 opacity-[0.18] lg:block" viewBox="0 0 400 600" fill="none">
        {[
          [60, 80, 200, 160], [200, 160, 340, 110], [200, 160, 260, 300], [60, 80, 120, 260],
          [120, 260, 260, 300], [260, 300, 360, 420], [120, 260, 180, 470], [180, 470, 360, 420],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--cyan)"
            strokeWidth="1"
            strokeDasharray="4 6"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-40" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />
          </line>
        ))}
        {[[60, 80], [200, 160], [340, 110], [120, 260], [260, 300], [360, 420], [180, 470]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="var(--electric)" />
        ))}
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[90svh] items-center overflow-hidden pb-20 pt-28 md:pt-32">
      <CodeBackground />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
          >
            <Sparkles className="size-3.5 text-cyan" />
            <span className="font-mono text-[0.68rem] tracking-[0.22em] text-foreground sm:text-xs">
              {profile.name.toUpperCase()}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 text-lg text-muted-foreground md:text-xl"
          >
            Hey, I'm <span className="font-semibold text-foreground">{profile.firstName}.</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.6rem] font-semibold leading-[1.1] text-foreground sm:text-6xl lg:text-[3.7rem]"
          >
            {profile.firstName}<br />
            <span className="text-gradient">{profile.name.slice(profile.firstName.length).trim()}</span>
          </motion.h1>
          <p className="mt-5 max-w-xl font-display text-lg text-foreground sm:text-xl">{profile.headline}</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center gap-x-2 font-mono text-sm text-muted-foreground md:text-base"
          >
            <span aria-hidden className="text-cyan">&gt;</span>
            {profile.heroRoles.map((r, i) => (
              <span key={r} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-violet">|</span>}
                <span className="text-foreground">{r}</span>
              </span>
            ))}
            <span aria-hidden className="h-5 w-[2px] animate-blink bg-cyan" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {profile.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild variant="hero" size="xl">
              <a href="#projects" id="portfolio-entry">
                View My Projects <ArrowRight />
              </a>
            </Button>
            <LinkButton href={profile.resumeUrl} size="xl" download external={false} soonLabel="Soon">
              <Download /> Download Resume
            </LinkButton>
            <Button asChild variant="glass" size="xl"><a href="#contact"><Send /> Contact Me</a></Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <SocialLinks />
            <span className="hidden h-6 w-px bg-border sm:block" />
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-cyan" /> {profile.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="px-6 sm:px-10 lg:px-0"
        >
          <Portrait />
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-cyan md:flex"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.3em]">SCROLL</span>
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
