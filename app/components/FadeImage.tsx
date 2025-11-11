"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
  "/logo/logo.jpg",
  "/images/thailand3 (1).jpg",
  "/images/thailand3 (2).jpg",
  "/images/thailand3 (3).jpg",
  "/images/thailand3 (4).jpg",
  "/images/thailand3 (5).jpg",
];

export default function FadeImageSlideshow() {
  const [index, setIndex] = useState(0);

  // Cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-xl  bg-black md:h-[500px] md:w-[500px] h-[250px] w-[90vw] overflow-hidden">
      {/* Preload images */}
      {images.map((item) => (
        <img key={item} src={item} className="hidden" alt="" />
      ))}

      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Slideshow image ${index + 1}`}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.6, // smoother fade
            ease: [1, 0, 0.2, 1], // soft cubic-bezier easing
          }}
        />
      </AnimatePresence>
    </div>
  );
}
