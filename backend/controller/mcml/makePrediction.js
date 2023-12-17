const { Print } = require('../../utils/print');
const { loadAndPreprocessImage } = require('./loadAndPreprocessImage');
const { loadModel } = require('./loadModel');
const print = new Print({ informa: 'makePrediction:', alerta: 'makePrediction:', erro: 'makePrediction:', sucesso: 'makePrediction:' });
async function makePrediction(imagePath) {
    try {
        // Carregar o modelo
        const model = await loadModel();

        // Carregar e pré-processar a nova imagem
        const image = await loadAndPreprocessImage(imagePath);

        // Expandir as dimensões para criar um lote
        const batchedImage = image.expandDims(0);

        // Fazer a previsão
        const prediction = model.predict(batchedImage);
        print.informa('Prediction:', prediction.dataSync()[0] > 0.5);
    } catch (error) {
        print.erro('Error during prediction');
        console.log(error);
    }
}

module.exports = { makePrediction }