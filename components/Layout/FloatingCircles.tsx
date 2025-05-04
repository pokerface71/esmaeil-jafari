import { useEffect, useRef } from "react";

interface FloatingCirclesProps {
  colors: string[];
  count?: number;
}

const FloatingCircles: React.FC<FloatingCirclesProps> = ({
  colors,
  count = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const circles: HTMLDivElement[] = [];

    // Create circles
    for (let i = 0; i < count; i++) {
      const circle = document.createElement("div");
      circle.style.position = "absolute";
      circle.style.width = `${Math.random() * 20 + 10}px`;
      circle.style.height = circle.style.width;
      circle.style.borderRadius = "50%";
      circle.style.opacity = "0.2";
      circle.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      circle.style.left = `${Math.random() * 100}%`;
      circle.style.top = `${Math.random() * 100}%`;

      // Randomly choose between three different animations
      const animationType = Math.floor(Math.random() * 3);
      const duration = Math.random() * 8 + 8; // 8-16 seconds for faster movement
      const delay = Math.random() * 5; // 0-5 seconds delay

      circle.style.animation = `float${
        animationType + 1
      } ${duration}s infinite ease-in-out`;
      circle.style.animationDelay = `${delay}s`;

      container.appendChild(circle);
      circles.push(circle);
    }

    // Cleanup
    return () => {
      circles.forEach((circle) => circle.remove());
    };
  }, [colors, count]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 0,
      }}
    />
  );
};

export default FloatingCircles;
