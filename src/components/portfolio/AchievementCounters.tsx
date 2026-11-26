import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { achievements } from "@/data/portfolio";

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible || reduced) return;
    const animation = animate(0, value, { duration: 1.2, ease: "easeOut", onUpdate: (next) => setCount(Math.round(next)) });
    return () => animation.stop();
  }, [visible, reduced, value]);
  return (
    <div ref={ref} className="py-6">
      <p className="font-display text-4xl font-semibold text-cyan" aria-hidden="true">{reduced ? value : count.toString().padStart(2, "0")}</p>
      <p className="mt-2 text-sm text-muted-foreground"><span className="sr-only">{value} </span>{label}</p>
    </div>
  );
}

export function AchievementCounters() {
  return (
    <div className="mb-10 grid grid-cols-2 gap-x-6 border-y border-border sm:grid-cols-3">
      <Counter value={achievements.length} label="Achievements" />
      <Counter value={achievements.filter((item) => item.category === "Sports").length} label="Sports milestones" />
      <Counter value={new Set(achievements.map((item) => item.category)).size} label="Fields of achievement" />
    </div>
  );
}