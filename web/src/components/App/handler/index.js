import { closeModal } from "../../Modal/handler";

export function handlerKeyPress({ event, setModalActive, setModelContent, ModalActive }) {
    try {

        if (!event.key) return;
        switch (event.key) {
            case 'Escape':
                if (ModalActive) closeModal({ setModalActive, setModelContent })
                break;
            default:
                break;
        }

    } catch (err) {
        console.error('err in handlerKeyPress: ' + err)
        console.error(err)
    }
}