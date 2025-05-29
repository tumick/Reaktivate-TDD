import { render, screen, fireEvent } from "@testing-library/react";
import NewBookForm from "./NewBook.form.jsx";
import '@testing-library/jest-dom';

describe("NewBookForm", () => {
  it("renders inputs and button", () => {
    render(<NewBookForm onSubmit={() => {}} loading={false} />);
    expect(screen.getByPlaceholderText("Author")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls onSubmit with form data", () => {
    const onSubmit = vi.fn();
    render(<NewBookForm onSubmit={onSubmit} loading={false} />);

    fireEvent.change(screen.getByPlaceholderText("Author"), {
      target: { value: "Ray Bradbury" },
    });
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Fahrenheit 451" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      author: "Ray Bradbury",
      name: "Fahrenheit 451",
    });
  });

  it("disables inputs and button when loading is true", () => {
    render(<NewBookForm onSubmit={() => {}} loading={true} />);
    expect(screen.getByPlaceholderText("Author")).toBeDisabled();
    expect(screen.getByPlaceholderText("Name")).toBeDisabled();
    expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
  });
});
