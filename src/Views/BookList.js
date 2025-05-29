import React from "react";
import BookItem from "./BookItem";

export default function BookList({ list, loading }) {
  return list ? (
    <div className={loading ? "skeleton" : ""}>
      {list.map(({ id, name, author }) => (
        <BookItem key={id} name={name} author={author} />
      ))}
    </div>
  ) : null;
}
