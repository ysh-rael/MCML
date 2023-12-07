import { useState } from 'react'
import './index.css'
export function Card({ principal }) {
    const iconLoading = <i className="fa-solid fa-spinner fa-pulse"></i>
    const [card, SetCard] = useState(iconLoading)
    
    return <div className={`Card ${principal ? 'principal' : ''}`} draggable={principal}>
       {card}
    </div>
}