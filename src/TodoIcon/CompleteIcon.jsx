import React from "react";
import { TodoIcon } from "./Index";

function completeIcon({ completed, onComplete }) {
  return (
    <TodoIcon
      type="check"
      color={completed ? "#4caf50" : "gray"}
      onClick={onComplete}
    ></TodoIcon>
  );
}

export { completeIcon };
