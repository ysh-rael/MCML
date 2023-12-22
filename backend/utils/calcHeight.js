
/**
 * 
 * @param {Number} x1 X da vertice 1
 * @param {Number} y1 Y da vertice 1
 * @param {Number} x2 X da vertice 2
 * @param {Number} y2 Y da vertice 2
 * @param {Number} x3 X da vertice 3
 * @param {Number} y3 Y da vertice 3
 * @param {Number} x4 X da vertice 4
 * @param {Number} y4 Y da vertice 4
 * @returns
 */
function calcHeight(x1, y1, x2, y2, x3, y3, x4, y4) {
    const yDaVerticeMaisAlta = y1 < y2 ? y1 : y2;
    const yDaVerticeMaisBaixa = y4 > y3 ? y4 : y3;
    const altura = Math.abs(yDaVerticeMaisBaixa - yDaVerticeMaisAlta);
    return { altura, yDaVerticeMaisAlta };
}

module.exports = { calcHeight };