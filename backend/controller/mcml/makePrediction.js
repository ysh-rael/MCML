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
        console.log('Prediction:', prediction.dataSync()[0] > 0.5);
    } catch (error) {
        print.erro('Error during prediction');
        console.error(error);
    }
}

module.exports = { makePrediction }