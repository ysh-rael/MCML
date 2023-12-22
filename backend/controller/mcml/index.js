const { createFolder } = require('../../utils/createFolder');
const { deleteFile } = require('../../utils/deleteFile');
const { downloadImge } = require('../../utils/downloadImge.js');
const { Print } = require('../../utils/print');
const { createModel } = require('./createModel');
const publicPath = 'C:/Users/Yshrael/Documents/Github/MCML/backend/public/images/';

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });

function validation(req, res, next) {
    if (typeof req.body !== 'object') {
        print.erro('body is not an object: ');
        console.log(req.body);
        print.informa('typeof req.body: ' + typeof req.body);
        res.status(400).send(JSON.stringify({ err: true, message: 'Bad Request: body of request is not an object.' }));
        return;
    }

    if (!req.body.epochs || typeof req.body.epochs !== 'number') {
        print.erro('epochs is not an number: ');
        console.log(req.body.epochs);
        print.informa('typeof req.body.epochs: ' + typeof req.body.epochs);
        res.status(400).send(JSON.stringify({ err: true, message: 'Bad Request: epochs is not an number' }));
        return;
    }

    if ((!req.body.email || typeof req.body.email !== 'string') && req.body.sendForEmail) {
        print.erro('Email is not an string valid: ');
        console.log(req.body.email);
        console.log(req.body.sendForEmail);
        res.status(400).send(JSON.stringify({ err: true, message: 'Bad Request: Email is not an string valid' }));
        return;
    }

    if (!Array.isArray(req.body.data)) {
        print.erro('data is not an array: ');
        console.log(req.body.data);
        res.status(400).send(JSON.stringify({ err: true, message: 'Bad Request: data is not an array' }));
        return;
    }

    const elementInvalid = req.body.data.find(esse => {
        if (!esse.label || esse.label && typeof esse.label !== 'string') {
            print.erro('elementInvalid: label invalid');
            return true;
        }
        if (!esse.id) {
            print.erro('elementInvalid: id invalid');
            return true;
        }

        if (!Array.isArray(esse.imgs)) {
            print.erro('elementInvalid: imgs is not an array');
            return true;
        }

        const imgsInvalid = esse.imgs.find(esse => {
            if (typeof esse.src !== 'string') return true;
            const arrayVertice = esse.designs.filter(esse => {
                if (esse.form !== 'circle') return false;
                if (typeof esse.height !== 'number') return false;
                if (typeof esse.width !== 'number') return false;
                if (typeof esse.x !== 'number') return false;
                if (typeof esse.y !== 'number') return false;
                return true;
            });
            if (arrayVertice.length < 4) {
                print.erro('elementInvalid->arrayVertice: arrayVertice.length < 4');
                return true;
            }
        });

        if (imgsInvalid) {
            print.erro('elementInvalid: imgsInvalid');
            return true;
        }

    });

    if (elementInvalid) {
        print.erro('One element in data is not valid: ');
        console.log(req.body.data);
        res.status(400).send(JSON.stringify({ err: true, message: 'Bad Request: One element in data is not valid' }));
        return;
    }

    next();
}

async function mcml(req, res) {

    const { data } = req.body;
    const pathModels = createFolder('./models');
    if (!pathModels) {
        console.log('pathModels is null');
        return;
    }
    // Treinar e salvar o modelo
    res.send({ data: 'Pong', ok: true });

    for (var index = 0; index < data.length; index++) {
        try {
            const element = data[index];

            const pathNewElement = createFolder(`${pathModels}/${element.label}`);

            if (!pathNewElement) {
                print.erro('pathNewElement is null.');
                return;
            }
            // criar a imagem em public/images
            const arrayPathImgs = [];
            if (!element.imgs.length) {
                console.log('element.imgs.length is zero.');
                return;
            }

            for (var i = 0; i < element.imgs.length; i++) {
                const path = await downloadImge(`${publicPath}/${Date.now() + i}.jpg`, element.imgs[i].src);
                path ? arrayPathImgs.push(path) : console.log('Path of an image is null.');
            }

            await createModel({ array: arrayPathImgs, epochs: 10, pathNewElement });

            deleteFile(arrayPathImgs);

            print.sucesso(`model ${element.label} created.`);
        } catch (error) {
            print.erro('Err Catch in create model: model is not created.');
            console.log(error);
        }
    }

}

module.exports = { mcml, validation };
