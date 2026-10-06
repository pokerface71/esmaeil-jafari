import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
// test-utils must come first: it registers the `next/navigation` mock that
// Header's SearchParamWatcher relies on (useSearchParams never returns null).
import { renderWithProviders } from "../test-utils";
import NotFoundTemplate from "components/design-system/templates/NotFoundTemplate";

/**
 * The global 404 page must follow the design system: Header/Footer shell,
 * code-chip + two-tone heading, and working links back into the site.
 * Copy is asserted in English because tests run with the default locale.
 */
describe("NotFoundTemplate", () => {
  it("renders the design-system heading with the 404 chip", () => {
    renderWithProviders(<NotFoundTemplate />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/^Page\s*Not Found$/);

    // decorative ghost number + code-chip both show the status code
    expect(screen.getAllByText("404").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Error 404")).toBeInTheDocument();
  });

  it("links back home and to the blog", () => {
    renderWithProviders(<NotFoundTemplate />);

    const home = screen.getByRole("link", { name: "Back to Home" });
    expect(home).toHaveAttribute("href", "/");

    const blog = screen.getByRole("link", { name: "Browse the Blog" });
    expect(blog).toHaveAttribute("href", "/en/blog");
  });

  it("keeps the site shell (header nav + footer)", () => {
    renderWithProviders(<NotFoundTemplate />);

    expect(screen.getAllByRole("navigation").length).toBeGreaterThan(0);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the Persian copy when the locale is fa", () => {
    window.localStorage.setItem("locale", "fa");
    renderWithProviders(<NotFoundTemplate />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "پیدا نشد"
    );
    expect(
      screen.getByRole("link", { name: "بازگشت به خانه" })
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("link", { name: "مشاهده وبلاگ" })
    ).toHaveAttribute("href", "/fa/blog");
  });
});
