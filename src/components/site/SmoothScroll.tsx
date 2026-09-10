import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-motion";

/**
 * Inertial smooth scrolling. Mounted once at the root; disabled entirely
 * when the user prefers reduced motion or is on a coarse pointer.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let destroyed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let instance: any;

    void import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      instance = new Lenis({ duration: 1.05, smoothWheel: true });
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      instance?.destroy?.();
    };
  }, [reduced]);

  return null;
}
