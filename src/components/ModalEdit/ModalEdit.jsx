import "./index.css";

export const ModalDelete = (props) => {
  return (
    <div className={`modal-wrapper ${props.isOpened ? "open" : "close"}`}>
      <div className="modal__body">
        <div className="modal__close" onClick={props.onModalClose}></div>
        <h2>{props.title}</h2>
        <hr />
        {props.children}
      </div>
    </div>
  );
};
