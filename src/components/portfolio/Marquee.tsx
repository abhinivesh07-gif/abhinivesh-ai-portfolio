import { motion } from "framer-motion";

const words = [
  "Artificial Intelligence", "Machine Learning", "Python", "Data Science", "Hackathons",
  "Problem Solving", "Innovation", "Java", "C++", "MySQL", "Pandas", "JavaScript",
];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div aria-hidden className="relative border-y border-border bg-surface/40 py-5">
      <div className="mask-fade-x overflow-hidden">
        <motion.div
          className="flex w-max gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-lg font-medium text-muted-foreground/70 md:text-xl">
              {w}
              <span className="size-1.5 rounded-full bg-gradient-brand" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
