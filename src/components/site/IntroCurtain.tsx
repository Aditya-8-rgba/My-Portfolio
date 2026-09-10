import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

/**
 * Refined first-load sequence: a white curtain holding the wordmark,
 * lifting once the app has hydrated. Skipped for reduced motion.
 */
export function IntroCurtain() {
  const [done, setDone] = useState(false);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    if (sessionStorage.getItem("intro-played")) {
      setDone(true);
      return;
    }
    sessionStorage.setItem("intro-played", "1");
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setLifting(true), 900);
    const t2 = setTimeout(() => {
      setDone(true);
      document.documentElement.style.overflow = "";
    }, 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-[clip-path,opacity] duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        clipPath: lifting ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
      }}
    >
      <div
        className="overflow-hidden"
        style={{
          opacity: lifting ? 0 : 1,
          transition: "opacity 400ms ease-out",
        }}
      >
        <span className="display block animate-[intro-rise_800ms_cubic-bezier(0.16,1,0.3,1)_both] text-2xl sm:text-4xl">
          {profile.name}
        </span>
      </div>
    </div>
  );
}
