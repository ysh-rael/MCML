require('dotenv').config();
const { Print } = require('../utils/print');
const print = new Print({ informa: 'Controller Default', alerta: 'Controller Default', erro: 'Controller Default', sucesso: 'Controller Default' });
const AUTHENTICATION = process.env.AUTHENTICATION ? JSON.parse(process.env.AUTHENTICATION) : null;

function getDefault(req, res) {
    res.send('Pong');
}

function postDefault(req, res) {
    print.informa('req.body');
    console.log(req.body);
    res.send({ data: 'Pong', ok: true });
}

function authorization(req, res, next) {
    if (!AUTHENTICATION) {
        print.sucesso('authorization default is null');
        next();
        return;
    }

    try {
        if (req.headers && req.headers.authentication && Array.isArray(AUTHENTICATION) && AUTHENTICATION.findIndex(esse => esse === req.headers.authentication) !== -1) {
            print.sucesso('authentitation success.');
            next();
            return;
        }

    } catch (error) {
        print.erro('ERROR catch: ');
        console.log(error);
        res.status(500).send(JSON.stringify({ err: true, message: 'Internal Server Error' }));
        return;
    }

    print.alerta('authentitation falid.');
    print.informa('req.headers:');
    console.log(req.headers);
    print.informa(`req.headers.authenticatio: ${req.headers.authenticatio}`);
    print.informa(`AUTHENTICATION: ${AUTHENTICATION}`);
    res.status(401).send(JSON.stringify({ err: true, message: 'Unauthorized' }));
    return;
}

module.exports = {
    getDefault,
    postDefault,
    authorization
};  