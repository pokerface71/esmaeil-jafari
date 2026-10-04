import { GlassCard, IconBox } from "components/design-system/atoms";
import { cn } from "lib/utils";
import React from "react";

export interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  /** IconBox tone token. */
  tone?: "violet" | "fuchsia" | "sky" | "amber" | "green" | "blue" | "pink";
  /** Mono index shown top-right (e.g. "01.1"). */
  index?: string;
  /** Reveal animation state from the page-level IntersectionObserver. */
  isVisible?: boolean;
  id?: string;
  className?: string;
}

/**
 * Molecule: glass stat tile — icon, big gradient number and label.
 * Composes GlassCard + IconBox + GradientText atoms.
 */
export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  tone = "violet",
  index,
  isVisible = true,
  id,
  className
}) => (
  <GlassCard
    spotlight
    as="div"
    data-animate={id}
    id={id}
    style={{ animationDelay: index ? "0.1s" : undefined }}
    className={cn(
      "rounded-3xl p-6 bento-about-card",
      isVisible ? "animate-fade-in-up" : "opacity-0",
      className
    )}
  >
    <div className="flex items-center justify-between mb-4">
      <IconBox
        icon={icon}
        tone={tone}
        size="sm"
        className="h-9 w-9 rounded-xl"
      />
      {index && (
        <span className="font-mono text-[10px] text-muted-foreground/60">
          {index}
        </span>
      )}
    </div>
    <p className="text-4xl font-black gradient-text leading-none">{value}</p>
    <p className="text-sm text-muted-foreground mt-2">{label}</p>
  </GlassCard>
);
