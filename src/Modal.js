import React from 'react';
import './Modal.css';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ show, handleClose,docid, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      {/* <CloseIcon/> */}
      <>Preview Document {docid}</> <button onClick={handleClose}>Close</button>
        {children}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default Modal;
