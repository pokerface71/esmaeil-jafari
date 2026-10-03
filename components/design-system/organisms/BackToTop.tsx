import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { cn } from "lib/utils";
import { useI18n } from "lib/i18n";

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { dir } = useI18n();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-500",
        dir === "rtl" ? "left-6" : "right-6",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      )}
      style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6 60%, #d946ef)",
        boxShadow: "0 8px 30px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
      }}
    >
      <FaArrowUp className="text-sm" />
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/25" />
    </button>
  );
};

export default BackToTop;
