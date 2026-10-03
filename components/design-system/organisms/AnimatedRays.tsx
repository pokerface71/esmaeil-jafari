import React from "react";

interface AnimatedRaysProps {
  /** Reduces overall opacity of the effect */
  muted?: boolean;
  className?: string;
}

/**
 * Vengeance-style animated "rays": slow-rotating conic beams of light
 * emerging from the top-center of the parent (which must be relative + overflow-hidden).
 * Purely decorative; aria-hidden.
 */
const AnimatedRays: React.FC<AnimatedRaysProps> = ({ muted = false, className }) => {
  return (
    <div
      aria-hidden="true"
      className={`rays ${muted ? "rays--muted" : ""} ${className ?? ""}`}
    >
      <div className="rays__glow" data-parallax="0.12" />
      <div className="rays__spokes" />
      <div className="rays__spokes rays__spokes--tint" />
    </div>
  );
};

export default AnimatedRays;
