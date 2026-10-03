import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Design System/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  args: { children: "Frontend Developer" },
};

export const SuccessDot: Story = {
  args: { dot: "success", children: "Available for new opportunities" },
};

export const PrimaryDot: Story = {
  args: { dot: "primary", children: "Open to work" },
};

export const MutedDot: Story = {
  args: { dot: "muted", children: "Away" },
};
