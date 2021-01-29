import React from "react";

const Modal = ({ id, buttonText, buttonIcon, className, title, children }) => {
  return (
    <div>
      <button 
        type="button" 
        className={!className ? 'btn btn-primary' : className}
        data-bs-toggle="modal" 
        data-bs-target={`#${id}`}
      >
        <i className={`${buttonIcon} mx-1`}></i>
        {buttonText}
      </button>

      <div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {title}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body  p-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
