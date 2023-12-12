export function closeModal({ setModalActive, setModelContent }) {
    try {
        setModalActive(false); setModelContent(null)
    } catch (err) {
        console.log(err)
    }
}