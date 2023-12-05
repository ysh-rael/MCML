import './index.css'

export function Tag({contraste, background}) {
    return <div className={`Tag ${contraste? 'contraste' : ''}`} style={{ background: background }}>
        <div>Label</div> <div>100</div>
    </div>
}