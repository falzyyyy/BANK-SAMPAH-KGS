"use client";

import React, { useState } from "react";
import { TrendingUp, Package } from "lucide-react";

interface DataPoint {
  month: string;
  weight: number;
}

const chartData: Record<string, DataPoint[]> = {
  Plastik: [
    { month: "Jan", weight: 320 },
    { month: "Feb", weight: 450 },
    { month: "Mar", weight: 410 },
    { month: "Apr", weight: 580 },
    { month: "Mei", weight: 620 },
    { month: "Jun", weight: 750 },
  ],
  Kardus: [
    { month: "Jan", weight: 250 },
    { month: "Feb", weight: 300 },
    { month: "Mar", weight: 280 },
    { month: "Apr", weight: 400 },
    { month: "Mei", weight: 420 },
    { month: "Jun", weight: 510 },
  ],
  "Kaleng Susu": [
    { month: "Jan", weight: 120 },
    { month: "Feb", weight: 180 },
    { month: "Mar", weight: 150 },
    { month: "Apr", weight: 220 },
    { month: "Mei", weight: 260 },
    { month: "Jun", weight: 310 },
  ],
  "Kemasan Kaleng": [
    { month: "Jan", weight: 90 },
    { month: "Feb", weight: 110 },
    { month: "Mar", weight: 130 },
    { month: "Apr", weight: 170 },
    { month: "Mei", weight: 190 },
    { month: "Jun", weight: 240 },
  ],
};

const categories = ["Plastik", "Kardus", "Kaleng Susu", "Kemasan Kaleng"];

export default function WasteChart() {
  const [activeCategory, setActiveCategory] = useState<string>("Plastik");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = chartData[activeCategory];
  const maxWeight = Math.max(...data.map((d) => d.weight));
  
  // SVG Dimensions
  const width = 500;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Calculate coordinates for points
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * chartWidth;
    const y = paddingY + chartHeight - (d.weight / (maxWeight * 1.1)) * chartHeight;
    return { x, y, ...d };
  });

  // Generate path string for lines
  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathD += ` L ${points[i].x} ${points[i].y}`;
    }
  }

  // Generate area path string
  let areaD = "";
  if (points.length > 0) {
    areaD = `${pathD} L ${points[points.length - 1].x} ${paddingY + chartHeight} L ${points[0].x} ${paddingY + chartHeight} Z`;
  }

  return (
    <div
      className="p-6 rounded-sm w-full transition-all duration-300"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-default)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-[#2d6a4f]" />
            <h3 className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>
              Grafik Penyetoran Sampah
            </h3>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Statistik penyetoran sampah (dalam Kg) selama 6 bulan terakhir
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-[#2d6a4f]/5 p-1 rounded-sm border border-[#2d6a4f]/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setHoveredIdx(null);
              }}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#2d6a4f] text-white shadow-sm"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-[#2d6a4f]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            {/* Gradient fill for area */}
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d6a4f" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2d6a4f" stopOpacity="0.00" />
            </linearGradient>
            {/* Filter shadow for tooltip/line */}
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = paddingY + chartHeight * ratio;
            const val = Math.round(maxWeight * 1.1 * (1 - ratio));
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  className="stroke-neutral-200 dark:stroke-neutral-800"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 8}
                  y={y + 4}
                  className="text-[10px] font-medium fill-neutral-400 dark:fill-neutral-500 text-right"
                  textAnchor="end"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area under the line */}
          {areaD && (
            <path
              d={areaD}
              fill="url(#areaGrad)"
              className="transition-all duration-500 ease-in-out"
            />
          )}

          {/* The line path */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#2d6a4f"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500 ease-in-out"
            />
          )}

          {/* Hover highlight line */}
          {hoveredIdx !== null && (
            <line
              x1={points[hoveredIdx].x}
              y1={paddingY}
              x2={points[hoveredIdx].x}
              y2={paddingY + chartHeight}
              stroke="#52b788"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          )}

          {/* Interactive touch targets & points */}
          {points.map((p, idx) => (
            <g key={idx}>
              {/* Outer glowing point on hover */}
              {hoveredIdx === idx && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="8"
                  fill="#52b788"
                  opacity="0.3"
                  className="animate-pulse"
                />
              )}
              {/* Core point */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIdx === idx ? "5" : "3.5"}
                fill={hoveredIdx === idx ? "#2d6a4f" : "#52b788"}
                stroke="var(--bg-secondary)"
                strokeWidth="1.5"
                className="transition-all duration-200 cursor-pointer"
              />
              {/* Invisible larger hover trigger */}
              <circle
                cx={p.x}
                cy={p.y}
                r="18"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            </g>
          ))}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={paddingY + chartHeight + 16}
              className={`text-[10px] font-bold uppercase tracking-wider text-center ${
                hoveredIdx === idx ? "fill-[#2d6a4f]" : "fill-neutral-400 dark:fill-neutral-500"
              }`}
              textAnchor="middle"
            >
              {p.month}
            </text>
          ))}
        </svg>

        {/* Floating HTML Tooltip overlay */}
        {hoveredIdx !== null && (
          <div
            className="absolute bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-2 rounded shadow-md pointer-events-none transition-all duration-150 ease-out z-20"
            style={{
              left: `${(points[hoveredIdx].x / width) * 100}%`,
              top: `${(points[hoveredIdx].y / height) * 100 - 15}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <Package className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                {activeCategory}
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-900 dark:text-white">
              {points[hoveredIdx].weight} Kg{" "}
              <span className="font-light text-neutral-400 text-[10px]">({points[hoveredIdx].month})</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-dashed border-neutral-100 dark:border-neutral-800 flex justify-between text-[10px] text-neutral-400 font-medium">
        <span>* Data diupdate berkala sesuai catatan admin</span>
        <span className="flex items-center gap-1 text-[#2d6a4f]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] inline-block animate-ping" />
          Live KGS Tracker
        </span>
      </div>
    </div>
  );
}
