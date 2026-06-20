"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function PagePreloader() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show splash screen for 1.2s, then start fade out transition
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1200);

    // Completely unmount after transition finishes (700ms)
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 1900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        fadeOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo Container */}
        <div className="relative w-16 h-16 animate-bounce">
          <Image
            src="/logo_kgs_icon.png"
            alt="Logo Bank Sampah KGS"
            fill
            className="object-contain animate-pulse"
            priority
          />
          
          {/* Rotating outer spinner ring */}
          <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-[#52b788]/40 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        {/* Text Logo */}
        <div className="text-center mt-2">
          <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-[#1a1a2e] dark:text-white">
            Bank Sampah
          </h2>
          <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#2d6a4f] mt-1">
            KGS Palembang
          </p>
        </div>

        {/* Minimalist loading bar */}
        <div className="w-32 h-[3px] bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mt-4 relative">
          <div className="absolute top-0 bottom-0 left-0 bg-[#2d6a4f] rounded-full animate-loading-bar w-1/2" />
        </div>
      </div>
    </div>
  );
}
