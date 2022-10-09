import React from "react";
import { AppUI } from "./AppUI";
import { TodoProvider } from "../TodoContext";
// lista falsa de TODOs sin local storage
// const defaultTodos = [
//   { text: "cortar cebolla", completed: true },
//   { text: "tomar el curso", completed: false },
//   { text: "hacer ejercicios", completed: false },
//   { text: "hacer tesis", completed: true },
// ];

function App() {
  return (
    <TodoProvider>
      {/* cualquier componente dentro de AppUI podra llamar a consumer */}
      <AppUI />
    </TodoProvider>
  );
}

export default App;
