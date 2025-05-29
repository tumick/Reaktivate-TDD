import "dotenv";
import ApiGateway from "./ApiGateway";
import { safeFetch } from "./wrapFetch";

const apiBase = import.meta.env.VITE_API_BASE;

vi.mock("./wrapFetch", () => ({
  safeFetch: vi.fn(),
}));

describe("ApiGateway", () => {
  const gateway = new ApiGateway();

  test("calls safeFetch on GET with full path", () => {
    gateway.get("/books");
    expect(safeFetch).toHaveBeenCalledWith(`${apiBase}/books`);
  });

  test("calls safeFetch on POST with correct body and headers", () => {
    const payload = { title: "Book 1" };
    gateway.post("/books", payload);
    expect(safeFetch).toHaveBeenCalledWith(`${apiBase}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  });

  test("calls safeFetch on PUT", () => {
    gateway.put("/books/123");
    expect(safeFetch).toHaveBeenCalledWith(`${apiBase}/books/123`, {
      method: "PUT",
    });
  });
});
