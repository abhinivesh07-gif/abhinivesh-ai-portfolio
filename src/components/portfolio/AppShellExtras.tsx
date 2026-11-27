import { useEffect, useState } from "react";
import { Download, WifiOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setupServiceWorker } from "@/lib/pwa";

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function AppShellExtras() {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(true);
  const [help, setHelp] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setupServiceWorker();
    setInstalled(window.matchMedia("(display-mode: standalone)").matches);
    setOffline(!navigator.onLine);
    const onPrompt = (e: Event) => { e.preventDefault(); setDeferred(e as InstallEvent); };
    const onInstalled = () => { setInstalled(true); setDeferred(null); };
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const install = async () => {
    if (!deferred) { setHelp(true); return; }
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  return (
    <>
      {offline && (
        <div role="status" className="glass-strong fixed inset-x-3 top-20 z-[60] mx-auto flex max-w-md items-center gap-3 rounded-2xl px-4 py-3 text-sm text-foreground">
          <WifiOff className="size-4 shrink-0 text-cyan" />
          You're offline — showing the saved version of this portfolio.
        </div>
      )}
      {!installed && (
        <Button variant="hero" size="pill" onClick={install} className="fixed bottom-5 left-5 z-[60] h-10 px-4 text-[0.82rem]" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
          <Download /> Install App
        </Button>
      )}
      {help && (
        <div role="dialog" aria-modal="true" aria-labelledby="install-help" className="fixed inset-0 z-[110] grid place-items-center bg-background/80 p-5 backdrop-blur-sm" onClick={() => setHelp(false)}>
          <div className="glass-strong relative w-full max-w-sm rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" aria-label="Close" className="absolute right-2 top-2" onClick={() => setHelp(false)}><X /></Button>
            <h2 id="install-help" className="font-display text-lg font-semibold text-foreground">Install this app</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <li><span className="font-semibold text-foreground">Android (Chrome):</span> tap the ⋮ menu, then "Install app" or "Add to Home screen".</li>
              <li><span className="font-semibold text-foreground">iPhone (Safari):</span> tap Share, then "Add to Home Screen".</li>
              <li><span className="font-semibold text-foreground">Desktop (Chrome/Edge):</span> click the install icon in the address bar.</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
