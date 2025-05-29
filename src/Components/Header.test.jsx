import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { bookStore } from "../Books/Books.store";
import { apiStateStore } from "../api/ApiState.store";

vi.mock("./ModeSwitch.jsx", () => ({
  default: () => <div data-testid="mode-switch">ModeSwitch</div>,
}));
vi.mock("./Spinner.jsx", () => ({
  default: () => <div data-testid="spinner">Spinner</div>,
}));

describe("Header", () => {
  beforeEach(() => {
    bookStore.books = [{ id: "1", name: "Test", author: "A" }];
    apiStateStore.loading = false;
  });

  it("renders count of books", () => {
    render(<Header />);
    expect(screen.getByText("Your books:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders skeleton class when loading", () => {
    apiStateStore.loading = true;
    render(<Header />);
    expect(screen.getByText("1").className).toContain("skeleton");
  });

  it("renders ModeSwitch and Spinner", () => {
    render(<Header />);
    expect(screen.getByTestId("mode-switch")).toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
