import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable, runInAction } from "mobx";
import booksRepository from "../Books/Books.repository";

export class BookStore {
  books = null;
  filter = "";

  constructor() {
    makeAutoObservable(this);
  }

  get count() {
    return this.books?.length || 0;
  }

  setFilter(value) {
    this.filter = value;
    this.loadBooks();
  }

  async loadBooks() {
    let data = [];
    try {
      data = await booksRepository.getBooks(this.filter);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.books = data;
      });
    }
  }

  async addBook(book) {
    try {
      if (!book.id) {
        book.id = uuidv4() // Since backend does not assign IDs for private books, we generate a unique ID here
      }
      if (await booksRepository.addBook(book)) {
        runInAction(() => {
          this.books = [...this.books, book];
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async reset() {
    try {
      if (await booksRepository.reset()) {
        this.loadBooks();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export const bookStore = new BookStore();
