import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorToast from "./ErrorToast";
import { apiStateStore } from "../api/ApiState.store";

describe("ErrorToast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    apiStateStore.clearError();
  });

  it("does not render when there is no error", () => {
    render(<ErrorToast />);
    expect(screen.queryByText("×")).not.toBeInTheDocument();
  });

  it("renders error and hides on button click", () => {
    apiStateStore.setError("Something went wrong");
    render(<ErrorToast />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    fireEvent.click(screen.getByText("×"));
    expect(apiStateStore.error).toBe(null);
  });

  it("clears error automatically after timeout", async () => {
    apiStateStore.setError("Auto-dismiss error");
    render(<ErrorToast />);
    expect(screen.getByText("Auto-dismiss error")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(apiStateStore.error).toBe(null);
  });

  it("clears timeout on unmount", () => {
    const spy = vi.spyOn(global, "clearTimeout");
    apiStateStore.setError("Unmount test");
    const { unmount } = render(<ErrorToast />);

    unmount();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
