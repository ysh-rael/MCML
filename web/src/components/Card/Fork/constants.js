const topLine = {
    "id": "topLine",
    "form": "line",
    "height": 0,
    "width": 0,
    "ray": 0,
    "x": 0,
    "y": 0,
    "color": "blue",
    "idElem1": "rightTopVertex",
    "idElem2": "leftTopVertex"
}

const leftLine = {
    "id": "leftLine",
    "form": "line",
    "height": 0,
    "width": 0,
    "ray": 0,
    "x": 0,
    "y": 0,
    "color": "blue",
    "idElem1": "bottomLeftVertex",
    "idElem2": "leftTopVertex"
}

const lineBaixo = {
    "id": "lineBaixo",
    "form": "line",
    "height": 0,
    "width": 0,
    "ray": 0,
    "x": 0,
    "y": 0,
    "color": "blue",
    "idElem1": "bottomRightVertex",
    "idElem2": "bottomLeftVertex"
}

const lineDireita = {
    "id": "lineDireita",
    "form": "line",
    "height": 0,
    "width": 0,
    "ray": 0,
    "x": 0,
    "y": 0,
    "color": "blue",
    "idElem1": "rightTopVertex",
    "idElem2": "bottomRightVertex"
}

const leftTopVertex = {
    "id": "leftTopVertex",
    "form": "circle",
    "height": 0,
    "width": 0,
    "ray": 6,
    "x": 50,
    "y": 10,
    "color": "#F24335",
    "idElem1": null,
    "idElem2": null
}

const rightTopVertex = {
    "id": "rightTopVertex",
    "form": "circle",
    "height": 0,
    "width": 0,
    "ray": 6,
    "x": 200,
    "y": 10,
    "color": "#F24335",
    "idElem1": null,
    "idElem2": null
}

const bottomLeftVertex = {
    "id": "bottomLeftVertex",
    "form": "circle",
    "height": 0,
    "width": 0,
    "ray": 6,
    "x": 50,
    "y": 100,
    "color": "orange",
    "idElem1": null,
    "idElem2": null
}

const bottomRightVertex = {
    "id": "bottomRightVertex",
    "form": "circle",
    "height": 0,
    "width": 0,
    "ray": 6,
    "x": 200,
    "y": 100,
    "color": "#F24335",
    "idElem1": null,
    "idElem2": null
}


export const designs = [topLine, leftLine, lineBaixo, lineDireita, leftTopVertex, rightTopVertex, bottomLeftVertex, bottomRightVertex]