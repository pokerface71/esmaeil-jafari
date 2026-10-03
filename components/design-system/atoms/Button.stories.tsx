import type { Meta, StoryObj } from "@storybook/react";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "./Button";

const meta = {
  title: "Design System/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Get In Touch" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", children: "View Experience" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Get In Touch" },
};

export const Default: Story = {
  args: { variant: "default" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Destructive: Story = {
  args: { variant: "destructive" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: (
      <>
        Next <FaArrowRight className="text-xs" />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true },
};
