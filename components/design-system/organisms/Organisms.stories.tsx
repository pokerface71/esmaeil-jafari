import type { Meta, StoryObj } from "@storybook/react";
import AuroraBackground from "./AuroraBackground";
import AnimatedRays from "./AnimatedRays";
import TechMarquee from "./TechMarquee";
import Footer from "./Footer";
import Header from "./Header";

const meta = {
  title: "Design System/Organisms/Layout",
  parameters: { layout: "fullscreen", docs: { autodocs: false } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AuroraVariants: Story = {
  name: "AuroraBackground variants",
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-[640px] mx-auto py-10">
      {(["default", "hero", "warm", "cool", "purple"] as const).map((v) => (
        <div
          key={v}
          className="relative h-40 rounded-3xl overflow-hidden border border-white/10"
        >
          <AuroraBackground variant={v} />
          <span className="absolute top-3 left-4 text-xs font-mono text-muted-foreground z-10">
            {v}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const RaysDefault: Story = {
  name: "AnimatedRays",
  render: () => (
    <div className="relative h-80 w-[560px] mx-auto my-10 overflow-hidden rounded-3xl border border-white/10 bg-[#06060b]">
      <AnimatedRays />
    </div>
  ),
};

export const RaysMuted: Story = {
  name: "AnimatedRays (muted)",
  render: () => (
    <div className="relative h-80 w-[560px] mx-auto my-10 overflow-hidden rounded-3xl border border-white/10 bg-[#06060b]">
      <AnimatedRays muted />
    </div>
  ),
};

export const MarqueeDefault: Story = {
  name: "TechMarquee",
  render: () => <TechMarquee />,
};

export const HeaderDefault: Story = {
  name: "Header",
  render: () => (
    <div className="pt-24">
      <Header />
    </div>
  ),
};

export const FooterDefault: Story = {
  name: "Footer",
  render: () => <Footer />,
};
