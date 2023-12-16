const { Print } = require('../../utils/print');
const { createModel } = require('./createModel');
const { makePrediction } = require('./makePrediction');
const pathBase = 'C:\\Users\\Yshrael\\Documents\\Github\\MCML\\backend\\images\\';

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });


async function mcml(req, res) {
    if (req.body.trainModel) {
        res.send({ data: 'Pong', ok: true });

        const arayPathImgs = [`${pathBase}test4.jpg`]
        // Treinar e salvar o modelo
        await createModel({ arayPathImgs, epochs: 40 });

        console.log(`Erro in train model: ${err}`)
    } else {
        res.send({ data: 'Prediction made', ok: true });

        // Fazer previsão com nova imagem
        const imagePath = pathBase + 'test3.jpg';
        await makePrediction(imagePath);
    }
}

module.exports.mcml = mcml;
