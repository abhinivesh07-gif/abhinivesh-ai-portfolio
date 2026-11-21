import { motion, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** Fades & lifts content into view once. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "mb-14 flex max-w-3xl flex-col gap-4 md:mb-16",
        align === "center" && "mx-auto items-center text-center",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-muted-foreground">{index}</span>
        <span className="h-px w-10 bg-gradient-brand" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/** Glass card with a soft spotlight that follows the cursor. */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group glass border-gradient relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-glow-violet",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--electric) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Glowing icon tile used across cards. */
export function IconTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative grid size-12 place-items-center rounded-xl border border-glass-border bg-gradient-brand-soft text-cyan transition-transform duration-500 group-hover:scale-110 [&_svg]:size-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
