import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "./Toggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

const meta = {
  title: "Design System/Molecules/Controls",
  parameters: { docs: { autodocs: false } }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeToggleDefault: Story = {
  name: "ThemeToggle",
  parameters: {
    docs: {
      description: {
        story:
          "Reads/writes ThemeProvider state. Toggle the theme in the Storybook toolbar to see the icon swap (moon in dark, sun in light)."
      }
    }
  },
  render: () => <ThemeToggle />
};

export const LanguageSwitcherDefault: Story = {
  name: "LanguageSwitcher",
  parameters: {
    docs: {
      description: {
        story:
          "Flag dropdown wired to I18nProvider. Use the Locale toolbar global to preview RTL layouts (fa/ar), or click a flag here."
      }
    }
  },
  render: () => <LanguageSwitcher />
};
