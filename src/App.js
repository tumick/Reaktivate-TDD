import React from "react";
import ErrorToast from "./Components/ErrorToast";
import Books from "./Components/Books";
import Header from "./Components/Header";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Books />
      <ErrorToast />
    </div>
  );
}
