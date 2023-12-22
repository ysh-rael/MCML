const tf = require('@tensorflow/tfjs-node');
const fs = require('fs').promises;
const { Print } = require('../../utils/print');
const print = new Print({ informa: 'loadAndPreprocessImage in mcml:', alerta: 'loadAndPreprocessImage in mcml:', erro: 'loadAndPreprocessImage in mcml:', sucesso: 'loadAndPreprocessImage in mcml:' });

async function loadAndPreprocessImage(imagePath) {
    try {
        const imageTensor = tf.node.decodeImage(await fs.readFile(imagePath));
        const resizedImage = tf.image.resizeBilinear(imageTensor, [300, 300]);
        return resizedImage;
    } catch (err) {
        print.erro('Err catch in loadAndPreprocessImage: ');
        print.erro(err);
        return;
    }
}


module.exports = { loadAndPreprocessImage };