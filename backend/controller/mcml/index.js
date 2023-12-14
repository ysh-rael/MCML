const { Print } = require('../../utils/print');
const tf = require('@tensorflow/tfjs-node');
const axios = require('axios');
const fs = require('fs').promises;

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });


async function loadAndPreprocessImage(imagePath) {
    const imageTensor = tf.node.decodeImage(await fs.readFile(imagePath));
    const expandedImage = imageTensor.expandDims(0); // Adicionar a dimensão de lote

    const resizedImage = tf.image.resizeBilinear(expandedImage, [300, 300]);

    return resizedImage;
}


async function prepareData() {
    // Definir rótulos (1 para "pessoa presente")
    const labels = tf.tensor2d([[1]]);

    // Carregar e pré-processar a imagem
    const imagePath = 'C:\\Users\\yshaeldev\\Desktop\\yshrael\\JS\\create-model-for-machine-learning\\backend\\images\\test.jpg';
    const image = await loadAndPreprocessImage(imagePath);

    // Adicionar a imagem à lista de imagens
    const images = [image];

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
    await model.fit(images, labels, { epochs: 10 });

    return model;
}



async function saveModel(model) {
    await model.save('file://./trained-model');
}

async function loadModel() {
    const model = await tf.loadLayersModel('file://./trained-model/model.json');
    return model;
}

// Exemplo de uso
async function useModel() {
    const loadedModel = await loadModel();

    // Agora você pode usar `loadedModel` para fazer previsões ou outras operações.
}




async function mcml(req, res) {
    try {

        // Preparar os dados de treinamento
        const { images, labels } = await prepareData();

        // Criar e treinar o modelo
        const model = await createAndTrainModel(images, labels);

        // Salvar o modelo
        await saveModel(model);

        // Chame a função para usar o modelo carregado
        //useModel();

        res.send({ data: 'Pong', ok: true });
    } catch (error) {
        print.erro('error catch');
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports.mcml = mcml;
