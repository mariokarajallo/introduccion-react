import React from "react";
import "./TodoItem.css";
import { CompleteIcon } from "../TodoIcon/CompleteIcon";
import { DeleteIcon } from "../TodoIcon/DeleteICon";
function TodoItem(props) {
  // const onDelete = () => {
  //   alert("Ya eliminaste el TODO " + props.text);
  // };

  return (
    <li className="TodoItem">
      {/* <span
        className={`Icon Icon-check ${props.completed && "Icon-check--active"}`}
        // recibimos como parametro desde app
        onClick={props.onComplete}
      >
        ✔
      </span> */}
      <CompleteIcon completed={props.completed} onComplete={props.onComplete} />
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>
        {props.text}
      </p>
      {/* <span
        className={`Icon Icon-delete`}
        // recibimos como parametro desde app
        onClick={props.onDelete}
      >
        X
      </span> */}
      <DeleteIcon onDelete={props.onDelete} />
    </li>
  );
}

export { TodoItem };
