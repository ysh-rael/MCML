const fs = require('fs');
const { Print } = require('./print');
const print = new Print({ informa: 'Utils deleteFile', alerta: 'Utils deleteFile', erro: 'Utils deleteFile', sucesso: 'Utils deleteFile' });

function deleteFile(arrayPath) {
    if (!Array.isArray(arrayPath)) {
        return;
    }

    for (var i = 0; i < arrayPath.length; i++) {
        try {
            fs.unlinkSync(arrayPath[i]);
            console.log(`Arquivo ${arrayPath[i]} excluído com sucesso.`);
        } catch (erro) {
            print.erro(`Erro ao excluir o arquivo ${arrayPath[i]}: ${erro.message}`);
            console.error(erro);
        }
    }
}

module.exports = { deleteFile };