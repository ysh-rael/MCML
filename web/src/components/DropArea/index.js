import { isColorLight } from '../../utils/isColorLight'
import { Bttn } from '../Bttn'
import { deleteThis } from './deleteThis'
import { generatorTag } from './generatorTag'
import './index.css'
function editLabel(event) {
    console.clear()
    console.log(event)
}
const iconPincel = <i className='fa-solid fa-pen-to-square iconPincel' onClick={editLabel}></i>
export function DropArea({ label, background, tags, setTags }) {
    
    const id = generatorTag({ label, background, tags, setTags })
    if (!id) console.log('Tag was not created.')

    return <div className={`DropArea`} style={{ background: background }} draggable={true} id={`DropArea-${id}`}>
        <span className={`subtitle ${isColorLight(background) ? 'contraste' : ''}`}>{iconPincel} {label}</span>
        <input type='hidden'></input>
        <Bttn background={'is-danger'} userStatedIcon={'fa-solid fa-trash-can'} id={id} setTags={setTags} tags={tags} onClick={() => deleteThis(id)} />
    </div>
}