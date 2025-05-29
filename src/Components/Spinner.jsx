import { observer } from "mobx-react";
import { apiStateStore } from "../api/ApiState.store";

const Spinner = observer(() => {
  return apiStateStore.loading ? (
    <div className="spinner" role="status" aria-label="Loading..."></div>
  ) : null;
});

export default Spinner;
