import { useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import { bookStore } from "../Books/Books.store";
import { apiStateStore } from "../api/ApiState.store";
import BookList from "../Views/BookList.jsx";
import NewBookForm from "../Views/NewBook.form.jsx";

const Books = observer(() => {
  useEffect(() => {
    if (bookStore.books === null) {
      bookStore.loadBooks();
    }
  }, []);

  const addNewBook = useCallback((book) => {
    bookStore.addBook(book);
  });

  const resetPrivateBooks = useCallback(() => {
    bookStore.reset();
  });

  return (
    <>
      <BookList list={bookStore.books} loading={apiStateStore.loading} />
      <NewBookForm onSubmit={addNewBook} loading={apiStateStore.loading} />
      <button onClick={resetPrivateBooks} disabled={apiStateStore.loading}>
        Reset private books
      </button>
    </>
  );
});

export default Books;
