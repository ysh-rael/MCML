const { Print } = require('../../utils/print');

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });

function mcml(req, res) {
    print.informa('req.body');
    console.log(req.body);
    res.send({ data: 'Pong', ok: true });
}

module.exports.mcml = mcml;