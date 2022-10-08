import React from "react";
import { AppUI } from "./AppUI";

// lista falsa de TODOs sin local storage
// const defaultTodos = [
//   { text: "cortar cebolla", completed: true },
//   { text: "tomar el curso", completed: false },
//   { text: "hacer ejercicios", completed: false },
//   { text: "hacer tesis", completed: true },
// ];

//! Custom Hook -> useLocalStorage
// Recibimos como parámetros el nombre y el estado inicial de nuestro item.
function useLocalStorage(itemName, initialValue) {
  //podemos utilizar otros hooks dentro de un custom hooks
  // creamos el estado inicial para nuestros errores y carga
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  // creamos un estado item y pasamos el elemento que consumimos del local storage ya convertido
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    // simulamos un segundo de delay de carga
    setTimeout(() => {
      //manejamos la tarea dentro un try/catch por si ocurre algun error
      try {
        // guardamos nuestro item en una constante y traemos nuestros datos almacenados
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        //logica para verificar si el localStorage contiene datos
        if (!localStorageItem) {
          //si el usuario es nuevo no existe un item en el localStorage, por lo tanto guardamos uno con un array vacio
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          // si existen items en el local storage los traemos y convertimos a su valor original
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
      } catch (error) {
        //en caso de un error lo guardamos en el estado
        setError(error);
      } finally {
        //tambien podemos utilizar la ultima parte del try/catch (finally) para terminar la carga
        setLoading(false);
      }
    }, 2000);
  });

  //! Creamos la función para guardar item en el localStorage
  // saveItem=saveTodos
  const saveItem = (newItem) => {
    // manejamos la tarea dentro de un try/catch por si ocurre algun error
    try {
      //convertimos a string nuestros Items
      const stringfiedItem = JSON.stringify(newItem);
      //los guardamos en el localStorage
      localStorage.setItem(itemName, stringfiedItem);
      //actualizamos nuestro estado
      setItem(newItem);
    } catch (error) {
      //en caso de algun error lo guardamos en el estado
      setError(error);
    }
  };
  // para tener un mejor control de los datos retornados, podemos regresarlos dentro de un objeto
  //retornamos los datos que necesitamos
  return {
    item,
    saveItem,
    loading,
    error,
  };
}

function App() {
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

  return (
    <AppUI
      //llamamos a nuestras variables para pasarlo a AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
      // Pasamos los valores de loading y error
      loading={loading}
      error={error}
    />
  );
}

export default App;
