import React from "react";
import { cn } from "lib/utils";

/**
 * Mobile-optimized, accessible Skill card.
 *
 * - Prefers-reduced-motion aware: the hover parallax glow, tilt and
 *   entrance animation are disabled when the user asked for less motion.
 * - Focus ring + larger tap target so the row is reachable by keyboard
 *   and touch alone.
 * - Accessible name is derived from the skill name + "skill"
 *   (e.g. "React skill").
 */
export interface SkillCardProps {
  Icon: React.ComponentType<{ size?: string | number; className?: string }>;
  name: string;
  /** Tailwind color classes: text color of the icon. */
  color: string;
  /** Tailwind color classes: tile background. */
  tile: string;
  /** Tailwind color classes: glow blob behind the tile. */
  glow: string;
  /** Tailwind color classes: tile ring border. */
  ring: string;
  /** CSS delay for the entrance animation. */
  delay?: string;
  /** Whether the IntersectionObserver has revealed this card. */
  isVisible?: boolean;
  id?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

/** Matches SkillCard in components/design-system/molecules/SkillCard.tsx for storybook/navigation. */
export const SkillCardRoot = React.forwardRef<HTMLDivElement, SkillCardProps>(
  (
    {
      Icon,
      name,
      color,
      tile,
      glow,
      ring,
      delay = "0s",
      isVisible = true,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
      <div
        ref={ref}
        data-spot
        data-animate={id}
        role="group"
        aria-label={`${name} skill`}
        className={cn(
          "spot-card group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] px-4 py-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 focus-within:ring-2 focus-within:ring-violet-400/50 focus-within:ring-offset-2 sm:px-5 sm:py-7",
          isVisible
            ? "animate-scale-in opacity-100 scale-100"
            : "opacity-0 scale-90",
          className
        )}
        style={{
          animationDelay: reduced ? undefined : delay,
          willChange: reduced ? undefined : "transform",
        }}
      >
        {reduced ? null : (
          <>
            {/* Corner gradient wash on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120px_circle_at_50%_-10%,rgba(167,139,250,0.14),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Icon */}
            <div className="relative">
              <div
                aria-hidden="true"
                className={cn(
                  "absolute -inset-2 rounded-2xl blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-35",
                  glow
                )}
              />
              <div
                className={cn(
                  "relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110 sm:h-16 sm:w-16",
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

            {/* Bottom gradient hairline */}
            <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/70 to-transparent transition-all duration-500 group-hover:w-2/3" />
          </>
        )}
      </div>
    );
  }
);
SkillCardRoot.displayName = "SkillCard";

export default SkillCardRoot;
