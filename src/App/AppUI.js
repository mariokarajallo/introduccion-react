import React from "react";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoCounter } from "../TodoCounter";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoSearch } from "../TodoSearch";

function AppUI({
  totalTodos,
  completedTodos,
  searchValue,
  setSearchValue,
  searchedTodos,
  completeTodo,
  deleteTodo,
}) {
  return (
    // todo lo que vamos a mostrar en nuestra aplicacion
    <React.Fragment>
      {/* Pasamos el estado a nuestro componente: cuantos TODOs completados y creados */}
      <TodoCounter total={totalTodos} completed={completedTodos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      {/* // contenedor de TODOs */}
      <TodoList>
        {/* enviar cada uno de los TODO que necesitamos */}
        {/* iteramos los elementos del array searchedTodos que coinciden con nuestra busqueda */}
        {searchedTodos.map((todo) => (
          // pasamos un identificador "KEY" unico por cada elemento
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
      {/* boton que abre el modal para crear nuevos TODO */}
    </React.Fragment>
  );
}

export { AppUI };
