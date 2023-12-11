import React, { useRef, useEffect, useState } from 'react';
import './index.css';
import { designs } from './constants';
import { useDrawImg } from './hooks';
import { inIsOnVertex } from '../../utils/inIsOnVertex';
import { DrawFork } from './handler';

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

                if (x && y) {
                    console.log(`x: ${x}`)
                    console.log(`y: ${y}`)
                    const index = Designs.findIndex(esse => esse.id === IsDragging)
                    Designs[index].x = x
                    Designs[index].y = y
                    setDesigns(Designs)

                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');

                    // Função para carregar e desenhar a imagem no canvas
                    const drawImageOnCanvas = () => {
                        const image = new Image();
                        image.src = img?.src; // Verifica se img e img.src são definidos

                        // Evento onload é usado para garantir que a imagem foi carregada antes de desenhá-la
                        image.onload = () => {
                            // Configura a largura e a altura do canvas com base nas dimensões da imagem
                            canvas.width = image.width;
                            canvas.height = image.height;

                            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                            // Certifique-se de que designs é uma matriz antes de chamar DrawFork
                            const validDesigns = Array.isArray(Designs) ? Designs : [];
                            DrawFork({ ctx, Designs: validDesigns, setDesigns });
                        };
                    };

                    drawImageOnCanvas();
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
