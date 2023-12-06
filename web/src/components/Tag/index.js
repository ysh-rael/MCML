import './index.css'
import { isColorLight } from '../../utils/isColorLight'

export function Tag({background, id, label}) {
    return <div id={id} className={`Tag ${isColorLight(background)? 'contraste' : ''}`} style={{ background: background }}>
        <div>{label}</div> <div>100</div>
    </div>
}