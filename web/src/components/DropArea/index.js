import { Bttn } from '../Bttn'
import './index.css'
function editLabel(event) {
    console.clear()
    console.log(event)
}
const iconPincel = <i className='fa-solid fa-pen-to-square iconPincel' onClick={editLabel}></i>
export function DropArea({label, background: _background}) {
    return <div className='DropArea' style={{background: _background}} draggable={true}>
        <span className='subtitle'>{iconPincel} {label}</span>
        <input type='hidden'></input>
            <Bttn background={'is-danger'} userStatedIcon={'fa-solid fa-trash-can'}/>
    </div>
}