import React, { useRef, useEffect, useState } from 'react';
import './index.css';
import { designs } from './constants';
import { DrawImg, useDrawImg } from './hooks';
import { inIsOnVertex } from '../../utils/inIsOnVertex';
import { DrawFork, useFork } from './handler';

export function Fork({ img }) {
    const canvasRef = useRef(null);
    const [Designs, setDesigns] = useState(designs);
    const [IsDragging, setIsDragging] = useState(null);

    useDrawImg({ img, Designs, setDesigns, canvasRef });

    useFork({ canvasRef, setIsDragging, IsDragging, Designs, setDesigns, img })

    return <canvas ref={canvasRef} className="Fork" id="c1" />;
}
