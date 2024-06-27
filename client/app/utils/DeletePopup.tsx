// Modal.jsx
import React, { FC, useState } from "react";

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
  did: any;
  title: string;
  message: string;
  deleteFun: any;
};

const DeletePopup: FC<Props> = ({
  show,
  setShow,
  did,
  title,
  message,
  deleteFun,
}) => {
  if (!show) {
    return null;
  }

  const confirmDelete = (answer: boolean) => {
    if (answer === true) {
      deleteFun(did);
      setShow(false);
    }

    if (answer === false) {
      setShow(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-[20px] ">{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button
            className="confirm-btn"
            onClick={() => {
              confirmDelete(true);
            }}
          >
            Delete
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              confirmDelete(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
