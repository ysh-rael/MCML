const { Print } = require('../../utils/print');
const tf = require('@tensorflow/tfjs-node');
const axios = require('axios');
const fs = require('fs').promises;

// Função para baixar e salvar a imagem
async function downloadImage(url, filePath) {
    const response = await axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer',
    });

    await fs.writeFile(filePath, Buffer.from(response.data));
}

// Função para obter a caixa delimitadora da região de interesse (ROI)
function getBoundingBox(vertices) {
    const xValues = vertices.map(vertex => vertex.x);
    const yValues = vertices.map(vertex => vertex.y);

    const xmin = Math.min(...xValues);
    const ymin = Math.min(...yValues);
    const xmax = Math.max(...xValues);
    const ymax = Math.max(...yValues);

    return [xmin, ymin, xmax, ymax];
}

// Função para preparar os dados de treinamento
async function prepareData(data) {
    const images = [];
    const labels = [];

    for (const item of data) {
        for (const img of item.imgs) {
            const imagePath = `./images/${Date.now()}.jpg`; // Nome do arquivo baseado no timestamp
            await downloadImage(img.src, imagePath);

            // Redimensionar a imagem para o tamanho esperado [300, 300, 3]
            const imageTensor = tf.node.decodeImage(await fs.readFile(imagePath));
            const resizedImage = tf.image.resizeBilinear(imageTensor, [300, 300]);

            // Obter a caixa delimitadora da região de interesse (ROI)
            const vertices = img.designs.filter(esse => esse.form === 'circle');
            const [xmin, ymin, xmax, ymax] = getBoundingBox(vertices);



            // Cortar a região de interesse (ROI) da imagem
            const croppedImage = tf.image.cropAndResize(
                resizedImage.expandDims(0),
                vertices.map(vertex => [
                    (vertex.y - ymin) / (ymax - ymin),
                    (vertex.x - xmin) / (xmax - xmin),
                    (vertex.y - ymin + 1) / (ymax - ymin),
                    (vertex.x - xmin + 1) / (xmax - xmin),
                ]),
                [0, 0, 0, 0], // Ajustado para 4 vértices
                [300, 300]
            );

            // Ajustar as coordenadas da caixa delimitadora para o tamanho redimensionado
            const labelData = vertices.flatMap(vertex => [
                (vertex.x - xmin) / (xmax - xmin),
                (vertex.y - ymin) / (ymax - ymin),
            ]);

            console.log(labelData);

            // Criar tensor unidimensional para rótulo
            const labelTensor = tf.tensor2d([labelData]);

            images.push(croppedImage);
            labels.push(labelTensor);

            await fs.unlink(imagePath); // Remover a imagem após o uso
        }
    }

    return {
        images: tf.concat(images),
        labels: tf.stack(labels),
    };
}





// Função para treinar o modelo
async function trainModel(data, epochs) {
    const { images, labels } = await prepareData(data);

    const model = tf.sequential();
    model.add(tf.layers.flatten({ inputShape: [300, 300, 3] }));

    // Ajustar a camada densa com base na tarefa
    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 8, activation: 'linear' }));

    // Compilar o modelo
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

    console.log('------------------------------------');
    console.log(images.shape);
    console.log(labels.shape);
    console.log('------------------------------------');

    // Treinar o modelo
    await model.fit(images, labels, { epochs });

    // Salvar o modelo
    await model.save('file://./trained-model');
}

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });

function mcml(req, res) {
    print.informa('req.body');
    res.send({ data: 'Pong', ok: true });
    trainModel(req.body.data, req.body.epochs).then(() => {
        console.log('Treinamento concluído e modelo salvo.');
    });
}

module.exports.mcml = mcml;
