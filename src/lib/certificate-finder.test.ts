import { describe, expect, it } from "vitest";
import { FINDER_MAX_MATCHES, finderQuerySchema, normalizeMatches } from "./certificate-finder";

describe("certificate finder rules", () => {
  it("rejects a description shorter than 3 characters", () => {
    expect(finderQuerySchema.safeParse({ query: " ai " }).success).toBe(false);
  });

  it("rejects a description longer than 300 characters", () => {
    expect(finderQuerySchema.safeParse({ query: "a".repeat(301) }).success).toBe(false);
  });

  it("accepts a normal description", () => {
    expect(finderQuerySchema.safeParse({ query: "AI or machine learning courses" }).success).toBe(true);
  });

  it("drops matches that point outside the collection", () => {
    const out = normalizeMatches(
      [
        { index: 5, reason: "too high" },
        { index: -1, reason: "negative" },
        { index: 1.5, reason: "not whole" },
        { index: 2, reason: "valid" },
      ],
      3,
    );
    expect(out).toEqual([{ index: 2, reason: "valid" }]);
  });

  it("drops duplicate certificates and empty reasons", () => {
    const out = normalizeMatches(
      [
        { index: 0, reason: "first" },
        { index: 0, reason: "again" },
        { index: 1, reason: "  " },
      ],
      3,
    );
    expect(out).toEqual([{ index: 0, reason: "first" }]);
  });

  it("shows at most 4 certificates per search", () => {
    const raw = Array.from({ length: 8 }, (_, i) => ({ index: i, reason: `r${i}` }));
    expect(normalizeMatches(raw, 10)).toHaveLength(4);
    expect(FINDER_MAX_MATCHES).toBe(4);
  });
});
