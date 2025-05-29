import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner.jsx";
import { apiStateStore } from "../api/ApiState.store";
import '@testing-library/jest-dom';

describe("Spinner", () => {
  beforeEach(() => {
    apiStateStore.stopLoading();
  });

  it("renders nothing when loading is false", () => {
    render(<Spinner />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders spinner when loading is true", () => {
    apiStateStore.startLoading();
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("spinner");
  });
});
