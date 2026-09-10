import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/data/portfolio";
import { MediaFrame } from "@/components/site/MediaFrame";

/**
 * Campaign media carousel.
 *
 * Features:
 * - Horizontal swipe/scroll
 * - Previous / Next buttons
 * - Buttons wrap around continuously
 * - Dot navigation
 * - Keyboard navigation
 * - Touch friendly
 */
export function MediaCarousel({
  items,
  className,
}: {
  items: MediaItem[];
  className?: string;
}) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    // Keep the index inside the valid range.
    const normalized =
      ((index % items.length) + items.length) % items.length;

    const child = track.children[normalized] as HTMLElement | undefined;
    if (!child) return;

    track.scrollTo({
      left: child.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });

    setActive(normalized);
  }, [items.length]);

  const goPrevious = useCallback(() => {
    if (items.length === 0) return;

    const previous =
      active === 0 ? items.length - 1 : active - 1;

    scrollToIndex(previous);
  }, [active, items.length, scrollToIndex]);

  const goNext = useCallback(() => {
    if (items.length === 0) return;

    const next =
      active === items.length - 1 ? 0 : active + 1;

    scrollToIndex(next);
  }, [active, items.length, scrollToIndex]);

  // Keep the active dot synchronized with manual scrolling/swiping.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];

        if (children.length === 0) return;

        const center =
          track.scrollLeft + track.clientWidth / 2;

        let nearest = 0;
        let best = Number.POSITIVE_INFINITY;

        children.forEach((child, i) => {
          const childCenter =
            child.offsetLeft -
            track.offsetLeft +
            child.clientWidth / 2;

          const distance = Math.abs(childCenter - center);

          if (distance < best) {
            best = distance;
            nearest = i;
          }
        });

        setActive(nearest);
      });
    };

    track.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (items.length === 0) {
    return null;
  }

  // A single asset does not need carousel controls.
  if (items.length === 1) {
    const only = items[0];
    const narrow =
      only.aspect === "portrait" ||
      only.aspect === "square";

    return (
      <div
        className={cn(
          "relative",
          narrow && "max-w-md",
          className,
        )}
      >
        <MediaFrame media={only} />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Campaign media carousel"
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 sm:mx-0 sm:px-0"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goNext();
          }

          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goPrevious();
          }
        }}
      >
        {items.map((media, index) => (
          <li
            key={`${media.alt}-${index}`}
            className="w-[82%] shrink-0 snap-center sm:w-[58%] lg:w-[46%]"
          >
            <MediaFrame media={media} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-6">
        {/* Slide indicators */}
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Media slides"
        >
          {items.map((media, index) => (
            <button
              key={`dot-${media.alt}-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                active === index
                  ? "w-8 bg-foreground"
                  : "w-3 bg-border hover:bg-foreground/40",
              )}
            />
          ))}
        </div>

        {/* Previous / Next */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            title="Previous slide"
            onClick={goPrevious}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors duration-500 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            title="Next slide"
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors duration-500 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}