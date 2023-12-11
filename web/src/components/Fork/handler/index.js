import { useEffect, useState } from "react";
import { Draw } from "../../../utils/Draw";
import { inIsOnVertex } from "../../../utils/inIsOnVertex";

export function DrawFork({ ctx, Designs, setDesigns }) {

    if (Designs.length)
        Designs.forEach(esse => {
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
var isDragging;

export function handlerMouseDown({ event, Designs, canvasRef }) {
    const { clientX: mouseX, clientY: mouseY } = event;

    const id = inIsOnVertex({ Designs, mouseX, mouseY, canvasRef });
    isDragging = id
}



export function handlerMousemove({ event, Designs, canvasRef }) {
    if (isDragging) {
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
}


export function handlerClear() {
    isDragging = null
}