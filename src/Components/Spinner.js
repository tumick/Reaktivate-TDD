import React from "react";
import { observer } from "mobx-react";
import { apiStateStore } from "../api/ApiState.store";

const Spinner = observer(() => {
  return apiStateStore.loading ? <div className="spinner"></div> : null;
});

export default Spinner;
