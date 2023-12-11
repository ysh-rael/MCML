import React, { useRef, useEffect, useState } from 'react';
import { DrawFork, init } from './handler';
import './index.css';
import { designs } from './constants';

export function Fork() {
    const canvasRef = useRef(null);
    const [Designs, setDesigns] = useState(designs)

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        DrawFork({ ctx, Designs, setDesigns });

    }, []);

    return <canvas ref={canvasRef} className="Fork" id="c1" />;
}
