import React from "react";
import { TodoContext } from "../TodoContext";
import "./TodoForm.css";

function TodoForm() {
  //creamos un estado para nuestro nuevo TODO desde el modal
  const [newTodoValue, setNewTodoValue] = React.useState("");

  // destructuramos las funciones que necesitamos para anadir un TODO y cerrar nuestro modal
  const { addTodo, setOpenModal } = React.useContext(TodoContext);

  //creamos un funcion para actualizar el estado de nuestro nuevo TODO
  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  //funcion para cerrar el modal
  const onCancel = () => {
    setOpenModal(false);
  };

  //funcion para agregar nuestro nuevo TODO desde el modal
  const onSubmit = (event) => {
    //prevente default para evitar recargar la pagina (evento por defecto de un formulario)
    event.preventDefault();

    //utilizamos nuestra funcion para anadir nuestro TODO
    addTodo(newTodoValue);

    //cerramos nuestro modal
    setOpenModal(false);

    //tambien estaria bien resetear nuestro formulario
    setNewTodoValue("");
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Escribe tu nuevo TODO</label>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="agrega tu nuevo TODO..."
      ></textarea>
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="TodoForm-button TodoForm-button--add">
          Anadir
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
