import React, { useRef, useEffect, useState } from 'react';
import './index.css';
import { designs } from './constants';
import { useDrawImg } from './hooks';
import { inIsOnVertex } from '../../utils/inIsOnVertex';

export function Fork({ img }) {
    const canvasRef = useRef(null);
    const [Designs, setDesigns] = useState(designs);
    const [IsDragging, setIsDragging] = useState(null);

    useDrawImg({ img, Designs, setDesigns, canvasRef });

    useEffect(() => {
        const canvas = canvasRef.current;

        const handleMouseDown = (event) => {
            const { clientX: mouseX, clientY: mouseY } = event;
            const id = inIsOnVertex({ Designs, mouseX, mouseY, canvasRef });
            setIsDragging(id);
        };

        const handleMouseMove = (event) => {
            if (IsDragging) {
                console.log(IsDragging);
                const x = event.clientX - canvasRef.current.getBoundingClientRect().left;
                const y = event.clientY - canvasRef.current.getBoundingClientRect().top;

                if (x || y) {
                    // Faça algo com x e y se necessário
                }
            }
        };

        const handleMouseUp = () => setIsDragging(null);
        const handleMouseLeave = () => setIsDragging(null);

        // Adiciona os event listeners
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Remove os event listeners quando o componente é desmontado
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [IsDragging, canvasRef]);

    return <canvas ref={canvasRef} className="Fork" id="c1" />;
}
