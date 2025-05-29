import React, { useCallback, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { apiStateStore } from "../api/ApiState.store";

const AUTO_DISMISS_MS = 5_000;

const ErrorToast = observer(() => {
  const timeoutRef = useRef(null);

  const closeToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    apiStateStore.clearError();
  }, []);

  useEffect(() => {
    if (!apiStateStore?.error) return;

    timeoutRef.current = setTimeout(() => {
      apiStateStore.clearError();
      timeoutRef.current = null;
    }, AUTO_DISMISS_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [apiStateStore?.error]);

  return apiStateStore?.error ? (
    <div className="toast-error">
      {apiStateStore.error}
      <button onClick={closeToast}>×</button>
    </div>
  ) : null;
});

export default ErrorToast;
