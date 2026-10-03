import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { render } from "@testing-library/react";
import React from "react";
import { useRevealOnScroll, useSpotlight } from "components/design-system/hooks";
import { MockIntersectionObserver } from "../../vitest.setup";

describe("useRevealOnScroll", () => {
  it("returns an empty map initially", () => {
    const { result } = renderHook(() => useRevealOnScroll());
    expect(result.current).toEqual({});
  });

  it("marks observed elements visible when they intersect", () => {
    // Arrange: put observed elements in the DOM before running the hook
    const { container } = render(
      <div>
        <div id="a" data-animate="a" />
        <div id="b" data-animate="b" />
      </div>
    );

    const io = MockIntersectionObserver.instances.at(-1)!;
    expect(io.elements.size).toBe(0);

    const { result, rerender } = renderHook(() => useRevealOnScroll());

    // The hook's effect ran after render — query the observer created inside it
    const hookObserver = MockIntersectionObserver.instances.at(-1)!;

    act(() => {
      hookObserver.triggerAll(true);
      // trigger setState, then re-read
      void rerender;
    });

    expect(result.current["a"]).toBe(true);
    expect(result.current["b"]).toBe(true);
    void container;
    void io;
  });

  it("does not flip entries when elements are not intersecting", () => {
    const { result } = renderHook(() => useRevealOnScroll());
    const hookObserver = MockIntersectionObserver.instances.at(-1)!;
    act(() => hookObserver.triggerAll(false));
    expect(result.current).toEqual({});
  });
});

describe("useSpotlight", () => {
  it("sets --mx/--my custom properties on the closest [data-spot] element", () => {
    function Probe() {
      useSpotlight();
      return (
        <div data-spot className="spot-card" style={{ width: 200, height: 100 }}>
          <button>inner</button>
        </div>
      );
    }
    const { container } = render(<Probe />);
    const card = container.querySelector("[data-spot]") as HTMLElement;

    const rect = { left: 10, top: 20, width: 200, height: 100 };
    vi.spyOn(card, "getBoundingClientRect").mockReturnValue(
      rect as unknown as DOMRect
    );

    act(() => {
      const event = new MouseEvent("mousemove", { clientX: 60, clientY: 45 });
      Object.defineProperty(event, "target", { value: container.querySelector("button") });
      document.dispatchEvent(event);
    });

    expect(card.style.getPropertyValue("--mx")).toBe("50px");
    expect(card.style.getPropertyValue("--my")).toBe("25px");
  });

  it("removes the listener on unmount", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useSpotlight());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
