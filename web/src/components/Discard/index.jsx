import './index.css'
export function Discard({ ImgIndex, setImgIndex }) {
    return <div className="Discard is-danger" onClick={() => setImgIndex(ImgIndex + 1)}>
        <i className='fa-solid fa-trash'></i>
    </div>
} 