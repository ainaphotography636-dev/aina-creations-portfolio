export type Clip = {
  id: string;
  title: string;
  src: string;
  orientation: "vertical" | "horizontal";
};

export type GalleryPhoto = {
  id: string;
  title: string;
  src: string;
};

/** Public Cloudflare R2 bucket. Gallery photos and videos are stored here, not in the repo. */
export const MEDIA_BASE_URL = "https://pub-ab0998a4fe7f4f52be6a61debd869993.r2.dev";

function mediaSrc(path: string) {
  return `${MEDIA_BASE_URL}/${path}`;
}

function clip(filename: string, orientation: "vertical" | "horizontal", title?: string): Clip {
  const src = mediaSrc(`Videos/${encodeURIComponent(filename)}`);
  const fallback = filename
    .replace(/\.(mp4|mov|webm|m4v)$/i, "")
    .replace(/[_@]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    id: `${orientation}-${filename}`,
    title: title ?? fallback,
    src,
    orientation,
  };
}

function photo(filename: string, title: string): GalleryPhoto {
  return {
    id: `photo-${filename}`,
    title,
    src: mediaSrc(`Photos/${encodeURIComponent(filename)}`),
  };
}

/** Still photos in the R2 Photos/ folder — one-row slider above reels. */
export const galleryPhotos: GalleryPhoto[] = [
  photo("DSC04629.jpg", "Exhibition floor"),
  photo("DSC04697.jpg", "Stand coverage"),
  photo("DSC04998.jpg", "Booth detail"),
  photo("DSC05000.jpg", "Show floor"),
  photo("DSC05181.jpg", "Visitor moment"),
  photo("DSC05411.jpg", "Brand presence"),
  photo("GSK04338.jpg", "Hall view"),
  photo("GSK04342.jpg", "Crowd energy"),
  photo("GSK04370.jpg", "Live program"),
  photo("GSK04395.jpg", "Stage moment"),
];

export const reelClips: Clip[] = [
  clip("0130.mp4", "vertical", "Exhibition reel"),
  clip("0129.mp4", "vertical", "Stand coverage reel"),
  clip("acs25.mp4", "vertical", "Event reel"),
  clip("day3.mp4", "vertical", "Floor reel"),
  clip("Prie.mp4", "vertical", "Prime reel"),
  clip("Star.mp4", "vertical", "Star reel"),
  clip("reel prime.mp4", "vertical", "Reel prime"),
  clip("0128.mp4", "vertical", "Reel 1"),
  clip("reel3 gff.mp4", "vertical", "Reel 3"),
  clip("reel 5 gf.mp4", "vertical", "Reel 5"),
  clip("Technology & Innovation in food safety reel.mp4", "vertical", "Food safety reel"),
];

export const horizontalClips: Clip[] = [
  clip("Ardeco day1.mp4", "horizontal", "Ardeco day 1"),
  clip("dynatrade 1.mp4", "horizontal", "Dynatrade 1"),
  clip("Vinno @ Arab Health 2025_1.mp4", "horizontal", "Vinno Arab Health"),
  clip("sprint 1.mp4", "horizontal", "Sprint 1"),
  clip("HIghlight1 GFF.mp4", "horizontal", "Highlight GFF"),
];
