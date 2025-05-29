import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders without crashing and includes layout elements", () => {
    render(<App />);
    expect(screen.getByText(/Your books:/i)).toBeInTheDocument(); // Header
    expect(screen.getByText(/Reset private books/i)).toBeInTheDocument(); // Books
  });
});
