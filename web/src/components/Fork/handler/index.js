import { useEffect, useState } from "react";
import { Draw } from "../../../utils/Draw";
import { inIsOnVertex } from "../../../utils/inIsOnVertex";

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
