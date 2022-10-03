import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { TodoSearch } from "./TodoSearch";
// import './App.css';
// lista falsa de TODOs
const todos = [
  { text: "cortar cebolla", completed: false },
  { text: "tomar el curso", completed: false },
  { text: "hcaer ejercicios", completed: false },
];
function App() {
  return (
    // todo lo que vamos a mostrar en nuestra aplicacion
    <React.Fragment>
      <TodoCounter /> {/* // cuantos TODOs completados y creados */}
      <TodoSearch />
      <TodoList>
        {/* // contenedor de TODOs */}
        {/* enviar cada uno de los todo que necesitamos */}
        {/* iteramos los elementos del array todos */}
        {todos.map((todo) => (
          <TodoItem />
        ))}
      </TodoList>
      {/* boton que abre el modal para crear nuevos TODO */}
      {/* <CreateTodoButton /> */}
      <button>+</button>
    </React.Fragment>
  );
}

export default App;
