import { renderHook } from "@testing-library/react";
import useWindowWidth from "./useWindowWidth";
import { act } from "react-dom/test-utils";

describe("useWindowWidth", () => {
  it("returns the initial window width", () => {
    const { result } = renderHook(() => useWindowWidth());

    expect(result.current).toBe(window.innerWidth);
  });

  it("updates the window width on resize", () => {
    const { result } = renderHook(() => useWindowWidth());

    const newWidth = 1024;

    act(() => {
      window.innerWidth = newWidth;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(newWidth);
  });

  it("cleans up event listener on unmount", () => {
    const { unmount } = renderHook(() => useWindowWidth());

    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });
});
