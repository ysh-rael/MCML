import { useEffect, useState } from "react";
import { Draw } from "../../../utils/Draw";
import { inIsOnVertex } from "../../../utils/inIsOnVertex";
import { DrawImg } from "../hooks";

export function DrawFork({ ctx, Designs, setDesigns, maxWidth, maxHeight }) {

    if (Designs.length)
        Designs.forEach((esse, index) => {
            if (maxWidth && esse.x >= maxWidth) {
                const newValue = maxWidth - esse.ray
                const temp = Designs
                temp[index].x = newValue
                setDesigns(temp)
                esse.x = newValue
            }

            if (maxHeight && esse.y >= maxHeight) {
                const newValue = maxHeight - esse.ray
                const temp = Designs
                temp[index].y = newValue
                setDesigns(temp)
                esse.y = newValue
            }

            const { height, width, x, y, color, form, ray, idElem1, idElem2 } = esse;
            switch (form) {
                case 'circle':
                    Draw.circle({ ctx, x, y, ray, color })
                    break;

                case 'line':
                    if (!idElem1 || !idElem2) return;
                    Draw.line({ ctx, color, Designs, idElem1, idElem2 })
                    break;
                default:
                    Draw.rect({ ctx, x, y, color, width, height })
                    break;
            }
        })

}

export function useFork({ canvasRef, setIsDragging, IsDragging, Designs, setDesigns, img }) {
    useEffect(() => {
        const canvas = canvasRef.current;

        const handleMouseDown = (event) => {
            const { clientX: mouseX, clientY: mouseY } = event;
            const id = inIsOnVertex({ Designs, mouseX, mouseY, canvasRef });
            setIsDragging(id);
        };

        const handleMouseMove = (event) => {
            if (IsDragging) {
                const x = event.clientX - canvasRef.current.getBoundingClientRect().left;
                const y = event.clientY - canvasRef.current.getBoundingClientRect().top;

                if (x && y) {
                    const index = Designs.findIndex(esse => esse.id === IsDragging)
                    Designs[index].x = x
                    Designs[index].y = y
                    setDesigns(Designs)

                    DrawImg({ img, Designs, setDesigns, canvasRef })
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
}
