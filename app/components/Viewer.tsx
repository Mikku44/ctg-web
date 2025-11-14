import { useEffect, useRef, useState } from "react";
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

    const [currentIndex, setCurrentIndex] = useState(0);

    if (images.length === 0) return null;

    return (
        <div ref={containerRef} className={`w-full  ${className || ""}`}>
            {images.map((src, idx) => (
                <div
                    key={idx}
                    className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${currentIndex === idx ? "border-emerald-500" : "border-transparent"
                        }`}
                    onClick={() => setCurrentIndex(idx)}
                >
                    <img
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                </div>
            ))}
        </div>
    );
}
