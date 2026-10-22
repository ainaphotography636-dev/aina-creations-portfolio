"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AutoplayVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  "aria-label"?: string;
  showMuteControl?: boolean;
};

export function AutoplayVideo({
  src,
  poster,
  className,
  "aria-label": ariaLabel = "Sample video",
  showMuteControl = false,
}: AutoplayVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "120px 0px", threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!inView) {
      video.pause();
      setReady(false);
      return;
    }
    const play = () => {
      void video.play().catch(() => {
        // Autoplay can be blocked until the page is interacted with.
      });
    };
    if (video.readyState >= 2) setReady(true);
    video.addEventListener("loadeddata", play);
    play();
    return () => video.removeEventListener("loadeddata", play);
  }, [inView, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  return (
    <div ref={rootRef} className="aina-media-protect absolute inset-0 bg-slate-900">
      {poster && !ready ? (
        <img
          src={poster}
          alt=""
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
          className="aina-media-protect absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <video
        ref={videoRef}
        src={inView ? src : undefined}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload={inView ? "metadata" : "none"}
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        draggable={false}
        onLoadedData={() => setReady(true)}
        onPlaying={() => setReady(true)}
        onContextMenu={(event) => event.preventDefault()}
        aria-label={ariaLabel}
        className={`aina-media-protect h-full w-full object-cover ${className ?? ""}`}
      />
      {ready ? null : (
        <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-950/75 text-white shadow-md">
            <Play className="h-4 w-4" aria-hidden="true" />
          </span>
        </span>
      )}
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
