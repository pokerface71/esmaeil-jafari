import { describe, expect, it, vi } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "components/design-system/molecules/Toggle";
import ScrollProgress from "components/design-system/organisms/ScrollProgress";
import TechMarquee from "components/design-system/organisms/TechMarquee";
import AuroraBackground from "components/design-system/organisms/AuroraBackground";
import BackToTop from "components/design-system/organisms/BackToTop";
import Footer from "components/design-system/organisms/Footer";
import { renderWithProviders } from "../test-utils";

describe("ThemeToggle molecule", () => {
  it("toggles data-theme between dark and light", async () => {
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "Toggle theme" });
    await act(async () => {});

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    await userEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("light");
    await userEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});

describe("ScrollProgress organism", () => {
  it("renders the fixed progress beam", () => {
    const { container } = render(<ScrollProgress />);
    const beam = container.querySelector(".scroll-progress");
    expect(beam).toBeInTheDocument();
  });
});

describe("TechMarquee organism", () => {
  it("renders one visible group plus one aria-hidden duplicate", () => {
    render(<TechMarquee />);
    const groups = document.querySelectorAll(".marquee-group");
    expect(groups).toHaveLength(2);
    expect(groups[0].getAttribute("aria-hidden")).toBeNull();
    expect(groups[1].getAttribute("aria-hidden")).toBe("true");
    expect(screen.getAllByText("React")).toHaveLength(2);
  });
});

describe("AuroraBackground organism", () => {
  it("applies the chosen variant gradient", () => {
    const { container } = render(<AuroraBackground variant="warm" />);
    const layer = container.firstElementChild!.firstElementChild as HTMLElement;
    expect(layer.style.background).toContain("245, 158, 11");
  });
});

describe("BackToTop organism", () => {
  it("is hidden near the top and appears after scrolling", async () => {
    const { container } = renderWithProviders(<BackToTop />);
    const button = screen.getByRole("button", { name: "Back to top" });
    expect(button.className).toContain("opacity-0");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 900, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(button.className).toContain("opacity-100");
    void container;
  });

  it("scrolls to top on click", async () => {
    renderWithProviders(<BackToTop />);
    Object.defineProperty(window, "scrollY", { value: 900, writable: true });
    act(() => window.dispatchEvent(new Event("scroll")));
    await userEvent.click(screen.getByRole("button", { name: "Back to top" }));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});

describe("Footer organism", () => {
  it("renders copyright with the current year and social links", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/Esmaeil Jafari/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "LinkedIn" })).not.toHaveLength(0);
  });
});
