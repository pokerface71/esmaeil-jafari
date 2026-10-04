import type { Meta, StoryObj } from "@storybook/react";
import { CodeChip } from "./CodeChip";
import { SkillTag } from "./SkillTag";
import { GradientText } from "./GradientText";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./Card";

const meta = {
  title: "Design System/Atoms/Text Primitives",
  parameters: { docs: { autodocs: false } }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CodeChipDefault: Story = {
  name: "CodeChip",
  render: () => <CodeChip num="01">About Me</CodeChip>
};

export const SkillTagRow: Story = {
  name: "SkillTag",
  render: () => (
    <div className="flex flex-wrap gap-2">
      {["React", "Next.js", "TypeScript", "Redux", "Tailwind", "Zustand"].map(
        (t) => (
          <SkillTag key={t}>{t}</SkillTag>
        )
      )}
    </div>
  )
};

export const GradientTextDefault: Story = {
  name: "GradientText",
  render: () => <GradientText as="h2">Esmaeil Jafari</GradientText>
};

export const CardDefault: Story = {
  name: "Card composition",
  render: () => (
    <Card className="w-80 glass-card rounded-3xl p-6">
      <CardHeader className="p-0">
        <CardTitle className="text-lg">Compose freely</CardTitle>
        <CardDescription>
          shadcn-compatible primitives over design tokens.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-4 text-sm text-muted-foreground">
        Card parts can be used standalone or inside GlassCard surfaces.
      </CardContent>
      <CardFooter className="p-0 pt-4">
        <SkillTag>Atom</SkillTag>
      </CardFooter>
    </Card>
  )
};
