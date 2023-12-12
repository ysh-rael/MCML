import React, { useEffect, useCallback } from "react";
import { closeModal } from "./handler";

export function Modal({ ModalActive, setModalActive, ModelContent, setModelContent }) {

    const _closeModal = () => closeModal({ setModalActive, setModelContent });

    return (
        <div className={`modal Modal ${ModalActive ? `is-active` : ``}`}>
            <div className="modal-background" onClick={_closeModal}></div>
            <div className="modal-content box">{ModelContent}</div>
            <button className="modal-close is-large" aria-label="close" onClick={_closeModal}></button>
        </div>
    );
}
