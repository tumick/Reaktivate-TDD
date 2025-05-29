import { apiStateStore } from "./ApiState.store";

// Add some delay for realistic
const MAX_TIME_MS = 1_000;

const randomTime = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * MAX_TIME_MS));

export async function safeFetch(url, options) {
  let res;
  apiStateStore.clearError();
  apiStateStore.startLoading();
  
  try {
    await randomTime();
    res = await fetch(url, options);
  } catch (error) {
    apiStateStore.setError(error.message);
    throw error;
  } finally {
    apiStateStore.stopLoading();
  }
  if (!res.ok) {
    const error = `Error: HTTP ${res.status}`;
    apiStateStore.setError(error);
    throw new Error(error);
  }

  return res.json();
}
