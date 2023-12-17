const { Print } = require('../../utils/print');
const { createModel } = require('./createModel');
const { makePrediction } = require('./makePrediction');
const publicPath = 'C:/Users/Yshrael/Documents/Github/MCML/backend/public/images/';

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });


async function mcml(req, res) {

    if (typeof req.body !== "object") {
        print.erro('body is not an object: ')
        console.log(req.body)
        print.informa('typeof req.body: ' + typeof req.body)
        return res.send({ ok: false })
    }

    if (!req.body.epochs || typeof req.body.epochs !== "number") {
        print.erro('epochs is not an number: ')
        console.log(req.body.epochs)
        print.informa('typeof req.body.epochs: ' + typeof req.body.epochs)
        return res.send({ ok: false })
    }

    if (!req.body.email || typeof req.body.email !== "string") {
        print.erro('epochs is not an string valid: ')
        console.log(req.body.email)
        print.informa('typeof req.body.email: ' + typeof req.body.email)
        return res.send({ ok: false })
    }

    if (Array.isArray(req.body.data)) {
        print.erro('data is not an array: ')
        console.log(req.body.data)
        return res.send({ ok: false })
    }

    const arayPathImgs = [`${publicPath}test4.jpg`]
    // Treinar e salvar o modelo
    await createModel({ arayPathImgs, epochs: 40 });

    print.erro(`Erro in train model: ${err}`)
    console.log(req.body)

    res.send({ data: 'Pong', ok: true });
}

module.exports.mcml = mcml;
