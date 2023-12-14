function getDefault(req, res) {
    res.send('Pong');
}

function postDefault(req, res) {
    console.log('req.body');
    console.log(req.body);
    res.send({ data: 'Pong', ok: true });
}

module.exports = {
    getDefault,
    postDefault
};  