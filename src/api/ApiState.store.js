import { makeAutoObservable } from "mobx";

class ApiStateStore {
  error = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setError(msg) {
    this.error = msg;
  }

  clearError() {
    this.error = null;
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}

export const apiStateStore = new ApiStateStore();
