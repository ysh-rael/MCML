const axios = require('axios');
const fs = require('fs').promises; // Usando fs.promises para obter funções assíncronas do File System

const { Print } = require('./print');
const print = new Print({ informa: 'Utils downloadImge', alerta: 'Utils downloadImge', erro: 'Utils downloadImge', sucesso: 'Utils downloadImge' });


async function downloadImge(localPath, url) {
    try {
        const resposta = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
        });

        await fs.writeFile(localPath, resposta.data);

        return localPath;
    } catch (erro) {
        print.erro(`Erro no download da imagem: ${erro.message}`);
        console.error(erro);
        return;
    }
}


module.exports = { downloadImge };
