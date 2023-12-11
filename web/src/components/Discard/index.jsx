import './index.css'
export function Discard({ ImgIndex, setImgIndex }) {
    return <div className="Discard is-danger" onClick={() => {
        setImgIndex(ImgIndex++)
    }}>
        <i className='fa-solid fa-trash'></i>
    </div>
} 