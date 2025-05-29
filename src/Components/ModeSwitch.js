import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { bookStore } from "../Books/Books.store";
import { apiStateStore } from "../api/ApiState.store";

const ModeSwitch = observer(() => {
  const handleAll = useCallback(() => {
    bookStore.setFilter("");
  });

  const handlePrivate = useCallback(() => {
    bookStore.setFilter("private");
  });

  return (
    <div className="mode-switch">
      <label>
        <input
          type="radio"
          checked={bookStore.filter === ""}
          onChange={handleAll}
          disabled={apiStateStore.loading}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          checked={bookStore.filter === "private"}
          onChange={handlePrivate}
          disabled={apiStateStore.loading}
        />
        Private
      </label>
    </div>
  );
});

export default ModeSwitch;
