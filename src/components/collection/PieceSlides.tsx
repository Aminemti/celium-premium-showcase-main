import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { resolveImage } from "@/data/collection";

type PieceSlidesProps = {
  images: string[];
  alt: string;
};

export function PieceSlides({ images, alt }: PieceSlidesProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const current = count ? index % count : 0;

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (count < 2) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((value) => (value - 1 + count) % count);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((value) => (value + 1) % count);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  const go = (direction: -1 | 1) => {
    if (count < 2) return;
    setIndex((value) => (value + direction + count) % count);
  };

  if (!count) {
    return <div className="h-[320px] bg-cream md:h-[520px]" />;
  }

  return (
    <div
      className="relative h-[320px] overflow-hidden bg-cream md:h-[520px]"
      onPointerDown={(event) => {
        event.currentTarget.dataset.startX = String(event.clientX);
      }}
      onPointerUp={(event) => {
        const start = Number(event.currentTarget.dataset.startX || event.clientX);
        const delta = event.clientX - start;
        if (delta > 48) go(-1);
        if (delta < -48) go(1);
      }}
    >
      <motion.img
        key={`${current}-${images[current]}`}
        src={resolveImage(images[current])}
        alt={`${alt}, photograph ${current + 1} of ${count}`}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="h-full w-full object-contain object-center"
        draggable={false}
      />

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photograph"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/90 text-primary p-2 hover:bg-background transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next photograph"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/90 text-primary p-2 hover:bg-background transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-background/85 px-3 py-2">
              {images.map((image, imageIndex) => (
                <button
                  key={`${image}-${imageIndex}`}
                  type="button"
                  aria-label={`Photograph ${imageIndex + 1}`}
                  onClick={() => setIndex(imageIndex)}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    imageIndex === current ? "bg-primary" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
