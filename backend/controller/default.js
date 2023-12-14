const { Print } = require('../utils/print');
const print = new Print({ informa: 'Controller Default', alerta: 'Controller Default', erro: 'Controller Default', sucesso: 'Controller Default' });
function getDefault(req, res) {
    res.send('Pong');
}

function postDefault(req, res) {
    print.informa('req.body');
    console.log(req.body);
    res.send({ data: 'Pong', ok: true });
}

function authorization(req, res, next) {
    print.sucesso('authorization default');
    next();
}

module.exports = {
    getDefault,
    postDefault,
    authorization
};  