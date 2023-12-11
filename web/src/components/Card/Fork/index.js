import React, { useRef, useEffect, useState } from 'react';
import { init } from './handler';
import './index.css';
import { designs } from './constants';

export function Fork() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const [Designs, setDesigns] = useState(designs)

        DrawFork({ctx, Designs, setDesigns});

    }, []);

    return <canvas ref={canvasRef} className="Fork" id="c1" />;
}
