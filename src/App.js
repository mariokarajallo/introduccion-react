import React from "react";
import { CreateTodoButton } from "./CreateTodoButton";
import { TodoCounter } from "./TodoCounter";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { TodoSearch } from "./TodoSearch";
// import './App.css';
// lista falsa de TODOs
const todos = [
  { text: "cortar cebolla", completed: true },
  { text: "tomar el curso", completed: false },
  { text: "hcaer ejercicios", completed: false },
];
function App() {
  return (
    // todo lo que vamos a mostrar en nuestra aplicacion
    <React.Fragment>
      <TodoCounter /> {/* // cuantos TODOs completados y creados */}
      <TodoSearch />
      {/* // contenedor de TODOs */}
      <TodoList>
        {/* enviar cada uno de los TODO que necesitamos */}
        {/* iteramos los elementos del array TODOS */}
        {todos.map((todo) => (
          // pasamos un identificador "KEY" unico por cada elemento
          <TodoItem key={todo.text} text={todo.text} />
        ))}
      </TodoList>
      <CreateTodoButton />
      {/* boton que abre el modal para crear nuevos TODO */}
    </React.Fragment>
  );
}

export default App;
