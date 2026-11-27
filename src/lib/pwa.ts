const SW_PATH = "/sw.js";

function isRefusedContext(): boolean {
  if (!import.meta.env.PROD) return true;
  if (window.self !== window.top) return true;
  const host = window.location.hostname.toLowerCase();
  const label = host.split(".")[0] ?? "";
  const lovableHost = [".lovable.app", ".gpt-eng.com", ".gptengineer.run"].some((d) => host.endsWith(d));
  if (lovableHost && /^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/.test(label)) return true;
  if (lovableHost && /^project--.+-dev$/.test(label)) return true;
  for (const d of ["lovableproject.com", "lovableproject-dev.com", "beta.lovable.dev"]) {
    if (host === d || host.endsWith(`.${d}`)) return true;
  }
  return new URLSearchParams(window.location.search).get("sw") === "off";
}

async function unregisterAppWorkers() {
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    regs.filter((r) => (r.active ?? r.waiting ?? r.installing)?.scriptURL.endsWith(SW_PATH)).map((r) => r.unregister()),
  );
}

/** Only registrar for the app service worker. Call from useEffect. */
export function setupServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  if (isRefusedContext()) { void unregisterAppWorkers(); return; }
  void navigator.serviceWorker.register(SW_PATH, { scope: "/" });
}
