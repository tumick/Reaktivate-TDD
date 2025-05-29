import ErrorToast from "./Components/ErrorToast.jsx";
import Books from "./Components/Books.jsx";
import Header from "./Components/Header.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Books />
      <ErrorToast />
    </div>
  );
}
