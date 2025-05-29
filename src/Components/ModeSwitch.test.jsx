import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import ModeSwitch from "./ModeSwitch.jsx";
import { bookStore } from "../Books/Books.store";
import { apiStateStore } from "../api/ApiState.store";
import '@testing-library/jest-dom';

describe("ModeSwitch", () => {
  beforeEach(() => {
    act(() => {
      bookStore.setFilter("");
      apiStateStore.stopLoading();
    });
  });

  it("renders both radio buttons", () => {
    render(<ModeSwitch />);
    expect(screen.getByLabelText("All")).toBeInTheDocument();
    expect(screen.getByLabelText("Private")).toBeInTheDocument();
  });

  it("marks 'All' as checked if filter is ''", () => {
    act(() => {
      bookStore.setFilter("");
    });
    render(<ModeSwitch />);
    expect(screen.getByLabelText("All")).toBeChecked();
    expect(screen.getByLabelText("Private")).not.toBeChecked();
  });

  it("marks 'Private' as checked if filter is 'private'", () => {
    act(() => {
      bookStore.setFilter("private");
    });
    render(<ModeSwitch />);
    expect(screen.getByLabelText("Private")).toBeChecked();
    expect(screen.getByLabelText("All")).not.toBeChecked();
  });

  it("calls setFilter('') on 'All' change", () => {
    act(() => {
      bookStore.setFilter("private");
    });
    const spy = vi.spyOn(bookStore, "setFilter");
    render(<ModeSwitch />);
    fireEvent.click(screen.getByLabelText("All"));
    expect(spy).toHaveBeenCalledWith("");
    spy.mockRestore();
  });

  it("calls setFilter('private') on 'Private' change", () => {
    const spy = vi.spyOn(bookStore, "setFilter");
    render(<ModeSwitch />);
    fireEvent.click(screen.getByLabelText("Private"));
    expect(spy).toHaveBeenCalledWith("private");
    spy.mockRestore();
  });

  it("disables buttons when loading is true", () => {
    act(() => {
      apiStateStore.startLoading();
    });
    render(<ModeSwitch />);
    expect(screen.getByLabelText("All")).toBeDisabled();
    expect(screen.getByLabelText("Private")).toBeDisabled();
    act(() => {
      apiStateStore.stopLoading();
    });
  });
});
