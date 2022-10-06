import React from "react";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoCounter } from "../TodoCounter";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoSearch } from "../TodoSearch";
// import './App.css';

// lista falsa de TODOs
const defaultTodos = [
  { text: "cortar cebolla", completed: true },
  { text: "tomar el curso", completed: false },
  { text: "hacer ejercicios", completed: false },
  { text: "hacer tesis", completed: true },
];
function App() {
  //estado de nuesta busqueda
  const [searchValue, setSearchValue] = React.useState("");

  //estado inicial de nuestros TODOS
  const [todos, setTodos] = React.useState(defaultTodos);
  //cantidad de TODOs completados
  const completedTodos = todos.filter((todo) => todo.completed).length;
  // cantidad total de TODOs
  const totalTodos = todos.length;

  //creamos una variable donde guardarmeos las coincidencias con la busqueda
  let searchedTodos = [];

  //logica para filtrar
  if (!searchValue.length >= 1) {
    // guardamos nuestros todos a la variable coincidencias
    searchedTodos = todos;
  } else {
    //filtramos
    searchedTodos = todos.filter((todo) => {
      //pasamos todos los elementos del array TODO a minuscula
      const todoText = todo.text.toLocaleLowerCase();
      //pasamos todos los palabras cargardas en el input a minuscula
      const searchText = searchValue.toLocaleLowerCase();

      //devolvemos los elementos que coincidan
      return todoText.includes(searchText);
    });
  }

  //completar todo
  const completeTodo = (text) => {
    //filtramos si el texto que recibimos es igual a el texto de un elemento del array
    // para obtener el valor de la posicion del elemento
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    //creamos un nuevo array copiando el array de todos
    const newTodos = [...todos];
    //a nuestro nuevo array a todos los elementos que cumplan con el mismo texto que recibamos, le cambiamos a true el valor de la propiedad completed
    newTodos[todoIndex].completed = true;
    //actualizamos nuestro estado mandando el nuevo array de todos
    setTodos(newTodos);
  };

  //eliminar todo
  // recibe un texto
  const deleteTodo = (text) => {
    //filtramos si el texto que recibimos es igual a el texto de un elemento del array TODO
    // para obtener el valor de la posicion del elemento
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    //creamos un nuevo array copiando el array de todos
    const newTodos = [...todos];
    //a nuestro nuevo array, eliminamos los elementos que coinciden con el texto recibido
    //.splice(donde inicia el corte, cuantos elementos desde el inicio del corte)
    newTodos.splice(todoIndex, 1);
    //actualizamos nuestro estado mandando el nuevo array de todos
    setTodos(newTodos);
  };

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

export default App;
