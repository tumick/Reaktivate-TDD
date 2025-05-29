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
