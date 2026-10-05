"use client";

import { ChevronLeft, ChevronRight, Expand, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AutoplayVideo } from "./AutoplayVideo";
import { SectionHeading } from "./SectionHeading";
import {
  type Clip,
  type GalleryPhoto,
  galleryPhotos,
  horizontalClips,
  reelClips,
} from "./galleryVideos";

export function Gallery() {
  const [active, setActive] = useState<Clip | null>(null);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [activeMuted, setActiveMuted] = useState(true);
  const activeVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!active && !activePhoto) return;
    setActiveMuted(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        setActivePhoto(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, activePhoto]);

  return (
    <section id="gallery" className="scroll-mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="text-center md:text-left">
          <SectionHeading
            large
            eyebrow="Sample work"
            title="Formats exhibitors publish."
            body="Small previews first. Tap any clip or photo to enlarge and check if it fits your stand."
          />
        </div>

        <div className="mt-5 space-y-6">
          <PhotoCarousel
            label="Exhibition photos"
            sizeLabel="Still photography"
            hint="1 row · slide to browse · tap to enlarge"
            photos={galleryPhotos}
            onOpen={setActivePhoto}
          />
          <ClipCarousel
            label="Vertical Instagram reels"
            sizeLabel="9:16 · 1080×1920"
            hint="4 at a time · 2 rows on mobile · tap to enlarge"
            clips={reelClips}
            orientation="vertical"
            onOpen={setActive}
          />
          <ClipCarousel
            label="Horizontal YouTube videos"
            sizeLabel="16:9 · 1920×1080"
            hint="2–3 at a time · tap to enlarge"
            clips={horizontalClips}
            orientation="horizontal"
            onOpen={setActive}
          />
        </div>
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            aria-label="Close photo"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-white hover:bg-slate-800"
            onClick={() => setActivePhoto(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="aina-media-protect relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            onContextMenu={(event) => event.preventDefault()}
          >
            <div className="relative aspect-[3/2] w-full sm:aspect-[16/10]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                unoptimized
                draggable={false}
                sizes="(min-width: 1024px) 896px, 100vw"
                className="aina-media-protect object-contain"
                onContextMenu={(event) => event.preventDefault()}
              />
            </div>
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-3 py-2 text-sm font-medium text-white">
              {activePhoto.title}
            </p>
          </div>
        </div>
      ) : null}

      {active ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close video"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-white hover:bg-slate-800"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className={`aina-media-protect relative w-full overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl ${
              active.orientation === "horizontal"
                ? "max-w-4xl aspect-video"
                : "max-h-[85vh] max-w-[min(100%,22rem)] aspect-[9/16]"
            }`}
            onClick={(event) => event.stopPropagation()}
            onContextMenu={(event) => event.preventDefault()}
          >
            <video
              key={active.src}
              ref={activeVideoRef}
              src={active.src}
              autoPlay
              muted={activeMuted}
              loop
              playsInline
              draggable={false}
              className="aina-media-protect h-full w-full object-contain"
              onContextMenu={(event) => event.preventDefault()}
              onLoadedData={() => {
                void activeVideoRef.current?.play().catch(() => undefined);
              }}
            />
            <button
              type="button"
              aria-label={activeMuted ? "Unmute video" : "Mute video"}
              onClick={() => {
                setActiveMuted((value) => {
                  const next = !value;
                  if (activeVideoRef.current) {
                    activeVideoRef.current.muted = next;
                    void activeVideoRef.current.play().catch(() => undefined);
                  }
                  return next;
                });
              }}
              className="absolute top-1/2 right-3 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-white backdrop-blur-sm hover:bg-slate-900"
            >
              {activeMuted ? (
                <VolumeX className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Volume2 className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-3 py-2 text-sm font-medium text-white">
              {active.title}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function PhotoCarousel({
  label,
  sizeLabel,
  hint,
  photos,
  onOpen,
}: {
  label: string;
  sizeLabel: string;
  hint: string;
  photos: GalleryPhoto[];
  onOpen: (photo: GalleryPhoto) => void;
}) {
  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 900) setPerPage(4);
      else if (window.innerWidth >= 560) setPerPage(3);
      else setPerPage(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pageCount = Math.max(1, Math.ceil(photos.length / perPage));
  const safePage = Math.min(page, pageCount - 1);
  const visible = photos.slice(safePage * perPage, safePage * perPage + perPage);

  useEffect(() => {
    if (page > pageCount - 1) setPage(pageCount - 1);
  }, [page, pageCount]);

  const go = (next: number) => {
    setPage(((next % pageCount) + pageCount) % pageCount);
  };

  return (
    <div>
      <div className="mb-3 flex flex-col items-center gap-2 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-[0.12em] text-amber-300 uppercase">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            Size: {sizeLabel}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">{hint}</p>
        </div>
        {pageCount > 1 ? (
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous photos"
              onClick={() => go(safePage - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="min-w-10 text-center text-[11px] tabular-nums text-slate-400">
              {safePage + 1}/{pageCount}
            </p>
            <button
              type="button"
              aria-label="Next photos"
              onClick={() => go(safePage + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      <div
        key={safePage}
        className="aina-photo-slide grid gap-2"
        style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
      >
        {visible.map((photo) => (
          <div
            key={photo.id}
            role="button"
            tabIndex={0}
            aria-label={`Enlarge ${photo.title}`}
            onClick={() => onOpen(photo)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen(photo);
              }
            }}
            onContextMenu={(event) => event.preventDefault()}
            className="aina-media-protect group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-slate-900 text-left transition-colors hover:border-amber-400/40"
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              unoptimized
              draggable={false}
              sizes="(min-width: 900px) 25vw, (min-width: 560px) 33vw, 50vw"
              className="aina-media-protect object-cover"
              onContextMenu={(event) => event.preventDefault()}
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <span className="pointer-events-none absolute top-1.5 right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white opacity-80 group-hover:opacity-100">
              <Expand className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 truncate px-1.5 py-1.5 text-[11px] font-medium text-white">
              {photo.title}
            </span>
          </div>
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show photo set ${index + 1}`}
              aria-current={index === safePage ? "true" : undefined}
              onClick={() => setPage(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === safePage
                  ? "w-5 bg-amber-300"
                  : "w-1.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ClipCarousel({
  label,
  sizeLabel,
  hint,
  clips,
  orientation,
  onOpen,
}: {
  label: string;
  sizeLabel: string;
  hint: string;
  clips: Clip[];
  orientation: "vertical" | "horizontal";
  onOpen: (clip: Clip) => void;
}) {
  const [perPage, setPerPage] = useState(orientation === "vertical" ? 4 : 3);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const update = () => {
      if (orientation === "vertical") {
        setPerPage(4);
        return;
      }
      if (window.innerWidth >= 900) setPerPage(3);
      else if (window.innerWidth >= 560) setPerPage(2);
      else setPerPage(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [orientation]);

  const pageCount = Math.max(1, Math.ceil(clips.length / perPage));
  const safePage = Math.min(page, pageCount - 1);
  const visible = clips.slice(safePage * perPage, safePage * perPage + perPage);

  useEffect(() => {
    if (page > pageCount - 1) setPage(pageCount - 1);
  }, [page, pageCount]);

  const go = (next: number) => {
    setPage(((next % pageCount) + pageCount) % pageCount);
  };

  return (
    <div>
      <div className="mb-3 flex flex-col items-center gap-2 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-[0.12em] text-amber-300 uppercase">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            Size: {sizeLabel}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">{hint}</p>
        </div>
        {pageCount > 1 ? (
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous clips"
              onClick={() => go(safePage - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="min-w-10 text-center text-[11px] tabular-nums text-slate-400">
              {safePage + 1}/{pageCount}
            </p>
            <button
              type="button"
              aria-label="Next clips"
              onClick={() => go(safePage + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      <div
        className={
          orientation === "vertical"
            ? "mx-auto grid w-fit grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center lg:justify-start"
            : "grid gap-2"
        }
        style={
          orientation === "horizontal"
            ? { gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }
            : undefined
        }
      >
        {visible.map((clip) => (
          <div
            key={clip.id}
            role="button"
            tabIndex={0}
            aria-label={`Enlarge ${clip.title}`}
            onClick={() => onOpen(clip)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen(clip);
              }
            }}
            onContextMenu={(event) => event.preventDefault()}
            className={`aina-media-protect group relative cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-slate-900 text-left transition-colors hover:border-amber-400/40 ${
              orientation === "vertical"
                ? "h-[15rem] w-[8.5rem] shrink-0 md:h-[18rem] md:w-[10.125rem]"
                : "aspect-video w-full"
            }`}
          >
            <AutoplayVideo
              src={clip.src}
              aria-label={clip.title}
              showMuteControl
              className="h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <span className="pointer-events-none absolute top-1.5 left-1.5 rounded-full border border-white/15 bg-slate-950/70 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-amber-200">
              {orientation === "vertical" ? "9:16" : "16:9"}
            </span>
            <span className="pointer-events-none absolute top-1.5 right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white opacity-80 group-hover:opacity-100">
              <Expand className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 truncate px-1.5 py-1.5 text-[11px] font-medium text-white">
              {clip.title}
            </span>
          </div>
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show clip set ${index + 1}`}
              aria-current={index === safePage ? "true" : undefined}
              onClick={() => setPage(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === safePage
                  ? "w-5 bg-amber-300"
                  : "w-1.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
