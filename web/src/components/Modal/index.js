export function Modal({ModalActive, setModalActive, ModelContent, setModelContent }) {
    return <div class={`modal Modal ${ModalActive ? `is-active` : ``}`}>
        <div class="modal-background"></div>
        <div class="modal-content box">
            {ModelContent}
        </div>
        <button class="modal-close is-large" aria-label="close" onClick={() => {setModalActive(false); setModelContent(null) }}></button>
    </div>
}