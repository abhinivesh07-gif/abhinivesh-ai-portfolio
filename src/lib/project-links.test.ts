import { describe, expect, it } from "vitest";
import { isValidDownloadUrl } from "./project-links";

describe("isValidDownloadUrl", () => {
  it("hides the APK button when no link is set", () => {
    expect(isValidDownloadUrl("")).toBe(false);
    expect(isValidDownloadUrl("   ")).toBe(false);
    expect(isValidDownloadUrl(undefined)).toBe(false);
  });

  it("accepts a secure https APK link", () => {
    expect(isValidDownloadUrl("https://github.com/abhinivesh07-gif/smart_study_planner/releases/download/v1/app.apk")).toBe(true);
  });

  it("rejects insecure or malformed links", () => {
    expect(isValidDownloadUrl("http://example.com/app.apk")).toBe(false);
    expect(isValidDownloadUrl("app.apk")).toBe(false);
    expect(isValidDownloadUrl("javascript:alert(1)")).toBe(false);
  });
});
