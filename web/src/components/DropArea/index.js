import { isColorLight } from '../../utils/isColorLight'
import { Bttn } from '../Bttn'
import { Tag } from '../Tag'
import './index.css'
function editLabel(event) {
    console.clear()
    console.log(event)
}
const iconPincel = <i className='fa-solid fa-pen-to-square iconPincel' onClick={editLabel}></i>
export function DropArea({ label, background, tags, setTags }) {
    const idTag = Date.now()
    const arrayTags = tags
    arrayTags.push(<Tag background={background} id={`Tag-${idTag}`}/>)
    setTags(arrayTags)
    
    return <div className={`DropArea`} style={{ background: background }} draggable={true}>
    <span className={`subtitle ${isColorLight(background)? 'contraste' : ''}`}>{iconPincel} {label}</span>
        <input type='hidden'></input>
        <Bttn background={'is-danger'} userStatedIcon={'fa-solid fa-trash-can'} idTag={idTag} setTags={setTags} tags={tags} />
    </div>
}