import React, { useRef, useEffect, useState } from 'react';
import './index.css';
import { designs } from './constants';
import { useDrawImg, useFork } from './hooks';
import { inIsOnVertex } from '../../utils/inIsOnVertex';

export function Fork({ img }) {
    const canvasRef = useRef(null);
    const [Designs, setDesigns] = useState(designs);
    const [IsDragging, setIsDragging] = useState(null);

    useDrawImg({ img, Designs, setDesigns, canvasRef })

    // useFork({ canvasRef, Designs, a, setA })

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas.addEventListener('mousedown', event => {
            const { clientX: mouseX, clientY: mouseY } = event;

            const id = inIsOnVertex({ Designs, mouseX, mouseY, canvasRef });
            setIsDragging(id)
        });

        canvas.addEventListener('mousemove', event => {
            if (IsDragging) {
                console.log(IsDragging)
                //this._desenharCanvas();
                const x = event.clientX - canvasRef.current.getBoundingClientRect().left;
                const y = event.clientY - canvasRef.current.getBoundingClientRect().top;

                if (x || y) {
                    // setIsDragging(prevIsDragging => {
                    //     const updatedDesigns = [...Designs];
                    //     updatedDesigns[prevIsDragging].x = x;
                    //     updatedDesigns[prevIsDragging].y = y;
                    //     return prevIsDragging;
                    // });
                }
            }
        });

        canvas.addEventListener('mouseup', () => setIsDragging(null));
        canvas.addEventListener('mouseleave', () => setIsDragging(null));
    }, [IsDragging, canvasRef])

    return <canvas ref={canvasRef} className="Fork" id="c1" />;
}
