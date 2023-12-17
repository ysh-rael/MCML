const { Print } = require('../../utils/print');
const { createModel } = require('./createModel');
const { makePrediction } = require('./makePrediction');
const publicPath = 'C:/Users/Yshrael/Documents/Github/MCML/backend/public/images/';

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });


async function mcml(req, res) {
    if (req.body.trainModel) {
        res.send({ data: 'Pong', ok: true });

        const arayPathImgs = [`${publicPath}test4.jpg`]
        // Treinar e salvar o modelo
        await createModel({ arayPathImgs, epochs: 40 });

        print.erro(`Erro in train model: ${err}`)
    } else {
        res.send({ data: 'Prediction made', ok: true });

        // Fazer previsão com nova imagem
        const imagePath = publicPath + 'test3.jpg';
        await makePrediction(imagePath);
    }
}

module.exports.mcml = mcml;
