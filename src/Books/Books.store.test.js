vi.mock('../Books/Books.repository.js', () => ({
  default: {
    getBooks: vi.fn(),
    addBook: vi.fn(),
    reset: vi.fn(),
  },
}));

vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid',
}));

import { BookStore } from './Books.store.js';
import booksRepository from '../Books/Books.repository.js';

describe('BookStore', () => {
  let store;

  beforeEach(() => {
    store = new BookStore();
    store.books = []; // інакше addBook розіб'ється на null
    vi.clearAllMocks();
  });

  it('count returns 0 when books is null', () => {
    store.books = null;
    expect(store.count).toBe(0);
  });

  it('count returns number of books', () => {
    store.books = [{ name: 'A' }, { name: 'B' }];
    expect(store.count).toBe(2);
  });

  it('setFilter sets filter and loads books', async () => {
    booksRepository.getBooks.mockResolvedValueOnce([{ name: 'Filtered' }]);

    await store.setFilter('private');

    expect(store.filter).toBe('private');
    expect(booksRepository.getBooks).toHaveBeenCalledWith('private');
    expect(store.books).toEqual([{ name: 'Filtered' }]);
  });

  it('addBook generates id if missing and adds to list', async () => {
    booksRepository.addBook.mockResolvedValueOnce(true);

    const book = { name: 'New', author: 'Someone' };

    await store.addBook(book);

    expect(book.id).toBe('mocked-uuid');
    expect(booksRepository.addBook).toHaveBeenCalledWith(book);
    expect(store.books).toContainEqual(book);
  });

  it('addBook does not add book if repo fails', async () => {
    booksRepository.addBook.mockResolvedValueOnce(false);

    const book = { name: 'Fail', author: 'X' };

    await store.addBook(book);

    expect(store.books).not.toContainEqual(book);
  });

  it('reset calls booksRepository.reset and reloads books', async () => {
    booksRepository.reset.mockResolvedValueOnce(true);
    booksRepository.getBooks.mockResolvedValueOnce([{ name: 'X' }]);

    await store.reset();

    expect(booksRepository.reset).toHaveBeenCalled();
    expect(store.books).toEqual([{ name: 'X' }]);
  });

  it('reset does not reload if reset fails', async () => {
    booksRepository.reset.mockResolvedValueOnce(false);

    await store.reset();

    expect(booksRepository.getBooks).not.toHaveBeenCalled();
  });
});
