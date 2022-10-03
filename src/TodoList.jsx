import React, { Children } from "react";

function TodoList(props) {
  return <section>{props.Children}</section>;
}

export { TodoList };
