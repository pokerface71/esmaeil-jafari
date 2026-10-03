import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Badge,
  Button,
  CodeChip,
  GlassCard,
  GradientText,
  IconBox,
  SkillTag,
} from "components/design-system/atoms";

describe("Badge atom", () => {
  it("renders its label", () => {
    render(<Badge>Available</Badge>);
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("renders a status dot when requested", () => {
    const { container } = render(<Badge dot="success">Ready</Badge>);
    expect(container.querySelector("span.relative")).toBeInTheDocument();
  });

  it("has no dot by default", () => {
    const { container } = render(<Badge>Plain</Badge>);
    expect(container.querySelector("span.relative.flex")).toBeNull();
  });
});

describe("IconBox atom", () => {
  it("renders the icon with default tone/size", () => {
    render(<IconBox icon={<span data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies the tone classes", () => {
    const { container } = render(
      <IconBox icon={<span />} tone="fuchsia" />
    );
    expect(container.firstChild).toHaveClass("bg-fuchsia-500/15");
  });
});

describe("CodeChip atom", () => {
  it("renders label and optional number", () => {
    render(
      <CodeChip num="01">
        <span>About</span>
      </CodeChip>
    );
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("uses the .code-chip design-system class", () => {
    render(<CodeChip>x</CodeChip>);
    expect(screen.getByText("x").closest(".code-chip")).toBeInTheDocument();
  });
});

describe("GlassCard atom", () => {
  it("renders glass-card surface", () => {
    render(
      <GlassCard>
        <p>content</p>
      </GlassCard>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.getByText("content").parentElement).toHaveClass("glass-card");
  });

  it("adds data-spot and spot-card when spotlight is enabled", () => {
    render(<GlassCard spotlight>glow</GlassCard>);
    const el = screen.getByText("glow");
    expect(el).toHaveAttribute("data-spot");
    expect(el).toHaveClass("spot-card");
  });

  it("can render as a section", () => {
    render(
      <GlassCard as="section">
        <p>sec</p>
      </GlassCard>
    );
    expect(screen.getByText("sec").closest("section")).toBeInTheDocument();
  });
});

describe("SkillTag atom", () => {
  it("wraps content in the .skill-tag utility class", () => {
    render(<SkillTag>React</SkillTag>);
    expect(screen.getByText("React")).toHaveClass("skill-tag");
  });
});

describe("GradientText atom", () => {
  it("applies .gradient-text and renders as span by default", () => {
    render(<GradientText>Jafari</GradientText>);
    const el = screen.getByText("Jafari");
    expect(el).toHaveClass("gradient-text");
    expect(el.tagName).toBe("SPAN");
  });

  it("supports heading tags", () => {
    render(<GradientText as="h2">Title</GradientText>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Title");
  });
});

describe("Button atom", () => {
  it("defaults to type=button", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
      "type",
      "button"
    );
  });

  it("applies the primary CTA utility class", () => {
    render(<Button variant="primary">Go</Button>);
    expect(screen.getByRole("button", { name: "Go" })).toHaveClass("btn-primary");
  });

  it("applies the secondary utility class", () => {
    render(<Button variant="secondary">No</Button>);
    expect(screen.getByRole("button", { name: "No" })).toHaveClass("btn-ghost");
  });

  it("fires onClick and respects disabled state", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();

    rerender(<Button onClick={onClick} disabled>
      Click
    </Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
