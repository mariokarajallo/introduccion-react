import React from "react";
import { TodoIcon } from "./Index";

function DeleteIcon({ onDelete }) {
  return <TodoIcon type="delte" onClick={onDelete}></TodoIcon>;
}

export { DeleteIcon };
