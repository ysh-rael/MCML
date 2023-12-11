import React, { useRef, useEffect, useState } from 'react';
import { DrawFork, init } from './handler';
import './index.css';
import { designs } from './constants';

export function Fork({ img }) {
    const canvasRef = useRef(null);
    const [Designs, setDesigns] = useState(designs);

    useEffect(() => {
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

    }, [img, Designs]);

    function handleMouseDown(event) {
        alert('ok')
    }
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', handleMouseDown);
    }, [])

    return <canvas ref={canvasRef} className="Fork" id="c1" />;
}
