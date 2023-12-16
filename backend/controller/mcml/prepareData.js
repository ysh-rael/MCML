const tf = require('@tensorflow/tfjs-node');
const { loadAndPreprocessImage } = require('./loadAndPreprocessImage');


async function prepareData(arrayImagePath) {
    try {
        // Definir rótulos (1 para "pessoa presente")
        if (!Array.isArray(arrayImagePath)) {
            console.log('it is not an Array');
            return;
        }

        const labels = tf.tensor2d(arrayImagePath.map(() => [1])); // Adicione um rótulo para cada imagem: 0 para imagem que não contenha o elemento e 1 para imagens que contenha

        const images = []
        for (i in arrayImagePath) images.push(await loadAndPreprocessImage(arrayImagePath[i]))

        // Adicionar as imagens à lista de imagens
        return { images, labels }
    } catch (error) {
        console.log('error catch in preparedata:s ')
        console.log(error);
        return;
    }
}


module.exports = { prepareData };
