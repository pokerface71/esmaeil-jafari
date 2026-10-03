import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const semanticColors = [
  { name: "--background", css: "hsl(var(--background))" },
  { name: "--foreground", css: "hsl(var(--foreground))" },
  { name: "--card", css: "hsl(var(--card))" },
  { name: "--primary", css: "hsl(var(--primary))" },
  { name: "--secondary", css: "hsl(var(--secondary))" },
  { name: "--muted", css: "hsl(var(--muted))" },
  { name: "--accent", css: "hsl(var(--accent))" },
  { name: "--destructive", css: "hsl(var(--destructive))" },
  { name: "--border", css: "hsl(var(--border))" },
  { name: "--ring", css: "hsl(var(--ring))" },
];

const gradients = [
  { name: "--gradient-primary", css: "var(--gradient-primary)" },
  { name: "--gradient-cta", css: "var(--gradient-cta)" },
  { name: "--gradient-accent", css: "var(--gradient-accent)" },
  { name: "--gradient-warm", css: "var(--gradient-warm)" },
  { name: "--gradient-cool", css: "var(--gradient-cool)" },
];

const radii = [
  { name: "--radius-sm", css: "calc(var(--radius) - 4px)" },
  { name: "--radius-md", css: "calc(var(--radius) - 2px)" },
  { name: "--radius-lg", css: "var(--radius)" },
];

const Swatch: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex flex-col items-center gap-2 w-24">
    <div
      className="w-20 h-20 rounded-2xl border border-white/10"
      style={{ background: color }}
    />
    <code className="text-[10px] text-muted-foreground text-center">{label}</code>
  </div>
);

const meta = {
  title: "Design System/Foundations/Design Tokens",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Single source of truth from `styles/tokens.css`. Semantic colors are HSL triplets swapped by the `[data-theme='light']` override — switch the theme in the toolbar to see every swatch react. Nothing in the design system may hardcode a color; everything consumes these tokens.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen p-10 space-y-12">
      <section>
        <h2 className="text-lg font-bold mb-1">Semantic Colors</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Consumed as <code>hsl(var(--token))</code> / Tailwind tokens via the
          <code> @theme</code> bridge.
        </p>
        <div className="flex flex-wrap gap-4">
          {semanticColors.map((c) => (
            <Swatch key={c.name} color={c.css} label={c.name} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-1">Gradients</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Brand gradients for text, CTAs and surfaces.
        </p>
        <div className="flex flex-wrap gap-4">
          {gradients.map((g) => (
            <div key={g.name} className="flex flex-col items-center gap-2 w-40">
              <div
                className="w-36 h-16 rounded-2xl border border-white/10"
                style={{ background: g.css }}
              />
              <code className="text-[10px] text-muted-foreground">{g.name}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-1">Radii</h2>
        <div className="flex flex-wrap items-end gap-4">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2 w-24">
              <div
                className="w-20 h-16 border border-white/15 bg-white/5"
                style={{ borderRadius: r.css }}
              />
              <code className="text-[10px] text-muted-foreground">{r.name}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-1">Glass surfaces</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Frosted utility classes layered on the page background.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["glass", "glass-light", "glass-card"].map((cls) => (
            <div key={cls} className={`${cls} rounded-3xl p-6 h-28 flex items-center`}>
              <code className="text-xs text-muted-foreground">.{cls}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
