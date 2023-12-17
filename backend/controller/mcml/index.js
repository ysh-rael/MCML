const { Print } = require('../../utils/print');
const { createModel } = require('./createModel');
const { makePrediction } = require('./makePrediction');
const publicPath = 'C:/Users/Yshrael/Documents/Github/MCML/backend/public/images/';

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });


async function mcml(req, res) {
    if (req.body.trainModel) {

        const arayPathImgs = [`${publicPath}test4.jpg`]
        // Treinar e salvar o modelo
        await createModel({ arayPathImgs, epochs: 40 });

        print.erro(`Erro in train model: ${err}`)
    }
    console.log(req.body)

    res.send({ data: 'Pong', ok: true });
}

module.exports.mcml = mcml;
