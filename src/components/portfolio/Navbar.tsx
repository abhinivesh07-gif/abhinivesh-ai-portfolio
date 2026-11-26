import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-brand font-display text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-500 group-hover:rotate-6">
        {profile.initials}
      </span>
      <span className="hidden font-display text-[0.95rem] font-semibold tracking-tight text-foreground sm:block">
        {profile.firstName}
        <span className="text-cyan">.</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-3 transition-all duration-500 sm:px-4",
          scrolled ? "glass-strong shadow-glow-violet" : "border border-transparent",
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "nav-glow relative rounded-full px-3 py-1.5 text-[0.82rem] font-medium transition-colors",
                  active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full border border-cyan/25 bg-accent shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="pill" className="hidden h-9 px-4 text-[0.82rem] sm:inline-flex">
            <a href="#contact">
              Let's Connect <ArrowUpRight />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-xl border border-glass-border text-foreground xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-6xl overflow-y-auto rounded-2xl p-3 xl:hidden"
          >
            <ul className="grid gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      active === item.id ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60",
                    )}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <Button asChild variant="hero" size="xl" className="mt-3 w-full">
              <a href="#contact" onClick={() => setOpen(false)}>
                Let's Connect <ArrowUpRight />
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
