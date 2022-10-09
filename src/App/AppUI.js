import React from "react";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoCounter } from "../TodoCounter";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoSearch } from "../TodoSearch";
import { TodoContext } from "../TodoContext";

function AppUI() {
  return (
    // todo lo que vamos a mostrar en nuestra aplicacion
    <React.Fragment>
      {/* Pasamos el estado a nuestro componente: cuantos TODOs completados y creados */}
      <TodoCounter />
      {/* total={totalTodos} completed={completedTodos} */}
      <TodoSearch />
      {/* searchValue={searchValue} setSearchValue={setSearchValue} */}
      {/* // contenedor de TODOs */}

      {/* Podemos acceder a nuestro contexto con el consumer */}
      <TodoContext.Consumer>
        {({ error, loading, completeTodo, deleteTodo, searchedTodos }) => (
          <TodoList>
            {/* Mostramos un mensaje en caso de que ocurra algún error */}
            {error && <p>Desesperate hay un error...</p>}
            {/* Mostramos un mensaje de cargando, cuando la aplicación está cargando los datos*/}
            {loading && <p>Estamos cargando, no desesperes... </p>}
            {/* Si terminó de cargar y no existen TODOs, se muestra un mensaje para crear el primer TODO */}
            {!loading && !searchedTodos.length && <p> Crea tu primer TODO!</p>}

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
        )}
      </TodoContext.Consumer>
      <CreateTodoButton />
      {/* boton que abre el modal para crear nuevos TODO */}
    </React.Fragment>
  );
}

export { AppUI };
