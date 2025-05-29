import { API_BASE } from "./config";
import { safeFetch } from "./wrapFetch";

export default class ApiGateway {
  get = (path) => safeFetch(`${API_BASE}${path}`);

  post = (path, payload) =>
    safeFetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
  put = (path) =>
    safeFetch(`${API_BASE}${path}`, {
      method: "PUT",
    });
}
