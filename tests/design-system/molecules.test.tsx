import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaRocket, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import {
  SkillCard,
  SectionHeader,
  StatCard,
  SocialIconLink,
  SocialListRow,
  ContactInfoItem,
} from "components/design-system/molecules";
import { LanguageSwitcher } from "components/design-system/molecules/LanguageSwitcher";
import { renderWithProviders } from "../test-utils";

describe("SkillCard molecule", () => {
  const base = {
    Icon: FaRocket,
    name: "React",
    color: "text-cyan-400",
    tile: "bg-cyan-500/10",
    glow: "bg-cyan-400",
    ring: "border-cyan-400/25",
  };

  it("renders the skill name and icon tile", () => {
    render(<SkillCard {...base} />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("starts hidden and animates in when visible", () => {
    const { container, rerender } = render(<SkillCard {...base} isVisible={false} />);
    const card = container.firstElementChild as HTMLElement;
    expect(card).toHaveClass("opacity-0", "scale-90");

    rerender(<SkillCard {...base} isVisible />);
    expect(card).toHaveClass("animate-scale-in");
  });

  it("forwards id for IntersectionObserver targeting", () => {
    const { container } = render(<SkillCard {...base} id="skill-3" />);
    const card = container.firstElementChild as HTMLElement;
    expect(card).toHaveAttribute("id", "skill-3");
    expect(card).toHaveAttribute("data-animate", "skill-3");
    expect(card).toHaveAttribute("data-spot");
  });
});

describe("SectionHeader molecule", () => {
  it("renders chip, plain + highlighted title", () => {
    render(
      <SectionHeader num="01" chip="About Me" title="Turning ideas into" highlight="reality" />
    );
    expect(screen.getByText("About Me")).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Turning ideas into");
    expect(heading.querySelector(".gradient-text")).toHaveTextContent("reality");
  });

  it("renders the ghost number with parallax attribute", () => {
    const { container } = render(
      <SectionHeader num="02" chip="s" title="t" parallaxSpeed={0.06} />
    );
    const ghost = container.querySelector(".ghost-num");
    expect(ghost).toHaveAttribute("data-parallax", "0.06");
    expect(ghost).toHaveAttribute("aria-hidden", "true");
  });

  it("renders optional subtitle", () => {
    render(<SectionHeader chip="c" title="t" subtitle="hello sub" />);
    expect(screen.getByText("hello sub")).toBeInTheDocument();
  });
});

describe("StatCard molecule", () => {
  it("renders value, label and index", () => {
    render(
      <StatCard id="stat-1" value="10+" label="Years" icon={<FaRocket />} index="01.1" />
    );
    expect(screen.getByText("10+")).toBeInTheDocument();
    expect(screen.getByText("Years")).toBeInTheDocument();
    expect(screen.getByText("01.1")).toBeInTheDocument();
  });

  it("is a spotlight glass card with reveal animation classes", () => {
    const { container } = render(
      <StatCard value="50" label="p" icon={<FaRocket />} isVisible={false} />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card).toHaveClass("glass-card", "spot-card", "opacity-0");
  });
});

describe("SocialIconLink molecule", () => {
  it("renders an external link with aria-label", () => {
    render(
      <SocialIconLink href="https://x.com" label="LinkedIn" icon={<FaLinkedin />} />
    );
    const link = screen.getByRole("link", { name: "LinkedIn" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("SocialListRow molecule", () => {
  it("renders label, sublabel and external href", () => {
    render(
      <SocialListRow
        href="https://wa.me/1"
        label="WhatsApp"
        sublabel="+98 900 000 0000"
        icon={<FaWhatsapp />}
        tone="green"
      />
    );
    const link = screen.getByRole("link", { name: /WhatsApp/ });
    expect(link).toHaveAttribute("href", "https://wa.me/1");
    expect(screen.getByText("+98 900 000 0000")).toBeInTheDocument();
  });
});

describe("ContactInfoItem molecule", () => {
  it("renders category and value", () => {
    render(
      <ContactInfoItem
        icon={<span />}
        category="Email"
        value="me@example.com"
        tone="fuchsia"
      />
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("me@example.com")).toBeInTheDocument();
  });
});

describe("LanguageSwitcher molecule", () => {
  it("shows the current locale flag and opens the dropdown", async () => {
    renderWithProviders(<LanguageSwitcher />);
    const trigger = screen.getByRole("button", { name: "Switch language" });
    expect(trigger).toHaveTextContent("🇺🇸");

    await userEvent.click(trigger);
    expect(
      screen.getByRole("button", { name: "فارسی" })
    ).toBeInTheDocument();
  });

  it("switches locale and persists it", async () => {
    renderWithProviders(<LanguageSwitcher />);
    await userEvent.click(
      screen.getByRole("button", { name: "Switch language" })
    );
    await userEvent.click(screen.getByRole("button", { name: "Türkçe" }));
    await vi.waitFor(() =>
      expect(window.localStorage.getItem("locale")).toBe("tr")
    );
  });
});
