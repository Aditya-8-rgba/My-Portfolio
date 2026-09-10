import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Tasteful cross-page transition: content settles in on each route change. */
export function PageFade({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}
