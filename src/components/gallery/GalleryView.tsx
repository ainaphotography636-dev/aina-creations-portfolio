"use client";

import { Media, MasonryGrid } from "@once-ui-system/core";
import type { MouseEvent } from "react";
import { gallery } from "@/resources";

function blockContextMenu(event: MouseEvent) {
  event.preventDefault();
}

export default function GalleryView() {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => (
        <div
          key={image.src}
          className="aina-media-protect relative"
          onContextMenu={blockContextMenu}
        >
          <Media
            enlarge
            unoptimized
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            radius="m"
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={image.src}
            alt={image.alt}
            onContextMenu={blockContextMenu}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10"
            onContextMenu={blockContextMenu}
            onDragStart={(event) => event.preventDefault()}
            onPointerUp={(event) => {
              if (event.button !== 0) return;
              const img = event.currentTarget.parentElement?.querySelector("img");
              img?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
            }}
          />
        </div>
      ))}
    </MasonryGrid>
  );
}
