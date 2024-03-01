import { closeModal } from "../../Modal/handler";

export function handlerKeyPress({ event, setModalActive, setModelContent, ModalActive, setContainsTheObject }) {
    try {
        if (!event.key) return;
        switch (event.key) {
            case 'Escape':
                if (ModalActive) closeModal({ setModalActive, setModelContent })
                break;
            case 'Control':
                if(setContainsTheObject) setContainsTheObject(false)
                break;
            default:
                break;
        }

    } catch (err) {
        console.error('err in handlerKeyPress: ' + err)
        console.error(err)
    }
}

export function handlerKeyDown({ event, setContainsTheObject }) {
    try {
        if (!event.key) return;
        switch (event.key) {
            case 'Control':
                if(setContainsTheObject) setContainsTheObject(true)
                break;
            default:
                break;
        }

    } catch (err) {
        console.error('err in handlerKeyPress: ' + err)
        console.error(err)
    }
}