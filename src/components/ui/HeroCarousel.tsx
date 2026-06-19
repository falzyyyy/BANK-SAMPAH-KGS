"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type HeroSlide = {
  id: number;
  image_url: string;
  slogan: string;
  sub: string;
};

const fallbackSlides: HeroSlide[] = [
  {
    id: 1,
    image_url: "/images/hero_section/hs_1.jpg",
    slogan: "Peduli Lingkungan\nBukan Pilihan,\nTapi Kewajiban.",
    sub: "Bersama Bank Sampah KGS Palembang, ubah sampah menjadi nilai ekonomi nyata untuk keluarga dan lingkungan.",
  },
  {
    id: 2,
    image_url: "/images/hero_section/hs_2.jpg",
    slogan: "Satu Langkahmu\nMemilah Sampah,\nSeribu Manfaat\nUntuk Bumi.",
    sub: "Memilah sampah hari ini adalah investasi terbaik untuk kelestarian bumi dan masa depan kita.",
  },
  {
    id: 3,
    image_url: "/images/hero_section/hs_3.jpg",
    slogan: "Menyelamatkan\nSampah Hari Ini,\nMenyelamatkan\nBumi Esok Hari.",
    sub: "Setiap tindakan kecil memilah sampah adalah wujud nyata kepedulian Anda terhadap ekosistem global.",
  },
  {
    id: 4,
    image_url: "/images/hero_section/hs_1.jpg",
    slogan: "From Waste to\nEmpower\nEach Other.",
    sub: "Membangun ekosistem ekonomi sirkular yang kuat dan berkelanjutan demi memberdayakan masyarakat.",
  },
];

export default function HeroCarousel({ slides = fallbackSlides }: { slides?: HeroSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeSlides = slides.length > 0 ? slides : fallbackSlides;
  const SLIDE_DURATION = 6000;

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((currentSlide + 1) % activeSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [currentSlide, activeSlides.length, goToSlide]);

  // Progress bar
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / (SLIDE_DURATION / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden bg-[#1a1a2e]">
      {/* Slides */}
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === currentSlide ? (isTransitioning ? 0 : 1) : 0 }}
        >
          {/* Image */}
          <Image
            src={slide.image_url}
            alt={slide.slogan}
            fill
            className="object-cover scale-105"
            style={{
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 8s ease-out',
            }}
            priority={index === 0}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-end pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div
            key={currentSlide}
            className="max-w-3xl animate-fade-up"
          >
            <div className="mb-4">
              <span className="label-tag text-[#95d5b2] border-[#95d5b2] inline-block animate-slide-right">
                Bank Sampah KGS Palembang
              </span>
            </div>
            <h1
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-6 tracking-tight"
              style={{ whiteSpace: 'pre-line' }}
            >
              {activeSlides[currentSlide]?.slogan}
            </h1>
            <p className="text-neutral-200 text-sm md:text-base max-w-lg leading-relaxed mb-10 animate-fade-up delay-200">
              {activeSlides[currentSlide]?.sub}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link href="/katalog" className="btn-primary">
                Lihat Katalog
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/profil" className="btn-outline border-white/40 text-white hover:bg-white hover:text-[#2d6a4f]">
                Pelajari Lebih
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation — Right Side */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {activeSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
            className="group flex items-center gap-2"
          >
            <div
              className={`h-px transition-all duration-500 ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-4 bg-white/30 group-hover:bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/10">
        <div
          className="h-full bg-[#52b788] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-6 md:right-10 z-30 text-white/50 text-xs font-medium tracking-widest">
        <span className="text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
        {' / '}
        {String(activeSlides.length).padStart(2, '0')}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 md:left-10 z-30 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="w-full bg-white/60 animate-pulse-slow" style={{ height: '40%', animation: 'float 2s ease-in-out infinite' }} />
        </div>
        <span className="text-white/30 text-[10px] tracking-[0.15em] uppercase rotate-90 origin-center mt-2">Scroll</span>
      </div>
    </div>
  );
}
