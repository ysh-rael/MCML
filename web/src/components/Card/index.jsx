import { useEffect, useState } from 'react'
import './index.css'
import { useContentCard } from './hooks'
import { Fork } from './Fork'
export function Card({ principal, img }) {
    const iconLoading = <i className="fa-solid fa-spinner fa-pulse"></i>
    const [card, setCard] = useState(null)

    useContentCard({ src: (img && img.src) ? img.src : null, setCard, iconLoading });

    return <div className={`Card ${principal ? 'principal' : ''}`} draggable={principal}>
        {card}
        <Fork />
    </div>
}