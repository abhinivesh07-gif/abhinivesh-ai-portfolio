import { Github, Linkedin, Mail } from "lucide-react";
import { socials } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function socialList() {
  return [
    { label: "GitHub", href: socials.github, icon: Github },
    { label: "LinkedIn", href: socials.linkedin, icon: Linkedin },
    { label: "Email", href: socials.email ? `mailto:${socials.email}` : "", icon: Mail },
  ];
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialList().map(({ label, href, icon: Icon }) => (
        <li key={label}>
          {href ? (
            <a
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={label}
              title={label}
              className="grid size-11 place-items-center rounded-full border border-glass-border bg-glass text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan hover:shadow-glow"
            >
              <Icon className="size-[1.1rem]" />
            </a>
          ) : (
            <span
              aria-label={`${label} — coming soon`}
              title={`${label} — coming soon`}
              className="grid size-11 cursor-not-allowed place-items-center rounded-full border border-dashed border-border text-muted-foreground/70"
            >
              <Icon className="size-[1.1rem]" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
