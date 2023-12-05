import './index.css'
import { isColorLight } from '../../utils/isColorLight'

export function Tag({background, id}) {
    return <div id={id} className={`Tag ${isColorLight(background)? 'contraste' : ''}`} style={{ background: background }}>
        <div>Label</div> <div>100</div>
    </div>
}