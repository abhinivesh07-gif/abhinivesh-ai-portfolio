/** Browsing filters for the Certifications section. "" means "All". */
export type CertificateFilters = { issuer: string; topic: string; year: string };
export const NO_FILTERS: CertificateFilters = { issuer: "", topic: "", year: "" };

type FilterableCertificate = { issuer: string; topics: string[]; date: string };

/** The 4-digit year inside a date like "Nov 2026", or "" when there is none. */
export function certificateYear(date: string): string {
  return date.match(/\b(19|20)\d{2}\b/)?.[0] ?? "";
}

/** Filter choices built from the collection itself, so they never list an empty option. */
export function getCertificateFilterOptions(certs: FilterableCertificate[]) {
  const issuers = new Set<string>();
  const topics = new Set<string>();
  const years = new Set<string>();
  for (const c of certs) {
    if (c.issuer.trim()) issuers.add(c.issuer.trim());
    for (const t of c.topics) if (t.trim()) topics.add(t.trim());
    const y = certificateYear(c.date);
    if (y) years.add(y);
  }
  return {
    issuers: [...issuers].sort((a, b) => a.localeCompare(b)),
    topics: [...topics].sort((a, b) => a.localeCompare(b)),
    years: [...years].sort((a, b) => b.localeCompare(a)),
  };
}

/** A certificate is shown only when it matches every chosen filter. */
export function filterCertificates<T extends FilterableCertificate>(
  certs: T[],
  filters: CertificateFilters,
): T[] {
  return certs.filter(
    (c) =>
      (!filters.issuer || c.issuer.trim() === filters.issuer) &&
      (!filters.topic || c.topics.some((t) => t.trim() === filters.topic)) &&
      (!filters.year || certificateYear(c.date) === filters.year),
  );
}
