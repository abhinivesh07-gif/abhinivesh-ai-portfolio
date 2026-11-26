import { useEffect, useRef } from "react";

/** Bounded canvas animation; never draws while offscreen or in a hidden tab. */
export function ParticleScene({ burst = false }: { burst?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const start = performance.now();
    const colors = getComputedStyle(canvas);
    const cyan = colors.getPropertyValue("--cyan").trim();
    const electric = colors.getPropertyValue("--electric").trim();
    const violet = colors.getPropertyValue("--violet").trim();
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now: number) => {
      if (visible && !document.hidden) {
        ctx.clearRect(0, 0, width, height);
        const t = (now - start) / 1000;
        const count = width < 600 ? 64 : 110;
        const radius = Math.min(width * 0.42, height * 0.4);
        const expansion = burst ? Math.min(1, Math.max(0, (t - 0.35) / 0.9)) : 1;
        const points: { x: number; y: number }[] = [];
        for (let i = 0; i < count; i++) {
          const angle = i * 2.39996 + (burst ? 0 : t * 0.06);
          const depth = Math.sin(i * 1.73 + t * 0.17);
          const distance = radius * Math.sqrt((i + 1) / count) * expansion;
          const x = width / 2 + Math.cos(angle) * distance;
          const y = height / 2 + Math.sin(angle) * distance * (burst ? 0.7 : 0.8);
          points.push({ x, y });
          ctx.globalAlpha = burst ? Math.max(0.15, 1 - t / 4.5) : 0.3 + (depth + 1) * 0.2;
          ctx.fillStyle = i % 3 === 0 ? violet : i % 2 === 0 ? electric : cyan;
          ctx.beginPath();
          ctx.arc(x, y, burst ? 1.4 : 1.1 + (depth + 1) * 0.6, 0, Math.PI * 2);
          ctx.fill();
          const previous = points[i - 7];
          if (previous && i % 2 === 0) {
            ctx.globalAlpha *= 0.25;
            ctx.strokeStyle = cyan;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(previous.x, previous.y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
        if (burst && t < 1.65) {
          ctx.globalAlpha = Math.max(0, 1 - t / 1.65);
          ctx.strokeStyle = cyan;
          ctx.shadowColor = cyan;
          ctx.shadowBlur = 18;
          ctx.lineWidth = 1.5;
          for (let ray = 0; ray < 7; ray++) {
            ctx.beginPath();
            ctx.moveTo(width / 2, height / 2);
            for (let step = 1; step < 9; step++) {
              const angle = ray * Math.PI * 2 / 7 + Math.sin(step * 8 + t * 10) * 0.09;
              ctx.lineTo(width / 2 + Math.cos(angle) * radius * expansion * step / 8,
                height / 2 + Math.sin(angle) * radius * expansion * step / 8);
            }
            ctx.stroke();
          }
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
      }
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
    intersection.observe(canvas);
    frame = requestAnimationFrame(draw);
    const onMotion = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
    reduced.addEventListener("change", onMotion);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      reduced.removeEventListener("change", onMotion);
    };
  }, [burst]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />;
}