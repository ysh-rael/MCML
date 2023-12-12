import { closeModal } from "../../Modal/handler";

export function handlerKeyPress({ event, setModalActive, setModelContent, ModalActive }) {
    try {
        if (event.key && event.key === 'Escape' && ModalActive) closeModal({ setModalActive, setModelContent })
    } catch (err) {
        console.error('err in handlerKeyPress: ' + err)
        console.error(err)
    }
}