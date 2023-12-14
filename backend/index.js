const express = require('express');
const cors = require('cors');
const { router } = require('./router');
const path = require('path');
const { Print } = require('./utils/print');
const print = new Print({ informa: 'Processo principal', alerta: 'Processo principal', erro: 'Processo principal', sucesso: 'Processo principal' });

const app = express();
const port = process.env.PORT || 3239;

// Use o middleware body-parser
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Use o middleware cors
app.use(cors());

app.use(express.static(__dirname + '/web/src/'));

app.use(router);

// Middleware para servir conteúdo estático.
app.use('/public', express.static(path.resolve('public')));

app.listen(port, () => {
    print.sucesso(`Robô rodou o rodo em http://localhost:${port}`);
});
