import React, { useRef, useEffect, useState } from 'react';
import { DrawFork, handleMouseDown, init } from './handler';
import './index.css';
import { designs } from './constants';
import { useDrawImg, useFork } from './hooks';

export function Fork({ img }) {
    const canvasRef = useRef(null);
    const [Designs, setDesigns] = useState(designs);

    useDrawImg({ img, Designs, setDesigns, canvasRef })

    useFork({ canvasRef, Designs })

    return <canvas ref={canvasRef} className="Fork" id="c1" />;
}
