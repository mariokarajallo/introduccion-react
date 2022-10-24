import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton(props) {
  const onClickButton = () => {
    // prevState devuelve el estado anterior a nuestra actualizacion
    // retornamos un valor (true o false) para que vuelva a actualizarce entonces devolvemos la negacion del estado anterior
    props.setOpenModal((prevState) => !prevState);
  };
  return (
    <button className="CreateTodoButton" onClick={onClickButton}>
      +
    </button>
  );
}

export { CreateTodoButton };
