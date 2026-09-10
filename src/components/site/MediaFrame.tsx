import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/data/portfolio";
import { useInView, useReducedMotion } from "@/hooks/use-motion";

const aspectClass: Record<NonNullable<MediaItem["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  video: "aspect-video",
  wide: "aspect-[16/9]",
};

/**
 * Media frame with a mask reveal on entry and hover-preview behaviour.
 * Renders a real asset when `src` is set, and a premium placeholder while
 * the real reel, screenshot or photograph is pending.
 */
export function MediaFrame({
  media,
  className,
  rounded = true,
  priority = false,
}: {
  media: MediaItem;
  className?: string;
  rounded?: boolean;
  priority?: boolean;
}) {
  const aspect = aspectClass[media.aspect ?? "video"];
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Touch devices have no hover: autoplay muted when the frame is visible.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: none)").matches) return;
    const video = videoRef.current;
    if (!video) return;
    if (inView && !reduced) {
      void video.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [inView, reduced, media.src]);

  const revealed = reduced || inView;

  return (
    <figure
      ref={ref}
      className={cn("group/media w-full", className)}
      onPointerEnter={() => {
        setHovered(true);
        if (!reduced) void videoRef.current?.play().catch(() => undefined);
      }}
      onPointerLeave={() => {
        setHovered(false);
        videoRef.current?.pause();
      }}
      onClick={() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
          void video.play().then(() => setPlaying(true)).catch(() => undefined);
        } else {
          video.pause();
          setPlaying(false);
        }
      }}
    >
      <div
        className={cn(
          "media-reveal relative w-full overflow-hidden border border-border bg-surface",
          rounded && "rounded-lg",
          aspect,
        )}
        data-visible={revealed ? "true" : "false"}
      >
        {media.src ? (
          media.type === "video" ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:scale-[1.04]"
              src={media.src}
              poster={media.poster}
              muted={muted}
              loop
              playsInline
              preload={priority ? "metadata" : "none"}
              controls={false}
              aria-label={media.alt}
              onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
            />
          ) : (
            <img
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:scale-[1.04]"
              src={media.src}
              alt={media.alt}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={priority ? "high" : "auto"}
            />
          )
        ) : (
          <div className="media-placeholder absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-all duration-500",
                "group-hover/media:scale-110 group-hover/media:border-foreground/30",
              )}
            >
              {media.type === "video" ? (
                <Play className="h-4 w-4 translate-x-px text-foreground" aria-hidden="true" />
              ) : (
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-foreground" />
              )}
            </span>
            <span className="eyebrow">{media.type === "video" ? "Reel · pending" : "Image · pending"}</span>
            <span className="max-w-[26ch] text-xs leading-relaxed text-muted-foreground">
              {media.alt}
            </span>
          </div>
        )}

        {media.type === "video" && media.src ? (
          <button
            type="button"
            aria-label={muted ? "Unmute video" : "Mute video"}
            title={muted ? "Turn sound on" : "Mute sound"}
            className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-sm transition-opacity hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white/60"
            onClick={(event) => {
              event.stopPropagation();
              const video = videoRef.current;
              if (!video) return;
              const nextMuted = !video.muted;
              video.muted = nextMuted;
              setMuted(nextMuted);
              if (video.paused) {
                void video.play().then(() => setPlaying(true)).catch(() => undefined);
              }
            }}
          >
            {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
          </button>
        ) : null}

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/media:opacity-100"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--foreground) 12%, transparent), transparent 45%)",
          }}
        />
      </div>
      {media.caption ? (
        <figcaption className="mt-3 text-xs text-muted-foreground">{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}
