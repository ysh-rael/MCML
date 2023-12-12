import React, { useState } from 'react';
import './index.css';
import { useContentCard } from './hooks';

export function Card({ principal, img }) {
    const iconLoading = <i className="fa-solid fa-spinner fa-pulse"></i>;
    const [card, setCard] = useState(null);

    useContentCard({ src: (img && img.src) ? img.src : null, setCard, iconLoading });

    const handleDragStart = (event) => {
        // Verifica se o card é principal antes de iniciar o arraste
        if (!principal) {
            event.preventDefault(); // Impede o início do arraste
        }
    };

    return (
        <div
            className={`Card ${principal ? 'principal' : ''}`}
            draggable={true} // Sempre permite o arraste, mas verifica em handleDragStart
            onDragStart={handleDragStart}
        >
            {card}
        </div>
    );
}
