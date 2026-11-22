/**
 * Returns true when `url` is a usable public download link (absolute https URL).
 * Used to decide whether the "Download APK" button on a project card is shown.
 */
export function isValidDownloadUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" && parsed.hostname.includes(".");
  } catch {
    return false;
  }
}
