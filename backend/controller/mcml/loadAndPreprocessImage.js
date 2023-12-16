const tf = require('@tensorflow/tfjs-node');
const fs = require('fs').promises;

async function loadAndPreprocessImage(imagePath) {
    try {
        const imageTensor = tf.node.decodeImage(await fs.readFile(imagePath));
        const resizedImage = tf.image.resizeBilinear(imageTensor, [300, 300]);
        return resizedImage;
    } catch (err) {
        console.log('Err catch in loadAndPreprocessImage: ')
        console.log(err)
        return;
    }
}


module.exports = { loadAndPreprocessImage };