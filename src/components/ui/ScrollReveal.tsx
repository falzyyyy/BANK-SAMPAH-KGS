"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-in" | "slide-right" | "scale-in";
  delayMs?: number;
  durationMs?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delayMs = 0,
  durationMs = 800,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Hanya reveal sekali
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.05, // Memicu ketika minimal 5% elemen terlihat di layar
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case "fade-in":
        return isVisible ? "opacity-100" : "opacity-0";
      case "slide-right":
        return isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8";
      case "scale-in":
        return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
      case "fade-up":
      default:
        return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ${getVariantStyles()} ${className}`}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
