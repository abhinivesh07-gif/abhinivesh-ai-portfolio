import { useMemo, useState } from "react";
import { BadgeCheck, CalendarDays, Building2, ExternalLink, ScrollText, SlidersHorizontal, X } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { Reveal, Section, SectionHeading } from "./primitives";
import { LinkButton } from "./LinkButton";
import { CertificateFinder } from "./CertificateFinder";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  NO_FILTERS,
  filterCertificates,
  getCertificateFilterOptions,
  type CertificateFilters,
} from "@/lib/certificate-filters";

const ALL = "all";

export function Certifications() {
  const [filters, setFilters] = useState<CertificateFilters>(NO_FILTERS);
  const options = useMemo(() => getCertificateFilterOptions(certifications), []);
  const shown = useMemo(() => filterCertificates(certifications, filters), [filters]);
  const active = Boolean(filters.issuer || filters.topic || filters.year);

  return (
    <Section id="certifications">
      <SectionHeading
        index="07"
        eyebrow="Certifications"
        title={
          <>
            Certificates & <span className="text-gradient">Learning</span>
          </>
        }
        description="Courses and programs I've completed beyond the curriculum."
      />
      <Reveal>
        <CertificateFinder />
      </Reveal>
      <div className="glass mb-6 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <span className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-muted-foreground">
          <SlidersHorizontal className="size-4 text-cyan" /> FILTER
        </span>
        <FilterSelect
          label="Issuer"
          value={filters.issuer}
          options={options.issuers}
          onChange={(issuer) => setFilters((f) => ({ ...f, issuer }))}
        />
        <FilterSelect
          label="Topic"
          value={filters.topic}
          options={options.topics}
          onChange={(topic) => setFilters((f) => ({ ...f, topic }))}
        />
        <FilterSelect
          label="Year"
          value={filters.year}
          options={options.years}
          onChange={(year) => setFilters((f) => ({ ...f, year }))}
        />
        <div className="flex items-center justify-between gap-3 sm:ml-auto">
          <span className="text-sm text-muted-foreground" aria-live="polite">
            Showing {shown.length} of {certifications.length}
          </span>
          {active && (
            <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setFilters(NO_FILTERS)}>
              <X /> Clear
            </Button>
          )}
        </div>
      </div>
      {shown.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
          No certificates match these filters.{" "}
          <button type="button" className="text-cyan underline-offset-4 hover:underline" onClick={() => setFilters(NO_FILTERS)}>
            Show all
          </button>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        {shown.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.1}>
            <article className="group glass border-gradient flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-glow-violet">
              <div className="relative aspect-[16/9] overflow-hidden border-b border-glass-border bg-surface">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={`${c.title} certificate`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="relative grid size-full place-items-center">
                    <div className="bg-grid absolute inset-0 opacity-70" />
                    <div className="absolute inset-6 rounded-xl border border-dashed border-glass-border" />
                    <div className="relative flex flex-col items-center gap-3 text-center">
                      <div className="grid size-14 place-items-center rounded-2xl bg-gradient-brand-soft text-cyan">
                        <ScrollText className="size-6" />
                      </div>
                      <span className="font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground">
                        CERTIFICATE
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-1 size-5 shrink-0 text-cyan" />
                  <h3 className="text-lg font-semibold leading-snug text-foreground">{c.title}</h3>
                </div>
                {(c.issuer || c.date) && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 pl-8 text-sm text-muted-foreground">
                    {c.issuer && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="size-3.5" /> {c.issuer}
                      </span>
                    )}
                    {c.date && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" /> {c.date}
                      </span>
                    )}
                  </div>
                )}
                {c.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 pl-8">
                    {c.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-glass-border px-2.5 py-0.5 font-mono text-[0.7rem] text-cyan"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pl-8 pt-6">
                  <LinkButton href={c.url} size="sm" className="rounded-full px-4">
                    View Certificate <ExternalLink />
                  </LinkButton>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value || ALL} onValueChange={(v) => onChange(v === ALL ? "" : v)}>
      <SelectTrigger
        aria-label={`Filter by ${label.toLowerCase()}`}
        className="h-9 w-full rounded-full border-glass-border bg-surface/60 px-4 sm:w-auto sm:min-w-40 sm:max-w-64"
      >
        <span className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
          <span className="text-muted-foreground">{label}:</span>
          <span className="truncate">
            <SelectValue />
          </span>
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>All</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
