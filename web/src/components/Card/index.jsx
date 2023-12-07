import { useState } from 'react'
import './index.css'
export function Card({ principal }) {
    const iconLoading = <i className="fa-solid fa-spinner fa-pulse"></i>
    const [card, SetCard] = useState(iconLoading)
    
    return <div className={`Card ${principal ? 'principal' : ''}`} draggable={principal}>
        {/*
        <img className='img' src='https://images.pexels.com/photos/19262597/pexels-photo-19262597.jpeg?auto=compress&cs=tinysrgb&h=350' />
          */}
       {card}
    </div>
}