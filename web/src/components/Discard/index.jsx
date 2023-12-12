import './index.css'
export function Discard({ ImgIndex, setImgIndex }) {

    function nextImgIndex() {
        try {
            setImgIndex(ImgIndex + 1)
        } catch (err) {
            console.log(err)
        }
    }

    return <div className="Discard is-danger" onClick={nextImgIndex} onDrop={nextImgIndex} onDragOver={event => event.preventDefault()}
    >
        <i className='fa-solid fa-trash'></i>
    </div>
} 