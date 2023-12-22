const fs = require('fs');
const path = require('path');

function deleteFolden(folderPath) {
    try {
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach(function (file) {
                const curPath = path.join(folderPath, file);

                if (fs.lstatSync(curPath).isDirectory()) {
                    // Recursivamente exclui subdiretórios
                    deleteFolden(curPath);
                } else {
                    // Exclui arquivo
                    fs.unlinkSync(curPath);
                }
            });

            // Exclui o diretório após processar todos os arquivos/subdiretórios
            fs.rmdirSync(folderPath);
            console.log(`Pasta ${folderPath} excluída com sucesso.`);

            return true; // Retorna true se a exclusão foi bem-sucedida
        } else {
            console.log(`A pasta ${folderPath} não existe.`);
            return false; // Retorna false se a pasta não existir
        }
    } catch (error) {
        console.error('Erro ao excluir a pasta:', error);
        return false; // Retorna false se ocorrer um erro durante a exclusão
    }
}

module.exports = { deleteFolden };