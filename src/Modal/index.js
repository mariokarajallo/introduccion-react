import React from "react";
// Necesitamos ReactDOM para renderizar nuestro modal en el DOM
import ReactDOM from "react-dom";

function Modal({ children }) {
  // ReactDom tiene este método para crear portaless
  // primer parametro -> contenido modal
  // segundo parametro es el segundo nodo de nuestro HTML
  // donde mandamos a nuestro hijo y a nuestro componente modal
  return ReactDOM.createPortal(
    props.children,
    document.getElementById("modal")
  );
}

export { Modal };
