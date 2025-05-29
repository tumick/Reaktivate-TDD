import ApiGateway from "./ApiGateway";
import { safeFetch } from "./wrapFetch";

vi.mock("./wrapFetch", () => ({
  safeFetch: vi.fn(),
}));

describe("ApiGateway", () => {
  const API_BASE = "https://example.com/api/";
  const gateway = new ApiGateway();

  test("calls safeFetch on GET with full path", () => {
    gateway.get("/books");
    expect(safeFetch).toHaveBeenCalledWith(`${API_BASE}/books`);
  });

  test("calls safeFetch on POST with correct body and headers", () => {
    const payload = { title: "Book 1" };
    gateway.post("/books", payload);
    expect(safeFetch).toHaveBeenCalledWith(`${API_BASE}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  });

  test("calls safeFetch on PUT", () => {
    gateway.put("/books/123");
    expect(safeFetch).toHaveBeenCalledWith(`${API_BASE}/books/123`, {
      method: "PUT",
    });
  });
});
