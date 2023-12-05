import { Bttn } from '../Bttn'
import { Tag } from '../Tag'
import './index.css'

function editLabel(event) {
    console.clear()
    console.log(event)
}
const iconPincel = <i className='fa-solid fa-pen-to-square iconPincel' onClick={editLabel}></i>
export function DropArea({ label, background, _tags, _setTags }) {
    const idTag = Date.now()
    const arrayTags = _tags
    arrayTags.push(<Tag contraste={true} background={background} id={`Tag-${idTag}`}/>)
    _setTags(arrayTags)
    
    return <div className='DropArea' style={{ background: background }} draggable={true}>
        <span className='subtitle'>{iconPincel} {label}</span>
        <input type='hidden'></input>
        <Bttn background={'is-danger'} userStatedIcon={'fa-solid fa-trash-can'} idTag={idTag} _setTags={_setTags} _tags={_tags} />
    </div>
}