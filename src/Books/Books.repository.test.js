class MockApiGateway {
  constructor() {
    this.get = vi.fn();
    this.post = vi.fn();
    this.put = vi.fn();
  }
}

vi.mock('../api/ApiGateway.js', () => {
  return {
    default: MockApiGateway,
  };
});

// import booksRepository from './Books.repository.js';

vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid',
}));

describe('BooksRepository', () => {
  let repo;
  let gateway;

  beforeEach(async () => {
    repo = (await import('./Books.repository.js')).default;
    gateway = repo.httpGateway;
  });

  it('calls httpGateway.get with filter path', async () => {
    gateway.get.mockResolvedValueOnce([{ name: 'X' }]);

    const result = await repo.getBooks('private');
    expect(gateway.get).toHaveBeenCalledWith('/private');
    expect(result).toEqual([{ name: 'X' }]);
  });

  it('calls post with book data, returns true on ok', async () => {
    const book = { name: 'A', author: 'B', id: '123' };
    gateway.post.mockResolvedValueOnce({ status: 'ok' });

    const result = await repo.addBook(book);
    expect(gateway.post).toHaveBeenCalledWith('/', book);
    expect(result).toBe(true);
  });

  it('returns false if post result is not ok', async () => {
    gateway.post.mockResolvedValueOnce({ status: 'fail' });

    const result = await repo.addBook({ name: 'A' });
    expect(result).toBe(false);
  });

  it('calls put on /reset and returns true if ok', async () => {
    gateway.put.mockResolvedValueOnce({ status: 'ok' });

    const result = await repo.reset();
    expect(gateway.put).toHaveBeenCalledWith('/reset');
    expect(result).toBe(true);
  });

  it('returns false if reset response is not ok', async () => {
    gateway.put.mockResolvedValueOnce({ status: 'fail' });

    const result = await repo.reset();
    expect(result).toBe(false);
  });
});
