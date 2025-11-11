import { useEffect, useRef } from "react";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

interface ImageViewerProps {
  images: string[]; // array of image URLs
  className?: string;
  options?: Viewer.Options; // optional viewerjs config
}

/**
 * Reusable Image Viewer Component
 * 
 * Example:
 * <ImageViewer images={["/a.jpg", "/b.jpg"]} />
 */
export default function ImageViewer({ images, className, options }: ImageViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      viewerRef.current = new Viewer(containerRef.current, {
        toolbar: true,
        title: false,
        navbar: false,
        movable: true,
        zoomable: true,
        fullscreen: true,
        ...options,
      });
    }

    return () => {
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, [options]);

  return (
    <div ref={containerRef} className={`columns-3 gap-2 ${className || ""}`}>
      {images.map((src, i) => (
        <div key={i} className="overflow-hidden rounded-lg mt-2 shadow-sm cursor-zoom-in">
          <img
            src={src}
            alt={`Image ${i + 1}`}
            className="w-full  object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
}
