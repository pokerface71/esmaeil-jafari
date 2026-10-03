import type { Meta, StoryObj } from "@storybook/react";
import { FaRocket, FaCode, FaBolt, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";
import { GlassCard } from "./GlassCard";
import { IconBox } from "./IconBox";

const meta = {
  title: "Design System/Atoms/Surfaces",
  parameters: { docs: { autodocs: false } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const GlassCardDefault: Story = {
  name: "GlassCard",
  render: () => (
    <GlassCard className="rounded-3xl p-8 w-80">
      <div>
        <h3 className="font-bold text-lg mb-2">Frosted surface</h3>
        <p className="text-sm text-muted-foreground">
          The base surface of every card in the design system.
        </p>
      </div>
    </GlassCard>
  ),
};

export const GlassCardSpotlight: Story = {
  name: "GlassCard (spotlight)",
  render: () => (
    <GlassCard spotlight className="rounded-3xl p-8 w-80">
      <p className="text-sm text-muted-foreground">
        Move the cursor over this card — the radial glow follows the pointer.
      </p>
    </GlassCard>
  ),
};

const toneIcons = {
  violet: <FaRocket />,
  fuchsia: <FaBolt />,
  sky: <FaGlobe />,
  amber: <FaBolt />,
  green: <FaPhone />,
  blue: <FaCode />,
  pink: <FaEnvelope />,
} as const;

export const IconBoxMatrix: Story = {
  name: "IconBox tone × size matrix",
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          {(["violet", "fuchsia", "sky", "amber", "green", "blue", "pink"] as const).map(
            (tone) => (
              <IconBox key={tone} tone={tone} size={size} icon={toneIcons[tone]} />
            )
          )}
        </div>
      ))}
    </div>
  ),
};
