import React, { useState, useCallback } from "react";

const NewBookForm = React.memo(({ onSubmit, loading }) => {
  const [form, setForm] = useState({ author: "", name: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      console.log("handleSubmit");
      e.preventDefault();
      onSubmit(form);
    },
    [form, onSubmit]
  );

  return (
    <div className="new-book-form">
      New book:
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          disabled={loading}
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Add
        </button>
      </form>
    </div>
  );
});

export default NewBookForm;
