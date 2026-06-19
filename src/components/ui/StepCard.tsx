import { ReactNode } from "react";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
}

export default function StepCard({ number, title, description, icon }: StepCardProps) {
  return (
    <div className="group relative flex flex-col glass-card glow-card-hover rounded-2xl p-6 min-h-[280px]">
      {/* Large background number */}
      <div className="flex items-center mb-6">
        <span
          className="font-serif text-6xl font-bold leading-none select-none transition-colors duration-300 opacity-20"
          style={{ color: "var(--text-muted)" }}
        >
          {String(number).padStart(2, "0")}
        </span>
      </div>

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#2d6a4f] group-hover:text-white"
        style={{ backgroundColor: "var(--bg-tertiary)", color: "#2d6a4f" }}
      >
        <div className="w-5 h-5">{icon}</div>
      </div>

      {/* Text */}
      <h3
        className="font-semibold text-base mb-2 tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="text-xs leading-relaxed flex-1"
        style={{ color: "var(--text-muted)" }}
      >
        {description}
      </p>

      {/* Animated bottom line */}
      <div
        className="mt-6 h-px relative overflow-hidden"
        style={{ backgroundColor: "var(--border-default)" }}
      >
        <div className="absolute inset-y-0 left-0 w-0 bg-[#2d6a4f] transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
}

