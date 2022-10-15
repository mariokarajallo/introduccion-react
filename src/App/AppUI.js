import React from "react";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoCounter } from "../TodoCounter";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoSearch } from "../TodoSearch";
import { TodoContext } from "../TodoContext";
import { Modal } from "../Modal";

function AppUI() {
  // Desesctructuramos los valores de nuestro contexto
  const {
    error,
    loading,
    completeTodo,
    deleteTodo,
    searchedTodos,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);

  return (
    // todo lo que vamos a mostrar en nuestra aplicacion
    <React.Fragment>
      {/* Pasamos el estado a nuestro componente: cuantos TODOs completados y creados */}
      <TodoCounter />
      {/* total={totalTodos} completed={completedTodos} */}
      <TodoSearch />
      {/* searchValue={searchValue} setSearchValue={setSearchValue} */}
      {/* // contenedor de TODOs */}
      {/* Podemos acceder a nuestro contexto con el consumer
      <TodoContext.Consumer> 
        {() => (*/}
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
      {/*)}
       </TodoContext.Consumer> */}
      {/* preguntamos si open modal es true */}
      {!!openModal && (
        <Modal>
          {/* preguntamos si existe un elemento del array de TODO antes de imprimir su propiedad texto */}
          <p>{searchedTodos[0]?.text}</p>
        </Modal>
      )}

      {/* boton que abre el modal para crear nuevos TODO */}
      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}

export { AppUI };
