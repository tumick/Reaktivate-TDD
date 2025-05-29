import React from "react";
import { observer } from "mobx-react";
import { bookStore } from "../Books/Books.store";
import { apiStateStore } from "../api/ApiState.store";
import ModeSwitch from "./ModeSwitch";
import Spinner from "./Spinner";

const Header = observer(() => {
  return (
    <div className="header">
      Your books:
      <span className={apiStateStore.loading ? "skeleton" : ""}>
        {bookStore.count}
      </span>
      <ModeSwitch />
      <Spinner />
    </div>
  );
});

export default Header;
