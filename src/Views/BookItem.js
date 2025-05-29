import React from "react";

export default function BookItem({ name, author }) {
  return (
    <div>
      {author}: {name}
    </div>
  );
}
