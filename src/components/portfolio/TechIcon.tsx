import {
  siC,
  siCplusplus,
  siCss,
  siHtml5,
  siJavascript,
  siMysql,
  siOpenjdk,
  siPandas,
  siPython,
} from "simple-icons";
import { Boxes, Brain, BrainCircuit, ChartScatter, Database, Puzzle, Workflow } from "lucide-react";
import type { SkillIcon } from "@/data/portfolio";

const brand = {
  python: siPython,
  c: siC,
  cpp: siCplusplus,
  java: siOpenjdk,
  html: siHtml5,
  css: siCss,
  javascript: siJavascript,
  mysql: siMysql,
  pandas: siPandas,
} as const;

const concept = {
  oop: Boxes,
  problem: Puzzle,
  logic: Workflow,
  database: Database,
  ai: Brain,
  ml: BrainCircuit,
  datascience: ChartScatter,
} as const;

export function TechIcon({ icon, className = "size-4" }: { icon: SkillIcon; className?: string }) {
  if (icon in brand) {
    const b = brand[icon as keyof typeof brand];
    return (
      <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d={b.path} />
      </svg>
    );
  }
  const Icon = concept[icon as keyof typeof concept];
  return <Icon className={className} aria-hidden />;
}
