/**
 * Dynamic cover art generator — turns a post's content (tags, title, slug)
 * into a unique, deterministic SVG cover when no real image exists.
 *
 * How it works:
 *  1. A tiny string hash (FNV-1a) of the post's identity picks a palette and
 *     a glyph style. Same post → same cover, forever. No external service.
 *  2. The palette prefers the post's first tag (react → cyan, next → violet,
 *     …) so posts about the same technology share a visual family.
 *  3. The output is an inline SVG data URI — zero requests, crisp at any
 *     size, and works in <img src> everywhere.
 *
 * Motifs drawn inside the mock code window vary by hash: brackets, curly
 * braces, terminal prompt, arrows — plus 2–3 floating shapes.
 */

// ---------------------------------------------------------------------------
// Hashing — FNV-1a: tiny, fast, deterministic across server/client.
// ---------------------------------------------------------------------------

export function hashString(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// ---------------------------------------------------------------------------
// Palettes — keyed by common tech tags, plus a hashed fallback family.
// Each palette: [gradient start, gradient middle, glow accents, code color]
// ---------------------------------------------------------------------------

interface Palette {
  stops: [string, string, string];
  glowA: string;
  glowB: string;
  accent: string;
}

const TAG_PALETTES: Record<string, Palette> = {
  react: { stops: ["#0c4a6e", "#164e63", "#155e75"], glowA: "#22d3ee", glowB: "#38bdf8", accent: "#67e8f9" },
  nextjs: { stops: ["#312e81", "#1e1b4b", "#4c1d95"], glowA: "#8b5cf6", glowB: "#d946ef", accent: "#c4b5fd" },
  next: { stops: ["#312e81", "#1e1b4b", "#4c1d95"], glowA: "#8b5cf6", glowB: "#d946ef", accent: "#c4b5fd" },
  typescript: { stops: ["#1e3a8a", "#172554", "#1e40af"], glowA: "#60a5fa", glowB: "#818cf8", accent: "#93c5fd" },
  javascript: { stops: ["#713f12", "#422006", "#854d0e"], glowA: "#facc15", glowB: "#fbbf24", accent: "#fde68a" },
  css: { stops: ["#1e3a8a", "#0c4a6e", "#1d4ed8"], glowA: "#38bdf8", glowB: "#818cf8", accent: "#7dd3fc" },
  html: { stops: ["#7c2d12", "#431407", "#9a3412"], glowA: "#fb923c", glowB: "#f87171", accent: "#fdba74" },
  nodejs: { stops: ["#14532d", "#052e16", "#166534"], glowA: "#4ade80", glowB: "#34d399", accent: "#86efac" },
  python: { stops: ["#134e4a", "#042f2e", "#115e59"], glowA: "#2dd4bf", glowB: "#38bdf8", accent: "#5eead4" },
  sql: { stops: ["#312e81", "#1e1b4b", "#1e40af"], glowA: "#818cf8", glowB: "#38bdf8", accent: "#a5b4fc" },
  git: { stops: ["#7f1d1d", "#450a0a", "#991b1b"], glowA: "#f87171", glowB: "#fb923c", accent: "#fca5a5" },
  design: { stops: ["#831843", "#500724", "#9d174d"], glowA: "#f472b6", glowB: "#e879f9", accent: "#f9a8d4" },
  devops: { stops: ["#134e4a", "#1e3a8a", "#312e81"], glowA: "#2dd4bf", glowB: "#818cf8", accent: "#5eead4" },
};

const FALLBACK_PALETTES: Palette[] = [
  { stops: ["#312e81", "#1e1b4b", "#4c1d95"], glowA: "#8b5cf6", glowB: "#d946ef", accent: "#c4b5fd" },
  { stops: ["#0c4a6e", "#164e63", "#155e75"], glowA: "#22d3ee", glowB: "#818cf8", accent: "#67e8f9" },
  { stops: ["#134e4a", "#042f2e", "#115e59"], glowA: "#2dd4bf", glowB: "#34d399", accent: "#5eead4" },
  { stops: ["#831843", "#500724", "#9d174d"], glowA: "#f472b6", glowB: "#c084fc", accent: "#f9a8d4" },
  { stops: ["#713f12", "#422006", "#854d0e"], glowA: "#facc15", glowB: "#fb923c", accent: "#fde68a" },
  { stops: ["#1e3a8a", "#172554", "#1e40af"], glowA: "#60a5fa", glowB: "#38bdf8", accent: "#93c5fd" },
];

function pickPalette(tags: string[] | null, hash: number): Palette {
  if (tags && tags.length > 0) {
    const key = tags[0].toLowerCase().replace(/[^a-z]/g, "");
    if (TAG_PALETTES[key]) return TAG_PALETTES[key];
  }
  return FALLBACK_PALETTES[hash % FALLBACK_PALETTES.length];
}

// ---------------------------------------------------------------------------
// Glyphs inside the mock code window — chosen deterministically.
// ---------------------------------------------------------------------------

type GlyphLine = string[];

function buildGlyphs(hash: number, accent: string, text: string): GlyphLine[] {
  const soft = "#94a3b8";
  const lines: GlyphLine[][] = [
    // Brackets style
    [
      [`<`, accent], [`Component`, `#f0abfc`], [`>`, accent]
    ],
    // Curly style
    [
      [`const `, `#6ee7b7`], [`x`, `#93c5fd`], [` = {`, soft]
    ],
    // Terminal style
    [
      [`$ `, `#4ade80`], [text || `npm run dev`, `#e2e8f0`]
    ],
    // Arrow style
    [
      [`const `, `#6ee7b7`], [`go`, `#93c5fd`], [` = () =>`, accent]
    ],
    // Export style
    [
      [`export `, `#f0abfc`], [`default `, `#e2e8f0`], [`Post`, accent]
    ],
  ];
  return lines[hash % lines.length];
}

// ---------------------------------------------------------------------------
// SVG assembly
// ---------------------------------------------------------------------------

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface BuildOptions {
  seed: string;          // unique identity of the post (slug or id)
  tags: string[] | null; // first tag steers the palette
  label?: string;        // short text shown as the terminal/badge word
}

export function buildCoverSvg({ seed, tags, label }: BuildOptions): string {
  const hash = hashString(seed + (tags?.join(",") ?? ""));
  const h = hash;
  const pal = pickPalette(tags, hash);

  const id = (hash % 1000).toString(); // stable per-hash unique suffix

  // Floating shapes: 3 of them, positions derived from hash bits.
  // NOTE: >>> (unsigned shift) everywhere — plain >> turns the uint32 hash
  // into a negative int32 for some seeds, producing negative offsets.
  const shapes = [
    { cx: 90 + (h >>> 0) % 40, cy: 70 + ((h >>> 3) % 50), r: 90 + ((h >>> 5) % 60), fill: pal.glowA, op: 0.16 },
    { cx: 640 + ((h >>> 7) % 80), cy: 340 - ((h >>> 9) % 60), r: 110 + ((h >>> 11) % 50), fill: pal.glowB, op: 0.14 },
    { cx: 400 + ((h >>> 13) % 100) - 50, cy: 110 + ((h >>> 15) % 40), r: 60 + ((h >>> 17) % 40), fill: pal.accent, op: 0.1 },
  ];

  const dots: string[] = [];
  for (let gy = 0; gy < 3; gy++) {
    for (let gx = 0; gx < 5; gx++) {
      dots.push(
        `<circle cx="${28 + gx * 30}" cy="${28 + gy * 30}" r="1.6"/>` +
        `<circle cx="${640 + gx * 30}" cy="${350 + gy * 30}" r="1.6"/>`
      );
    }
  }

  const glyphs = buildGlyphs(hash >>> 2, pal.accent, (label ?? "").slice(0, 22));
  const glyphText = glyphs
    .map(
      ([txt, color], i) =>
        `<tspan fill="${color}">${esc(txt)}</tspan>${i < glyphs.length - 1 ? " " : ""}`
    )
    .join("");

  const svg =
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" fill="none">
<defs>
<linearGradient id="g${id}" x1="0" y1="0" x2="800" y2="450" gradientUnits="userSpaceOnUse">
<stop offset="0" stop-color="${pal.stops[0]}"/>
<stop offset="0.55" stop-color="${pal.stops[1]}"/>
<stop offset="1" stop-color="${pal.stops[2]}"/>
</linearGradient>
<radialGradient id="a${id}" cx="0.5" cy="0.5" r="0.5">
<stop offset="0" stop-color="${pal.glowA}" stop-opacity="1"/>
<stop offset="1" stop-color="${pal.glowA}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="800" height="450" fill="url(#g${id})"/>
${shapes
  .map(
    (s) =>
      `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="${s.fill}" fill-opacity="${s.op}"/>`
  )
  .join("\n")}
<g fill="${pal.accent}" fill-opacity="0.14">${dots.join("")}</g>
<g transform="translate(215 90)">
<rect width="370" height="270" rx="20" fill="#0d1117" fill-opacity="0.82" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1.5"/>
<path d="M0 20 a20 20 0 0 1 20-20 h330 a20 20 0 0 1 20 20 v20 h-370 z" fill="#ffffff" fill-opacity="0.05"/>
<circle cx="24" cy="20" r="5" fill="#f87171" fill-opacity="0.85"/>
<circle cx="44" cy="20" r="5" fill="#fbbf24" fill-opacity="0.85"/>
<circle cx="64" cy="20" r="5" fill="#34d399" fill-opacity="0.85"/>
<text x="26" y="130" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="19" xml:space="preserve">${glyphText}</text>
<rect x="26" y="150" width="150" height="10" rx="5" fill="#ffffff" fill-opacity="0.08"/>
<rect x="26" y="172" width="220" height="10" rx="5" fill="#ffffff" fill-opacity="0.06"/>
<rect x="26" y="194" width="110" height="10" rx="5" fill="#ffffff" fill-opacity="0.05"/>
<rect x="26" y="228" width="90" height="22" rx="11" fill="${pal.glowA}" fill-opacity="0.22"/>
<text x="46" y="243" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="12" fill="${pal.accent}">${esc(
    (label ?? "").slice(0, 12) || "read"
  )}</text>
</g>
</svg>`;

  return svg;
}

/**
 * Returns a data URI ready for <img src>. Deterministic per seed.
 */
export function coverArtDataUri(options: BuildOptions): string {
  const svg = buildCoverSvg(options);
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
