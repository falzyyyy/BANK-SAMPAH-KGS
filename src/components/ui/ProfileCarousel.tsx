"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProfileCarouselProps {
  images: string[];
}

export default function ProfileCarousel({ images }: ProfileCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[420px] rounded-sm overflow-hidden shadow-lg group border border-neutral-100 dark:border-neutral-800">
      {/* Slides */}
      {images.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img}
            alt={`Kegiatan Bank Sampah KGS ${idx + 1}`}
            fill
            sizes="(max-w-768px) 100vw, 50vw"
            priority={idx === 0}
            className="object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
        </div>
      ))}

      {/* Manual Dots Navigation */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIdx === idx
                ? "bg-[#2d6a4f] w-6"
                : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Buka slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
