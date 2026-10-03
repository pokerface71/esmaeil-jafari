import type { Meta, StoryObj } from "@storybook/react";
import { FaCalendarAlt, FaGlobe, FaBolt, FaRocket, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { SkillCard } from "./SkillCard";
import { SectionHeader } from "./SectionHeader";
import { StatCard } from "./StatCard";
import { SocialListRow } from "./SocialIconLink";
import { ContactInfoItem } from "./ContactInfoItem";

const meta = {
  title: "Design System/Molecules/Compositions",
  parameters: { docs: { autodocs: false } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SkillCardDefault: Story = {
  name: "SkillCard",
  render: () => (
    <SkillCard
      Icon={FaRocket}
      name="React"
      color="text-cyan-400"
      tile="bg-cyan-500/10"
      glow="bg-cyan-400"
      ring="border-cyan-400/25"
    />
  ),
};

export const SkillCardGrid: Story = {
  name: "SkillCard grid",
  render: () => (
    <div className="grid grid-cols-4 gap-4 max-w-2xl">
      {[
        { name: "HTML5", color: "text-orange-400", tile: "bg-orange-500/10", glow: "bg-orange-500", ring: "border-orange-400/25", Icon: FaRocket },
        { name: "React", color: "text-cyan-400", tile: "bg-cyan-500/10", glow: "bg-cyan-400", ring: "border-cyan-400/25", Icon: FaRocket },
        { name: "Next.js", color: "text-slate-200", tile: "bg-slate-400/10", glow: "bg-slate-300", ring: "border-slate-300/20", Icon: FaGlobe },
        { name: "TypeScript", color: "text-blue-300", tile: "bg-blue-400/10", glow: "bg-blue-400", ring: "border-blue-300/25", Icon: FaBolt },
      ].map((s) => (
        <SkillCard key={s.name} {...s} delay={`${Math.random()}s`} />
      ))}
    </div>
  ),
};

export const SectionHeaderDefault: Story = {
  name: "SectionHeader",
  render: () => (
    <SectionHeader
      num="01"
      chip="About Me"
      title="Turning ideas into"
      highlight="reality"
    />
  ),
};

export const SectionHeaderWithSubtitle: Story = {
  name: "SectionHeader + subtitle",
  render: () => (
    <SectionHeader
      num="05"
      chip="Get In Touch"
      title="Let's Work"
      highlight="Together"
      subtitle="Crafting elegant, high-performance web experiences."
    />
  ),
};

export const StatCardDefault: Story = {
  name: "StatCard",
  render: () => (
    <StatCard
      id="stat-demo"
      value="10+"
      label="Years of Experience"
      icon={<FaCalendarAlt />}
      tone="violet"
      index="01.1"
    />
  ),
};

export const StatCardRow: Story = {
  name: "StatCard row",
  render: () => (
    <div className="flex gap-6">
      <StatCard value="10+" label="Years" icon={<FaCalendarAlt />} tone="violet" index="01.1" />
      <StatCard value="6" label="Companies" icon={<FaGlobe />} tone="fuchsia" index="01.2" />
      <StatCard value="50+" label="Projects" icon={<FaBolt />} tone="amber" index="01.3" />
    </div>
  ),
};

export const SocialListRowDefault: Story = {
  name: "SocialListRow",
  render: () => (
    <SocialListRow
      href="https://wa.me/989035954105"
      label="WhatsApp"
      sublabel="+98 903 595 4105"
      icon={<FaWhatsapp />}
      tone="green"
    />
  ),
};

export const ContactInfoItemDefault: Story = {
  name: "ContactInfoItem",
  render: () => (
    <ContactInfoItem
      icon={<FaMapMarkerAlt />}
      category="Location"
      value="Tehran, Iran"
      tone="sky"
    />
  ),
};
