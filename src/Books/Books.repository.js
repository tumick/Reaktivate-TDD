import ApiGateway from "../api/ApiGateway.js";

class BooksRepository {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = (filter = "") => this.httpGateway.get(`/${filter}`);

  addBook = async (book) => {
    const result = await this.httpGateway.post("/", book);
    return result?.status === "ok";
  };

  reset = async () => {
    const result = await this.httpGateway.put("/reset");
    return result?.status === "ok";
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
