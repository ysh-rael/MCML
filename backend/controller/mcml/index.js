const { Print } = require('../../utils/print');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs').promises;

const pathBase = 'C:\\Users\\Yshrael\\Documents\\Github\\MCML\\backend\\images\\';

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });

async function loadAndPreprocessImage(imagePath) {
    const imageTensor = tf.node.decodeImage(await fs.readFile(imagePath));
    const resizedImage = tf.image.resizeBilinear(imageTensor, [300, 300]);
    return resizedImage;
}

async function prepareData() {
    // Definir rótulos (1 para "pessoa presente")
    const labels = tf.tensor2d([[1], [1]]); // Adicione um rótulo para cada imagem: 0 para imagem que não contenha o elemento e 1 para imagens que contenha

    // Carregar e pré-processar as imagens
    const imagePath1 = pathBase + 'test3.jpg';
    const imagePath2 = pathBase + 'test4.jpg';

    const image1 = await loadAndPreprocessImage(imagePath1);
    const image2 = await loadAndPreprocessImage(imagePath2);

    // Adicionar as imagens à lista de imagens
    const images = [image1, image2];

    return { images, labels };
}

async function createAndTrainModel(images, labels) {
    const model = tf.sequential();

    // Adicionar camadas ao modelo conforme necessário
    model.add(tf.layers.flatten({ inputShape: [300, 300, 3] }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    // Compilar o modelo
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    // Treinar o modelo
    await model.fit(tf.stack(images), labels, { epochs: 10 });

    return model;
}

async function saveModel(model) {
    await model.save('file://./trained-model');
}

async function loadModel() {
    const model = await tf.loadLayersModel('file://./trained-model/model.json');
    return model;
}

async function trainAndSaveModel() {
    try {
        // Preparar os dados de treinamento
        const { images, labels } = await prepareData();

        // Criar e treinar o modelo
        const model = await createAndTrainModel(images, labels);

        // Salvar o modelo
        await saveModel(model);
    } catch (error) {
        print.erro('Error during training');
        console.error(error);
    }
}

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
        console.log('Prediction:', prediction.dataSync());
    } catch (error) {
        print.erro('Error during prediction');
        console.error(error);
    }
}

async function mcml(req, res) {
    if (!req) {
        // Treinar e salvar o modelo
        await trainAndSaveModel();
        res.send({ data: 'Pong', ok: true });
    } else {
        // Fazer previsão com nova imagem
        const imagePath = pathBase + 'test6.jpg';
        await makePrediction(imagePath);
        res.send({ data: 'Prediction made', ok: true });
    }
}

module.exports.mcml = mcml;
