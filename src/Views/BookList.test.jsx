import { render, screen } from "@testing-library/react";
import BookList from "./BookList";
import '@testing-library/jest-dom';

describe("BookList", () => {
  const sampleBooks = [
    { id: "1", name: "Book 1", author: "Author 1" },
    { id: "2", name: "Book 2", author: "Author 2" },
  ];

  it("renders nothing if list is null", () => {
    const { container } = render(<BookList list={null} loading={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders list of BookItem components", () => {
    render(<BookList list={sampleBooks} loading={false} />);
    expect(screen.getByText("Author 1: Book 1")).toBeInTheDocument();
    expect(screen.getByText("Author 2: Book 2")).toBeInTheDocument();
  });

  it('adds "skeleton" class when loading is true', () => {
    const { container } = render(<BookList list={sampleBooks} loading={true} />);
    expect(container.firstChild).toHaveClass("skeleton");
  });

  it('does not add "skeleton" class when loading is false', () => {
    const { container } = render(<BookList list={sampleBooks} loading={false} />);
    expect(container.firstChild).not.toHaveClass("skeleton");
  });
});
