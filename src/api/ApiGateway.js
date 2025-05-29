import "dotenv";
import { safeFetch } from "./wrapFetch";

const apiBase = import.meta.env.VITE_API_BASE;

export default class ApiGateway {
  get = (path) => safeFetch(`${apiBase}${path}`);

  post = (path, payload) =>
    safeFetch(`${apiBase}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  put = (path) =>
    safeFetch(`${apiBase}${path}`, {
      method: "PUT",
    });
}
