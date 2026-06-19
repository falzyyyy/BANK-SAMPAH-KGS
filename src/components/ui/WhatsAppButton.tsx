"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-3">
      {/* Tooltip Label */}
      <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none select-none text-xs font-semibold px-4 py-2 bg-[#ffffff] text-gray-900 border border-gray-200 rounded-sm shadow-lg tracking-wider uppercase">
        Chat Admin KGS
      </span>
      {/* Button */}
      <a
        href="https://wa.me/6282322013726?text=Halo%20Admin%20Bank%20Sampah%20KGS%20Palembang%2C%20saya%20ingin%20tanya..."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Admin"
        className="relative w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-40 animate-ping" style={{ animationDuration: '2.5s' }} />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
}
