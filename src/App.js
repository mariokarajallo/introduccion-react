import React from "react";
import { CreateTodoButton } from "./CreateTodoButton";
import { TodoCounter } from "./TodoCounter";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { TodoSearch } from "./TodoSearch";
// import './App.css';

// lista falsa de TODOs
const defaultTodos = [
  { text: "cortar cebolla", completed: true },
  { text: "tomar el curso", completed: true },
  { text: "hcaer ejercicios", completed: true },
];
function App() {
  //estado inicial de nuestros TODOS
  const [todos, setTodos] = React.useState(defaultTodos);
  //cantidad de TODOs completados
  const completedTodos = todos.filter((todo) => todo.completed).length;
  // cantidad total de TODOs
  const totalTodos = todos.length;

  return (
    // todo lo que vamos a mostrar en nuestra aplicacion
    <React.Fragment>
      {/* Pasamos el estado a nuestro componente: cuantos TODOs completados y creados */}
      <TodoCounter total={totalTodos} completed={completedTodos} />
      <TodoSearch />
      {/* // contenedor de TODOs */}
      <TodoList>
        {/* enviar cada uno de los TODO que necesitamos */}
        {/* iteramos los elementos del array TODOS */}
        {todos.map((todo) => (
          // pasamos un identificador "KEY" unico por cada elemento
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
      {/* boton que abre el modal para crear nuevos TODO */}
    </React.Fragment>
  );
}

export default App;
