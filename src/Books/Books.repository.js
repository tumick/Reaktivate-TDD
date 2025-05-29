import { v4 as uuidv4 } from "uuid";
import ApiGateway from "../api/ApiGateway.js";

class BooksRepository {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = (filter = "") => this.httpGateway.get(`/${filter}`);

  addBook = async ({ name, author }) => {
    const result = await this.httpGateway.post("/", {
      name,
      author,
      id: uuidv4(),
    });
    return result?.status === "ok";
  };

  reset = async () => {
    const result = await this.httpGateway.put("/reset");
    return result?.status === "ok";
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
