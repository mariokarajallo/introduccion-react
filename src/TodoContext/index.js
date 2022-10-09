import React from "react";
import { useLocalStorage } from "./useLocalStorage";

//al crear el contexto tambien podemos pasarle un valor inicial entre los parentesis
const TodoContext = React.createContext();

function TodoProvider(props) {
  // desestructuramos los nuevos datos de nuestro custom hook
  // Desestructuramos los datos que retornamos de nuestro custom hook, y le pasamos los argumentos que necesitamos (nombre y estado inicial)
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
  //estado de nuesta busqueda
  const [searchValue, setSearchValue] = React.useState("");

  //cantidad de TODOs completados
  const completedTodos = todos.filter((todo) => todo.completed).length;
  // cantidad total de TODOs
  const totalTodos = todos.length;

  //creamos una variable donde guardarmeos las coincidencias con la busqueda
  let searchedTodos = [];

  //!logica para filtrar
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

  //!completar todo
  const completeTodo = (text) => {
    //filtramos si el texto que recibimos es igual a el texto de un elemento del array
    // para obtener el valor de la posicion del elemento
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    //creamos un nuevo array copiando el array de todos
    const newTodos = [...todos];
    //a nuestro nuevo array a todos los elementos que cumplan con el mismo texto que recibamos, le cambiamos a true el valor de la propiedad completed
    newTodos[todoIndex].completed = true;
    //actualizamos nuestro estado mandando el nuevo array de todos
    // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
    saveTodos(newTodos);
  };

  //!eliminar todo
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
    // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
    saveTodos(newTodos);
  };

  // Retornamos nuestro proveedor con nuestro contexto en la etiqueta value, que recibirá a toda nuestra aplicación, por eso necesitamos la prop children
  return (
    <TodoContext.Provider
      value={{
        //llamamos a nuestras variables para pasarlo a AppUI
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        // Pasamos los valores de loading y error
        loading,
        error,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

// Exportamos nuestro proveedor y nuestro contexto, en el context también esta el consumer, para acceder a nuestro contexto
export { TodoContext, TodoProvider };
