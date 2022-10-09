import React from "react";

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

export { useLocalStorage };
