import React from "react";

interface AuroraBackgroundProps {
  variant?: "default" | "hero" | "warm" | "cool" | "purple";
}

const gradients = {
  default:
    "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(99, 102, 241, 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)",
  hero: "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(99, 102, 241, 0.18) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(168, 85, 247, 0.12) 0%, transparent 50%), radial-gradient(ellipse 50% 60% at 50% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
  warm: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 70% 30%, rgba(239, 68, 68, 0.06) 0%, transparent 50%)",
  cool: "radial-gradient(ellipse 80% 50% at 30% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 70% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
  purple: "radial-gradient(ellipse 80% 50% at 40% 40%, rgba(139, 92, 246, 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 70% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)",
};

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  variant = "default",
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0"
        style={{
          background: gradients[variant],
          animation: "aurora 15s ease-in-out infinite",
        }}
      />
    </div>
  );
};

export default AuroraBackground;
