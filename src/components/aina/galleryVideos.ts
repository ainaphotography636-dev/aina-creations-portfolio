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

function clip(
  filename: string,
  orientation: "vertical" | "horizontal",
  title?: string,
): Clip {
  const src = `/Videos/${encodeURIComponent(filename)}`;
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
    src: `/images/gallery/${encodeURIComponent(filename)}`,
  };
}

/** Still photos from public/images/gallery — one-row slider above reels. */
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

/** Prefer the lighter mp4; skip the duplicate 0130.mov. */
export const reelClips: Clip[] = [
  clip("0130.mp4", "vertical", "Exhibition reel"),
  clip("0129.mov", "vertical", "Stand coverage reel"),
  clip("acs25.mov", "vertical", "Event reel"),
  clip("day3.mov", "vertical", "Floor reel"),
  clip("Prie.mov", "vertical", "Prime reel"),
  clip("Star.mov", "vertical", "Star reel"),
  clip("reel prime.mov", "vertical", "Reel prime"),
  clip("0128.mov", "vertical", "Reel 1"),
  clip("reel3 gff.mov", "vertical", "Reel 3"),
  clip("reel 5 gf.mov", "vertical", "Reel 5"),
  clip(
    "Technology & Innovation in food safety reel.mov",
    "vertical",
    "Food safety reel",
  ),
];

export const horizontalClips: Clip[] = [
  clip("Ardeco day1.mov", "horizontal", "Ardeco day 1"),
  clip("dynatrade 1.mov", "horizontal", "Dynatrade 1"),
  clip("Vinno @ Arab Health 2025.mp4", "horizontal", "Vinno Arab Health"),
  clip("sprint 1.mov", "horizontal", "Sprint 1"),
  clip("HIghlight1 GFF.mov", "horizontal", "Highlight GFF"),
];
