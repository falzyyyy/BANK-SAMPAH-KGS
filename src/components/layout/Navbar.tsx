"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Leaf, X, Sun, Moon, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { name: "Beranda", path: "/", num: "01" },
  { name: "Profil", path: "/profil", num: "02" },
  { name: "Katalog", path: "/katalog", num: "03" },
  { name: "Edukasi", path: "/edukasi", num: "04" },
  { name: "Kontak", path: "/kontak", num: "05" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ══════════════════════════════════════
          HEADER — solid, clean, always visible
      ══════════════════════════════════════ */}
      <header
        style={{
          backgroundColor: isDark ? "#161b22" : "#ffffff",
          borderBottom: isDark ? "1px solid #30363d" : "1px solid #f0f0f0",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-screen-xl mx-auto px-5 lg:px-10">
          <div className="flex items-center h-16 gap-4">

            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-7 h-7 shrink-0">
                <div className="absolute inset-0 rounded-[3px] bg-[#2d6a4f] flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="flex flex-col leading-none gap-[2px]">
                <span
                  className="text-[11px] font-bold tracking-[0.12em] uppercase"
                  style={{ color: isDark ? "#e6edf3" : "#1a1a2e" }}
                >
                  Bank Sampah
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#2d6a4f]">
                  KGS
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden md:flex items-center gap-1.5 ml-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="relative group flex flex-col items-center px-3.5 py-2 rounded-[3px] transition-colors duration-200"
                    style={{
                      backgroundColor: isActive
                        ? isDark ? "rgba(45,106,79,0.15)" : "rgba(45,106,79,0.07)"
                        : "transparent",
                    }}
                  >
                    {/* Tiny number */}
                    <span
                      className="text-[7.5px] font-mono tracking-widest mb-0.5"
                      style={{ color: isActive ? "#52b788" : isDark ? "#484f58" : "#d1d5db" }}
                    >
                      {link.num}
                    </span>
                    {/* Label */}
                    <span
                      className="text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200"
                      style={{
                        color: isActive
                          ? "#2d6a4f"
                          : isDark ? "#8b949e" : "#6b7280",
                      }}
                    >
                      {link.name}
                    </span>
                    {/* Active underline */}
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: "#2d6a4f",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── RIGHT ACTIONS ── */}
            <div className="flex items-center gap-1 ml-auto md:ml-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="w-8 h-8 flex items-center justify-center rounded-[3px] transition-colors duration-200 relative overflow-hidden"
                style={{
                  color: isDark ? "#8b949e" : "#9ca3af",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <Sun
                  className="w-4 h-4 absolute transition-all duration-300"
                  style={{ opacity: isDark ? 1 : 0, transform: isDark ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(90deg)" }}
                />
                <Moon
                  className="w-4 h-4 absolute transition-all duration-300"
                  style={{ opacity: isDark ? 0 : 1, transform: isDark ? "scale(0.5) rotate(-90deg)" : "scale(1) rotate(0deg)" }}
                />
              </button>


              {/* Hamburger — mobile */}
              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="md:hidden w-8 h-8 flex flex-col items-end justify-center gap-[5px] px-1 rounded-[3px]"
                style={{ color: isDark ? "#c9d1d9" : "#374151" }}
              >
                <span className="block w-full h-px bg-current transition-all duration-300" />
                <span className="block w-3/4 h-px bg-current transition-all duration-300" />
                <span className="block w-1/2 h-px bg-current transition-all duration-300" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MOBILE BACKDROP
      ══════════════════════════════════════ */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-[60] backdrop-blur-sm transition-all duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      />

      {/* ══════════════════════════════════════
          MOBILE SLIDE PANEL
      ══════════════════════════════════════ */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-[70] w-[75vw] max-w-[300px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          backgroundColor: isDark ? "#161b22" : "#ffffff",
          borderLeft: isDark ? "1px solid #30363d" : "1px solid #f0f0f0",
        }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-6 h-16 shrink-0"
          style={{ borderBottom: isDark ? "1px solid #30363d" : "1px solid #f0f0f0" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#2d6a4f] rounded-[2px] flex items-center justify-center">
              <Leaf className="w-3 h-3 text-white" />
            </div>
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: isDark ? "#e6edf3" : "#1a1a2e" }}
            >
              Menu
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-[3px] transition-colors"
            style={{ color: isDark ? "#8b949e" : "#9ca3af" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-5 py-5 overflow-y-auto">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between py-4 transition-colors duration-150"
                style={{
                  borderBottom: isDark ? "1px solid #21262d" : "1px solid #f5f5f5",
                  color: isActive
                    ? "#2d6a4f"
                    : isDark ? "#8b949e" : "#6b7280",
                  animationDelay: `${i * 40}ms`,
                }}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className="font-mono text-[8px] tracking-widest"
                    style={{ color: isDark ? "#484f58" : "#e5e7eb" }}
                  >
                    {link.num}
                  </span>
                  <span className="text-sm font-semibold tracking-tight">{link.name}</span>
                </div>
                <span
                  className="text-xs transition-all duration-200 group-hover:translate-x-0.5"
                  style={{ opacity: isActive ? 1 : 0.3 }}
                >
                  →
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Panel footer */}
        <div
          className="px-5 py-5 space-y-2 shrink-0"
          style={{ borderTop: isDark ? "1px solid #30363d" : "1px solid #f0f0f0" }}
        >
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-[3px] transition-colors"
            style={{
              backgroundColor: isDark ? "#22272e" : "#f9fafb",
              color: isDark ? "#8b949e" : "#9ca3af",
            }}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </aside>
    </>
  );
}
