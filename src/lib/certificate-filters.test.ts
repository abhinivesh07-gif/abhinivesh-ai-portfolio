import { describe, expect, it } from "vitest";
import {
  NO_FILTERS,
  certificateYear,
  filterCertificates,
  getCertificateFilterOptions,
} from "./certificate-filters";

const certs = [
  { title: "IBM", issuer: "IBM SkillsBuild", topics: ["AI & ML"], date: "Nov 2026" },
  { title: "CPR", issuer: "American Heart Association", topics: ["Health & Safety"], date: "Oct 2026" },
  { title: "Hackathon", issuer: "", topics: ["Hackathons"], date: "Sep 2025" },
  { title: "Placeholder", issuer: "", topics: [], date: "" },
];
const titles = (list: { title: string }[]) => list.map((c) => c.title);

describe("certificate filters", () => {
  it("shows every certificate when no filter is chosen", () => {
    expect(filterCertificates(certs, NO_FILTERS)).toHaveLength(4);
  });

  it("filters by issuer", () => {
    expect(titles(filterCertificates(certs, { ...NO_FILTERS, issuer: "IBM SkillsBuild" }))).toEqual(["IBM"]);
  });

  it("filters by topic", () => {
    expect(titles(filterCertificates(certs, { ...NO_FILTERS, topic: "Hackathons" }))).toEqual(["Hackathon"]);
  });

  it("filters by year", () => {
    expect(titles(filterCertificates(certs, { ...NO_FILTERS, year: "2026" }))).toEqual(["IBM", "CPR"]);
  });

  it("combines filters so a certificate must match all of them", () => {
    expect(filterCertificates(certs, { issuer: "IBM SkillsBuild", topic: "Health & Safety", year: "" })).toEqual([]);
  });

  it("reads the year from a date like 'Nov 2026'", () => {
    expect(certificateYear("Nov 2026")).toBe("2026");
    expect(certificateYear("")).toBe("");
  });

  it("builds options without blanks, newest year first", () => {
    const o = getCertificateFilterOptions(certs);
    expect(o.issuers).toEqual(["American Heart Association", "IBM SkillsBuild"]);
    expect(o.topics).toEqual(["AI & ML", "Hackathons", "Health & Safety"]);
    expect(o.years).toEqual(["2026", "2025"]);
  });
});
