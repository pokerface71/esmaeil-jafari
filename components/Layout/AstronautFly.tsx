import React, { useEffect, useRef } from "react";

/**
 * A cartoon astronaut that roams the page: it flies between interesting
 * elements (hero, cards, stats, experience, GitHub, contact), perches on top
 * of them and performs little actions (hop, spin, wave, blink) before moving
 * on. Purely decorative: pointer-events none, desktop & reduced-motion aware.
 */
const SPOTS = [
  "#hero-image",
  "#about-main",
  "#about-stat2",
  "#skill-3",
  "#skill-6",
  "#exp-0",
  "#exp-3",
  "#github-card",
  "#contact-info",
  "#contact-social",
];

const AstronautFly: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mqReduced =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    const mqDesktop =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(min-width: 1024px)")
        : null;

    const W = 132; // astronaut width in px
    const H = 150; // astronaut height in px
    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    let pos = { x: 0, y: -H };
    let cancelled = false;
    let timeouts: number[] = [];
    let raf = 0;

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timeouts.push(id);
      return id;
    };

    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        const id = window.setTimeout(res, ms);
        timeouts.push(id);
      });

    const setVars = (p: typeof pos) => {
      root.style.setProperty("--ax", `${p.x}px`);
      root.style.setProperty("--ay", `${p.y}px`);
    };

    const setFlame = (v: number) =>
      root.style.setProperty("--ff", clamp(v, 0, 1).toFixed(2));

    const setRot = (deg: number) =>
      root.style.setProperty("--ar", `${clamp(deg, -20, 20).toFixed(2)}deg`);

    const setSquash = (sy: number) =>
      root.style.setProperty("--sy", sy.toFixed(3));

    const animate = (
      dur: number,
      step: (eased: number, raw: number) => void
    ) =>
      new Promise<void>((resolve) => {
        const t0 = performance.now();
        const ease = (t: number) =>
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const loop = (now: number) => {
          if (cancelled) return resolve();
          const raw = clamp((now - t0) / (dur * 1000), 0, 1);
          step(ease(raw), raw);
          if (raw < 1) {
            raf = requestAnimationFrame(loop);
          } else {
            resolve();
          }
        };
        raf = requestAnimationFrame(loop);
      });

    // Where should the astronaut perch on a given element?
    const spotFor = (id: string, parity: number) => {
      const el = document.getElementById(id.replace("#", ""));
      if (!el) return { x: 40, y: -H };
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const left = r.left;
      const frac = parity % 2 === 0 ? 0.18 : 0.82;
      const x = left + r.width * frac;
      const y = top - H + 4; // feet rest on the element's top edge
      return { x, y };
    };

    const randomSpot = (except?: string) => {
      let id = SPOTS[Math.floor(Math.random() * SPOTS.length)];
      if (id === except && SPOTS.length > 1) {
        id = SPOTS[(SPOTS.indexOf(id) + 1) % SPOTS.length];
      }
      return id;
    };

    const startAction = (name: string) => {
      root.classList.add(name);
      later(() => root.classList.remove(name), name === "is-wave" ? 1900 : 900);
    };

    const doAction = async () => {
      const roll = Math.random();
      if (roll < 0.3) startAction("is-wave");
      else if (roll < 0.55) startAction("is-hop");
      else if (roll < 0.72) startAction("is-spin");
      else if (roll < 0.88) startAction("is-blink");
      // else: just hover quietly
    };

    const flyTo = async (id: string, parity: number) => {
      const target = spotFor(id, parity);
      const dist = Math.hypot(target.x - pos.x, target.y - pos.y);
      const dur = clamp(0.9 + dist / 900, 1.1, 2.2);
      const start = { ...pos };
      const lean = target.x < start.x ? -7 : 7;

      setFlame(0.9);
      await animate(dur, (e) => {
        // slight arc so it feels like flying up-and-over
        const arc = -Math.sin(e * Math.PI) * 56;
        pos = {
          x: start.x + (target.x - start.x) * e,
          y: start.y + (target.y - start.y) * e + arc,
        };
        setVars(pos);
        setRot(Math.sin(e * Math.PI) * lean * 0.5);
      });

      // settle at the perch
      await animate(0.16, (e) => setSquash(1 - 0.16 * (1 - e)));
      await animate(0.2, (e) => setSquash(1 - 0.16 * e));
      setRot(0);
      setSquash(1);
      pos = { ...target };
      setVars(pos);
      await animate(0.18, (e) => setFlame(0.9 * (1 - e)));
      setFlame(0);
    };

    const main = async () => {
      await sleep(600);
      let last = randomSpot();
      let parity = 0;
      while (!cancelled) {
        const id = randomSpot(last);
        last = id;
        await flyTo(id, parity++);

        // dwell + actions
        await sleep(500);
        if (!cancelled) await doAction();
        await sleep(1400 + Math.random() * 1200);
      }
    };

    let started = false;
    const ensure = () => {
      const show =
        (mqReduced ? !mqReduced.matches : true) &&
        (mqDesktop ? mqDesktop.matches : false);
      root.style.display = show ? "block" : "none";
      if (show && !started) {
        started = true;
        main();
      }
    };

    mqDesktop?.addEventListener?.("change", ensure);
    mqReduced?.addEventListener?.("change", ensure);
    window.addEventListener("resize", ensure);
    ensure();

    return () => {
      cancelled = true;
      mqDesktop?.removeEventListener?.("change", ensure);
      mqReduced?.removeEventListener?.("change", ensure);
      window.removeEventListener("resize", ensure);
      timeouts.forEach((id) => window.clearTimeout(id));
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="astro-stage" aria-hidden="true">
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

            {/* Legs / boots (tucked) */}
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
            <rect x="76" y="158" width="68" height="14" rx="7" fill="#e0e7ff" stroke="#3a3564" strokeWidth="4" />
            <rect x="100" y="158" width="20" height="14" rx="4" fill="#a5b4fc" />
            <rect x="96" y="124" width="28" height="20" rx="6" fill="#dbeafe" stroke="#3a3564" strokeWidth="3.5" />
            <circle cx="105" cy="134" r="2.6" fill="#22d3ee" />
            <circle cx="115" cy="134" r="2.6" fill="#f472b6" />
            <rect x="98" y="178" width="24" height="8" rx="4" fill="#c7d2fe" opacity="0.8" />

            {/* Helmet */}
            <circle cx="110" cy="82" r="50" fill="url(#helmetGrad)" stroke="#3a3564" strokeWidth="5.5" />
            <path d="M110 34 L116 16" stroke="#3a3564" strokeWidth="4" strokeLinecap="round" />
            <circle cx="117" cy="14" r="5.5" fill="#f472b6" stroke="#3a3564" strokeWidth="2.5" />

            {/* Visor */}
            <path
              d="M84 66 C84 54 96 50 110 50 C124 50 136 54 136 66 L136 96 C136 108 124 112 110 112 C96 112 84 108 84 96 Z"
              fill="url(#visorGrad)"
              stroke="#3a3564"
              strokeWidth="5"
            />
            <path d="M94 60 C104 56 116 58 126 64" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
            <path d="M102 93 q8 7 18 0" stroke="#3a3564" strokeWidth="3.4" strokeLinecap="round" fill="none" />

            {/* Face (grouped so we can blink) */}
            <g className="a-eyes">
              <circle cx="101" cy="80" r="3.4" fill="#3a3564" />
              <circle cx="121" cy="80" r="3.4" fill="#3a3564" />
              <circle cx="93" cy="86" r="3" fill="#f472b6" opacity="0.75" />
              <circle cx="127" cy="86" r="3" fill="#f472b6" opacity="0.75" />
            </g>

            {/* Left arm (static) */}
            <g>
              <path d="M86 140 C74 122 68 106 58 92" stroke="#3a3564" strokeWidth="26" strokeLinecap="round" />
              <path d="M86 140 C74 122 68 106 58 92" stroke="url(#suitGrad)" strokeWidth="19" strokeLinecap="round" />
              <path d="M86 140 C78 126 72 112 66 100" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
              <circle cx="52" cy="86" r="13" fill="#e0e7ff" stroke="#3a3564" strokeWidth="5" />
            </g>

            {/* Right arm (waves) */}
            <g
              className="a-arm-r"
              style={{ transformBox: "view-box", transformOrigin: "140px 138px" }}
            >
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
