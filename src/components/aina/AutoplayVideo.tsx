"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AutoplayVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
  "aria-label"?: string;
  showMuteControl?: boolean;
};

export function AutoplayVideo({
  src,
  poster,
  className,
  preload = "metadata",
  "aria-label": ariaLabel = "Sample video",
  showMuteControl = false,
}: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    setMuted(true);
    const play = () => {
      void video.play().catch(() => {
        // Autoplay can be blocked until the page is interacted with.
      });
    };
    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, [src]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  return (
    <div className="aina-media-protect absolute inset-0">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload={preload}
        draggable={false}
        onContextMenu={(event) => event.preventDefault()}
        aria-label={ariaLabel}
        className={`aina-media-protect ${className ?? "h-full w-full object-cover"}`}
      />
      {showMuteControl ? (
        <button
          type="button"
          aria-label={muted ? "Unmute video" : "Mute video"}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setMuted((value) => !value);
          }}
          className="absolute top-1/2 right-1.5 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-slate-950/80 text-white shadow-md backdrop-blur-sm hover:bg-slate-900"
        >
          {muted ? (
            <VolumeX className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      ) : null}
    </div>
  );
}
