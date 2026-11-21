import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink, Loader2, ScrollText, SearchX, Sparkles } from "lucide-react";

import { certifications } from "@/data/portfolio";
import { searchCertificates } from "@/lib/certificate-finder.functions";
import {
  FINDER_QUERY_MAX,
  finderQuerySchema,
  type FinderMatch,
} from "@/lib/certificate-finder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkButton } from "./LinkButton";

const SUGGESTIONS = ["AI & machine learning", "Hackathons", "Health & first aid", "Leadership roles"];

type State =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "done"; query: string; summary: string; matches: FinderMatch[] }
  | { status: "error"; message: string };

export function CertificateFinder() {
  const search = useServerFn(searchCertificates);
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const loading = state.status === "loading";

  async function run(text: string) {
    const parsed = finderQuerySchema.safeParse({ query: text });
    if (!parsed.success) {
      setState({ status: "error", message: parsed.error.issues[0]?.message ?? "Please describe what you're looking for." });
      return;
    }
    const q = parsed.data.query;
    setState({ status: "loading", query: q });
    try {
      const res = await search({ data: { query: q } });
      if (res.ok) setState({ status: "done", query: q, summary: res.summary, matches: res.matches });
      else setState({ status: "error", message: res.error });
    } catch (err) {
      console.error(err);
      setState({ status: "error", message: "Something went wrong with the AI search. Please try again." });
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!loading) void run(query);
  }

  return (
    <div className="glass border-gradient relative mb-10 overflow-hidden rounded-2xl p-5 sm:p-7">
      <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-violet/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-brand-soft text-cyan">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground sm:text-lg">Ask the AI certificate finder</h3>
            <p className="text-sm text-muted-foreground">
              Describe what you're looking for and AI will pick the matching certificates and explain why.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="cert-finder" className="sr-only">
            Describe the certificate you are looking for
          </label>
          <Input
            id="cert-finder"
            value={query}
            maxLength={FINDER_QUERY_MAX}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. something that shows AI or programming skills"
            className="h-11 rounded-full border-glass-border bg-surface/60 px-5"
            disabled={loading}
          />
          <Button type="submit" variant="hero" size="pill" className="h-11 shrink-0" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {loading ? "Searching…" : "Find certificates"}
          </Button>
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              disabled={loading}
              onClick={() => {
                setQuery(s);
                void run(s);
              }}
              className="rounded-full border border-glass-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-cyan/50 hover:text-foreground disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {state.status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 grid gap-3 sm:grid-cols-2"
              >
                {[0, 1].map((i) => (
                  <div key={i} className="h-28 animate-pulse rounded-xl border border-glass-border bg-surface/50" />
                ))}
              </motion.div>
            )}

            {state.status === "error" && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="mt-5 text-sm text-destructive"
              >
                {state.message}
              </motion.p>
            )}

            {state.status === "done" && (
              <motion.div
                key={`done-${state.query}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6"
              >
                <p className="flex items-start gap-2 text-sm text-foreground">
                  {state.matches.length ? (
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-cyan" />
                  ) : (
                    <SearchX className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  )}
                  {state.summary}
                </p>
                {state.matches.length > 0 && (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {state.matches.map((m, i) => {
                      const cert = certifications[m.index];
                      if (!cert) return null;
                      return (
                        <motion.li
                          key={m.index}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex gap-4 rounded-xl border border-glass-border bg-surface/50 p-4"
                        >
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-glass-border bg-surface sm:size-20">
                            {cert.image ? (
                              <img src={cert.image} alt="" loading="lazy" className="size-full object-cover" />
                            ) : (
                              <div className="grid size-full place-items-center text-cyan">
                                <ScrollText className="size-5" />
                              </div>
                            )}
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <h4 className="text-sm font-semibold leading-snug text-foreground">{cert.title}</h4>
                            {(cert.issuer || cert.date) && (
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {[cert.issuer, cert.date].filter(Boolean).join(" · ")}
                              </p>
                            )}
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.reason}</p>
                            <div className="mt-3">
                              <LinkButton href={cert.url} size="sm" className="rounded-full px-3">
                                View Certificate <ExternalLink />
                              </LinkButton>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
