import React from "react";
import "./TodoList.css";

function TodoList(props) {
  return (
    <section>
      {/* recibimos una lista de TODOs */}
      <ul>{props.children}</ul>
    </section>
  );
}

export { TodoList };
