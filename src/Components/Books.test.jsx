import { render, screen, fireEvent } from "@testing-library/react";
import { runInAction } from "mobx";
import Books from "./Books";
import { bookStore } from "../Books/Books.store";
import { apiStateStore } from "../api/ApiState.store";

// Моки
vi.mock("../Views/BookList.jsx", () => ({
  default: ({ list }) => <div>BookList length: {list?.length}</div>,
}));

vi.mock("../Views/NewBook.form.jsx", () => ({
  default: ({ onSubmit, loading }) => (
    <button disabled={loading} onClick={() => onSubmit({ author: "Test", name: "Book" })}>
      Submit NewBookForm
    </button>
  ),
}));

describe("Books", () => {
  beforeEach(() => {
    runInAction(() => {
      bookStore.books = null;
      apiStateStore.loading = false;
    });

    vi.spyOn(bookStore, "loadBooks").mockImplementation(() => {
      runInAction(() => {
        bookStore.books = [];
      });
    });

    vi.spyOn(bookStore, "addBook").mockImplementation(() => {});
    vi.spyOn(bookStore, "reset").mockImplementation(() => {});
  });

  it("calls loadBooks on mount when books is null", () => {
    render(<Books />);
    expect(bookStore.loadBooks).toHaveBeenCalled();
  });

  it("renders BookList with books", () => {
    runInAction(() => {
      bookStore.books = [ { id: "1", name: "Book", author: "Author" } ];
    });
    render(<Books />);
    expect(screen.getByText("BookList length: 1")).toBeInTheDocument();
  });

  it("calls addBook when NewBookForm submits", () => {
    runInAction(() => {
      bookStore.books = [];
    });
    render(<Books />);
    fireEvent.click(screen.getByText("Submit NewBookForm"));
    expect(bookStore.addBook).toHaveBeenCalledWith({ author: "Test", name: "Book" });
  });

  it("calls reset when Reset button clicked", () => {
    runInAction(() => {
      bookStore.books = [];
    });
    render(<Books />);
    fireEvent.click(screen.getByText("Reset private books"));
    expect(bookStore.reset).toHaveBeenCalled();
  });

  it("disables reset button when loading is true", () => {
    runInAction(() => {
      apiStateStore.loading = true;
      bookStore.books = [];
    });
    render(<Books />);
    expect(screen.getByText("Reset private books")).toBeDisabled();
  });
});
