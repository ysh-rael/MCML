import { useEffect, useState } from 'react'
import './index.css'
import { useContentCard } from './hooks'
export function Card({ principal, src }) {
    const iconLoading = <i className="fa-solid fa-spinner fa-pulse"></i>
    const [card, setCard] = useState(null)

    useContentCard({ src, setCard, iconLoading });

    return <div className={`Card ${principal ? 'principal' : ''}`} draggable={principal}>
        {card}
    </div>
}