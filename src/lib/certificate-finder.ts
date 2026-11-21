import { z } from "zod";

/** Rules for what a visitor may type into the AI certificate finder. */
export const FINDER_QUERY_MIN = 3;
export const FINDER_QUERY_MAX = 300;
/** At most this many certificates are shown for one search. */
export const FINDER_MAX_MATCHES = 4;

export const finderQuerySchema = z.object({
  query: z
    .string()
    .trim()
    .min(FINDER_QUERY_MIN, `Please describe it in at least ${FINDER_QUERY_MIN} characters.`)
    .max(FINDER_QUERY_MAX, `Please keep it under ${FINDER_QUERY_MAX} characters.`),
});

export type FinderMatch = { index: number; reason: string };

export type FinderResult =
  | { ok: true; summary: string; matches: FinderMatch[] }
  | { ok: false; error: string };

type CatalogCertificate = { title: string; issuer: string; date: string; url: string; topics?: string[] };

/** Plain-text list of the collection that the model may choose from (by index). */
export function buildCertificateCatalog(certs: CatalogCertificate[]): string {
  return certs
    .map((c, i) => {
      const parts = [`[${i}] ${c.title}`];
      if (c.issuer) parts.push(`issuer: ${c.issuer}`);
      if (c.date) parts.push(`date: ${c.date}`);
      if (c.topics?.length) parts.push(`topics: ${c.topics.join(", ")}`);
      parts.push(c.url ? "certificate file available" : "certificate file not uploaded yet");
      return parts.join(" | ");
    })
    .join("\n");
}

/**
 * Keeps only matches that point at a real certificate: whole-number indexes
 * inside the collection, no duplicates, a non-empty reason, capped in count.
 */
export function normalizeMatches(raw: unknown, collectionSize: number): FinderMatch[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<number>();
  const out: FinderMatch[] = [];
  for (const item of raw) {
    if (out.length >= FINDER_MAX_MATCHES) break;
    if (!item || typeof item !== "object") continue;
    const { index, reason } = item as { index?: unknown; reason?: unknown };
    if (typeof index !== "number" || !Number.isInteger(index)) continue;
    if (index < 0 || index >= collectionSize || seen.has(index)) continue;
    const text = typeof reason === "string" ? reason.trim() : "";
    if (!text) continue;
    seen.add(index);
    out.push({ index, reason: text.slice(0, 400) });
  }
  return out;
}
