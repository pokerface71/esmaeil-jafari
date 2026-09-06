import React from "react";
import { cn } from "lib/utils";

interface SkillCardProps {
  Icon: React.ComponentType<{ size?: string | number; className?: string }>;
  name: string;
  color: string;
  tile: string;
  glow: string;
  ring: string;
  delay: string;
  isVisible: boolean;
  id: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  Icon,
  name,
  color,
  tile,
  glow,
  ring,
  delay,
  isVisible,
  id
}) => {
  return (
    <div
      data-spot
      data-animate={id}
      className={cn(
        "spot-card group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] px-4 py-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_14px_40px_rgba(4,4,12,0.55),0_0_30px_rgba(139,92,246,0.10)]",
        isVisible ? "animate-scale-in" : "opacity-0 scale-90"
      )}
      id={id}
      style={{ animationDelay: delay }}
    >
      {/* Corner gradient wash on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120px_circle_at_50%_-10%,rgba(167,139,250,0.14),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative">
        {/* Glow blob behind tile */}
        <div
          className={cn(
            "absolute -inset-2 rounded-2xl blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-35",
            glow
          )}
        />
        <div
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110",
            tile,
            ring
          )}
        >
          <Icon
            size={30}
            className={cn(color, "transition-transform duration-500")}
          />
        </div>
      </div>

      {/* Name */}
      <span className="relative text-sm font-semibold text-foreground/85 transition-colors duration-300">
        {name}
      </span>

      {/* Bottom gradient hairline */}
      <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/70 to-transparent transition-all duration-500 group-hover:w-2/3" />
    </div>
  );
};

export default SkillCard;
