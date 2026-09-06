import React, { useEffect, useRef } from "react";

/**
 * A cartoon astronaut that "flies" down the right (LTR) / left (RTL) edge of
 * the viewport as the user scrolls. Purely decorative — pointer-events: none,
 * hidden on small screens and for reduced-motion users.
 */
const AstronautFly: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      root.style.display = "none";
      return;
    }

    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const elH = 172;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let isRtl = document.documentElement.getAttribute("dir") === "rtl";
    let tilt = 0;
    let prevY = window.scrollY;
    let speed = 0;
    let raf = 0;
    let active = false;

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const frame = () => {
      raf = 0;
      active = false;

      const doc = document.documentElement;
      const sy = window.scrollY;
      const maxScroll = Math.max(1, doc.scrollHeight - h);
      const p = clamp(sy / maxScroll, 0, 1);

      // Vertical path: start just under the header, end near the viewport bottom
      const y = 64 + p * (h - elH - 96);
      const x = isRtl ? 18 : w - 18 - 158;

      // Tilts as it accelerates into the scroll direction, then settles
      speed += (sy - prevY - speed) * 0.18;
      prevY = sy;
      const targetTilt = clamp(-speed * 0.05, -18, 14);
      tilt += (targetTilt - tilt) * 0.12;

      const flame = clamp(Math.abs(speed) / 70, 0, 1);

      // Fade in at the very top, fade out near the footer
      let opacity = 1;
      if (p < 0.04) opacity = p / 0.04;
      if (p > 0.9) opacity = clamp((1 - p) / 0.1, 0, 1);

      root.style.opacity = String(opacity);
      root.style.setProperty("--ax", `${x}px`);
      root.style.setProperty("--ay", `${y}px`);
      root.style.setProperty("--ar", `${tilt.toFixed(2)}deg`);
      root.style.setProperty("--ff", flame.toFixed(2));

      if (Math.abs(speed) > 0.05 || Math.abs(targetTilt - tilt) > 0.02) {
        active = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const start = () => {
      if (!active) {
        active = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onScroll = () => start();
    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      root.style.display = mqDesktop.matches ? "block" : "none";
      start();
    };

    const showIfNeeded = () => {
      root.style.display = mqDesktop.matches ? "block" : "none";
    };

    const onDirChange = () => {
      isRtl = document.documentElement.getAttribute("dir") === "rtl";
      start();
    };

    showIfNeeded();
    start();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const observer = new MutationObserver(onDirChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="astronaut" aria-hidden="true">
      <div className="a-tilt">
        <div className="a-float">
          {/* Jet flame */}
          <svg
            className="a-flame"
            viewBox="0 0 60 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 4 C38 22 52 36 47 58 C44 72 38 80 30 88 C22 80 16 72 13 58 C8 36 22 22 30 4 Z"
              fill="url(#flameGrad)"
            />
            <path
              d="M30 22 C35 34 42 44 39 60 C37 69 33 75 30 80 C27 75 23 69 21 60 C18 44 25 34 30 22 Z"
              fill="#fff7d6"
              opacity="0.75"
            />
            <defs>
              <linearGradient id="flameGrad" x1="30" y1="4" x2="30" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fde68a" />
                <stop offset="0.45" stopColor="#f97316" />
                <stop offset="1" stopColor="#f43f5e" stopOpacity="0.15" />
              </linearGradient>
            </defs>
          </svg>

          {/* Astronaut */}
          <svg
            className="a-astro"
            viewBox="0 0 220 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="suitGrad" x1="70" y1="100" x2="150" y2="230" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="0.6" stopColor="#eef2ff" />
                <stop offset="1" stopColor="#c7d2fe" />
              </linearGradient>
              <linearGradient id="helmetGrad" x1="70" y1="30" x2="150" y2="130" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="0.55" stopColor="#eef2ff" />
                <stop offset="1" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="visorGrad" x1="84" y1="58" x2="136" y2="116" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a5f3fc" />
                <stop offset="0.5" stopColor="#60a5fa" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="packGrad" x1="66" y1="90" x2="156" y2="180" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a5b4fc" />
                <stop offset="0.5" stopColor="#818cf8" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>

            {/* Life-support backpack */}
            <rect x="60" y="96" width="100" height="84" rx="24" fill="url(#packGrad)" />
            <rect x="72" y="104" width="20" height="46" rx="10" fill="#c7d2fe" opacity="0.55" />
            <rect x="128" y="104" width="20" height="46" rx="10" fill="#c7d2fe" opacity="0.55" />
            <rect x="74" y="152" width="72" height="12" rx="6" fill="#e0e7ff" opacity="0.7" />

            {/* Legs / boots (tucked, floating) */}
            <g>
              <ellipse cx="98" cy="208" rx="16" ry="15" fill="url(#suitGrad)" stroke="#3a3564" strokeWidth="5" />
              <ellipse cx="122" cy="208" rx="16" ry="15" fill="url(#suitGrad)" stroke="#3a3564" strokeWidth="5" />
              <path d="M84 207 h8 M112 207 h8" stroke="#3a3564" strokeWidth="5" strokeLinecap="round" />
              <path d="M96 194 l6 10 M118 194 l6 10" stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" />
            </g>

            {/* Torso */}
            <path
              d="M76 132 C76 108 92 106 110 106 C128 106 144 108 144 132 L144 172 C144 196 128 200 110 200 C92 200 76 196 76 172 Z"
              fill="url(#suitGrad)"
              stroke="#3a3564"
              strokeWidth="5.5"
            />
            {/* Belt */}
            <rect x="76" y="158" width="68" height="14" rx="7" fill="#e0e7ff" stroke="#3a3564" strokeWidth="4" />
            <rect x="100" y="158" width="20" height="14" rx="4" fill="#a5b4fc" />
            {/* Chest control panel */}
            <rect x="96" y="124" width="28" height="20" rx="6" fill="#dbeafe" stroke="#3a3564" strokeWidth="3.5" />
            <circle cx="105" cy="134" r="2.6" fill="#22d3ee" />
            <circle cx="115" cy="134" r="2.6" fill="#f472b6" />
            <rect x="98" y="178" width="24" height="8" rx="4" fill="#c7d2fe" opacity="0.8" />

            {/* Helmet */}
            <circle cx="110" cy="82" r="50" fill="url(#helmetGrad)" stroke="#3a3564" strokeWidth="5.5" />
            {/* Antenna */}
            <path d="M110 34 L116 16" stroke="#3a3564" strokeWidth="4" strokeLinecap="round" />
            <circle cx="117" cy="14" r="5.5" fill="#f472b6" stroke="#3a3564" strokeWidth="2.5" />

            {/* Visor */}
            <path
              d="M84 66 C84 54 96 50 110 50 C124 50 136 54 136 66 L136 96 C136 108 124 112 110 112 C96 112 84 108 84 96 Z"
              fill="url(#visorGrad)"
              stroke="#3a3564"
              strokeWidth="5"
            />
            {/* Visor shine */}
            <path d="M94 60 C104 56 116 58 126 64" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
            {/* Happy face inside visor */}
            <circle cx="101" cy="80" r="3.4" fill="#3a3564" />
            <circle cx="121" cy="80" r="3.4" fill="#3a3564" />
            <path d="M102 93 q8 7 18 0" stroke="#3a3564" strokeWidth="3.4" strokeLinecap="round" fill="none" />
            <circle cx="93" cy="86" r="3" fill="#f472b6" opacity="0.75" />
            <circle cx="127" cy="86" r="3" fill="#f472b6" opacity="0.75" />

            {/* Arms + gloves */}
            <g>
              {/* Left arm */}
              <path d="M86 140 C74 122 68 106 58 92" stroke="#3a3564" strokeWidth="26" strokeLinecap="round" />
              <path d="M86 140 C74 122 68 106 58 92" stroke="url(#suitGrad)" strokeWidth="19" strokeLinecap="round" />
              <path d="M86 140 C78 126 72 112 66 100" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
              <circle cx="52" cy="86" r="13" fill="#e0e7ff" stroke="#3a3564" strokeWidth="5" />
              {/* Right arm */}
              <path d="M134 140 C146 122 152 106 162 92" stroke="#3a3564" strokeWidth="26" strokeLinecap="round" />
              <path d="M134 140 C146 122 152 106 162 92" stroke="url(#suitGrad)" strokeWidth="19" strokeLinecap="round" />
              <path d="M134 140 C142 126 148 112 154 100" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
              <circle cx="168" cy="86" r="13" fill="#e0e7ff" stroke="#3a3564" strokeWidth="5" />
            </g>

            {/* Shoulder puffs */}
            <circle cx="88" cy="136" r="15" fill="url(#helmetGrad)" stroke="#3a3564" strokeWidth="5" />
            <circle cx="132" cy="136" r="15" fill="url(#helmetGrad)" stroke="#3a3564" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AstronautFly;
