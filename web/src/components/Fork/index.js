import React, { useRef, useEffect, useState } from 'react';
import { DrawFork, handleMouseDown, init } from './handler';
import './index.css';
import { designs } from './constants';
import { useDrawImg } from './hooks';

export function Fork({ img }) {
    const canvasRef = useRef(null);
    const [Designs, setDesigns] = useState(designs);

    useDrawImg({ img, Designs, setDesigns, canvasRef })


    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', event => handleMouseDown(event));
    }, [])

    return <canvas ref={canvasRef} className="Fork" id="c1" />;
}
