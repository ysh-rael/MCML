const fs = require('fs');
const { Print } = require('./print');
const print = new Print({ informa: 'Utils createFolder', alerta: 'Utils createFolder', erro: 'Utils createFolder', sucesso: 'Utils createFolder' });

function createFolder(path) {
    try {
        if (fs.existsSync(path)) {
            print.informa(`Folder of model is existed at ${path}`)
            return path
        }
        fs.mkdirSync(path);
        print.sucesso(`Folder of model created at ${path}`)
        return path;
    } catch (error) {
        print.erro(`Error creating folder: ${error.message}`)
        return null;
    }
}

module.exports = { createFolder }