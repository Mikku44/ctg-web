import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

export default function AutoFadeImage({
  images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
  ],
  interval = 3000,
  titles = [
    'Mountain Serenity',
    'Urban Nights',
    'Forest Pathway',
    'Misty Mountains',
  ],
  descriptions = [
    'Breathtaking views from the peaks',
    'The city comes alive after dark',
    'A journey through nature',
    'Where earth meets sky',
  ],
}: {
  images?: string[];
  interval?: number;
  titles?: string[];
  descriptions?: string[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(Date.now());
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to current index
  const scrollIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, images.length - 1]
  );

  // Auto slide functionality
  const startAutoSlide = () => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    autoSlideTimerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [interval, images.length]);

  // Listen to scroll progress changes
  useEffect(() => {
    const unsubscribe = scrollIndex.on('change', (latest) => {
      const newIndex = Math.round(latest);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        setDirection(newIndex > currentIndex ? 1 : -1);
        setCurrentIndex(newIndex);
        startAutoSlide();
      }
    });

    return () => unsubscribe();
  }, [currentIndex, images.length]);

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
    }),
    center: {
      opacity: 1,
    },
    exit: (direction: number) => ({
      opacity: 1,
    }),
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    startAutoSlide();
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    startAutoSlide();
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Preload all images */}
      {images.map((image, index) => (
        <img
          key={`preload-${index}`}
          src={image}
          alt=""
          className="hidden"
          loading="eager"
        />
      ))}

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Text Overlay - Left Center */}
      <div className="absolute left-0 md:bottom-1/2 bottom-10 md:translate-y-1/2 -translate-y-1/2 z-20 max-w-xl pl-8 md:pl-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-white md:ml-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              {titles[currentIndex] || `Image ${currentIndex + 1}`}
            </h2>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
              {descriptions[currentIndex] || ''}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
        aria-label="Previous image"
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
        aria-label="Next image"
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 h-10 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              startAutoSlide();
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-8 right-8 text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full z-10">
        {currentIndex + 1} / {images.length}
      </div>
    </section>
  );
}