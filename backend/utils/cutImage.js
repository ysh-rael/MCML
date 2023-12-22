const { createCanvas, loadImage } = require('canvas');
const { calcWidth } = require('./calcWidth');
const { calcHeight } = require('./calcHeight');

/**
 * 
 * @param {Buffer} originalImage Buffer contendo a imagem original (por exemplo, o conteúdo de um arquivo de imagem)
 * @param {Number} x1 X da vertice 1
 * @param {Number} y1 Y da vertice 1
 * @param {Number} x2 X da vertice 2
 * @param {Number} y2 Y da vertice 2
 * @param {Number} x3 X da vertice 3
 * @param {Number} y3 Y da vertice 3
 * @param {Number} x4 X da vertice 4
 * @param {Number} y4 Y da vertice 4
 * @returns {Promise<Buffer>} Buffer da imagem recortada ou um erro.
 */
async function cutImage(originalImageBuffer, x1, y1, x2, y2, x3, y3, x4, y4) {
    try {
        // Crie um canvas
        const canvas = createCanvas();
        const ctx = canvas.getContext('2d');

        // Carregue a imagem original no canvas
        const originalImage = await loadImage(originalImageBuffer);
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        ctx.drawImage(originalImage, 0, 0);

        // Calcular a largura e altura do retângulo de corte
        const largura = calcWidth(x1, y1, x2, y2, x3, y3, x4);
        const altura = calcHeight(x1, y1, x2, y2, x3, y3, x4, y4);

        // Calcular a inclinação do retângulo original baseado nas vertice 1 e 2
        const inclinacao = Math.atan2(y2 - y1, x2 - x1);

        // Rotacionar o canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-inclinacao);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        // Desenhar a região de corte no canvas
        ctx.drawImage(
            originalImage,
            largura.xDaVerticeComMenorX, altura.yDaVerticeMaisAlta,
            largura.largura, altura.altura,
            0, 0, largura.largura, altura.altura
        );

        // Converter o canvas para Buffer
        const buffer = canvas.toBuffer('image/jpeg');

        return buffer;
    } catch (error) {
        console.error('Erro ao cortar a imagem:', error);
        throw new Error('Erro ao cortar a imagem');
    }
}

// Exemplo de uso
// const originalImageBuffer = fs.readFileSync('caminho-da-imagem.jpg');
// const imagemCortadaBuffer = await cortarImagem(originalImageBuffer, x1, y1, x2, y2, x3, y3, x4, y4);

// Agora você pode usar "imagemCortadaBuffer" conforme necessário.

module.exports - { cutImage };
