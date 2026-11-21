import { ArrowUp } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { Logo } from "./Navbar";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div aria-hidden className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-brand opacity-60" />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_auto]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{profile.tagline}</p>
            <SocialLinks />
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {[...navItems, { id: "education", label: "Education" } as const].map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-muted-foreground transition-colors hover:text-cyan">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#home"
            aria-label="Back to top"
            className="glass grid size-12 place-items-center self-start rounded-full text-muted-foreground transition-all hover:-translate-y-1 hover:text-cyan"
          >
            <ArrowUp className="size-5" />
          </a>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            Designed & Developed by <span className="text-foreground">{profile.name}</span>.
          </p>
          <p>© 2026 {profile.name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
