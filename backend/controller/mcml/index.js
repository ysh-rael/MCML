require('dotenv').config();
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const archiver = require('archiver');

const { createFolder } = require('../../utils/createFolder');
const { deleteFile } = require('../../utils/deleteFile');
const { downloadImge } = require('../../utils/downloadImge.js');
const { Print } = require('../../utils/print');
const { createModel } = require('./createModel');
const { deleteFolden } = require('../../utils/deleteFolden.js');
const { cutImage } = require('../../utils/cutImage.js');
const publicPath = path.join(__dirname, '../../', 'public', 'images');

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

async function mcml(req, res, next) {

    console.log(`req.body `)
    console.log(`req.body `)
    console.log(`req.body `)
    console.log(`req.body `)
    console.log(`req.body `)
    console.log(`req.body `)
    console.log(req.body.data[0].imgs)

    const { data } = req.body;
    const pathModels = createFolder('./models');
    const pathPublic = createFolder('./public');
    if (!pathModels) {
        console.log('pathModels is null');
        return;
    }

    req.pathModels = pathModels;
    req.pathPublic = pathPublic;
    // Treinar e salvar o modelo
    if (req.body.sendForEmail) res.send({ err: false, message: 'The template will be sent to your email shortly' });

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
                const _vertices = element.imgs[i].designs.filter(esse => esse.form === 'circle');
                const verticeXAndY = [];
                _vertices.forEach(esse => {
                    verticeXAndY.push(esse.x);
                    verticeXAndY.push(esse.y);
                });

                const buff = await cutImage(fs.readFileSync(path), ...verticeXAndY);
                if (buff) fs.writeFileSync(path, buff);
            }
            await createModel({ array: arrayPathImgs, epochs: req.body.epochs, pathNewElement });

            deleteFile(arrayPathImgs);


            print.sucesso(`model ${element.label} created.`);
        } catch (error) {
            print.erro('Err Catch in create model: model is not created.');
            console.log(error);
        }
    }
    print.alerta('NEXT(1)')
    next();
}

// Cria um arquivo ZIP a partir da pasta 'models'
async function createZip(req, res, next) {
    try {
        const archive = archiver('zip', { zlib: { level: 9 } });
        const zipFilePath = path.join(req.pathPublic, 'models.zip');
        const output = fs.createWriteStream(zipFilePath);
        var stopLog = setInterval(() =>  print.informa('Creating zip archive...'), 1000)

        archive.pipe(output);

        // Adicione todos os arquivos da pasta 'models' ao arquivo ZIP
        archive.directory(path.join(req.pathModels), false);

        await archive.finalize();

        clearInterval(stopLog)
        print.sucesso('Archive created!')

        req.zipFilePath = zipFilePath;

        console.log('zipFilePath')
        console.log(zipFilePath)

        if (!req.body.sendForEmail) {
            const fileStream = fs.createReadStream(zipFilePath);
            res.setHeader('Content-Type', 'application/zip');
            fileStream.pipe(res);
        } 
        
        

    } catch (error) {
        print.erro('Err Catch in createZip: ');
        console.error(error);
        req.zipFilePath = null;
    }

    print.alerta('NEXT(2)')
    
    next();
}

function sendEmail(req, res, next) {

    if (!req.body.sendForEmail){
        print.alerta('NEXT(3)')
         return next();}

    // Configuração do transporte (SMTP)
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });

    // Detalhes do e-mail
    const mailOptions = {
        from: process.env.NODEMAILER_FROM,
        to: req.body.email,
        subject: process.env.NODEMAILER_SUBJECT,
        text: 'Conteúdo do e-mail em texto simples.',
        attachments: [
            {
                filename: 'models.zip',
                content: fs.createReadStream(path.join(req.pathPublic, 'models.zip')),
            },
        ]
    };
    if(process.env.NODEMAILER_CC) mailOptions.cc = process.env.NODEMAILER_CC

    // Enviar e-mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            print.erro('Error sending email');
            console.error(error);
        } else {
            print.sucesso('E-mail sent: ');
            console.log(info.response);
        }
        print.alerta('NEXT(4)')
        next();
    });

}

function cleaningTheEnvironment(req) {
    try {
        if (!req.pathModels) {
            print.alerta('req.pathModels is not found');
            return;
        }
        if (deleteFolden(req.pathModels)) print.sucesso('cleaningTheEnvironment was a sucess.');
    } catch (error) {
        print.erro('ERROR Catch in cleaningTheEnvironment');
        console.log(error);
    }
}

module.exports = { validation, mcml, createZip, sendEmail, cleaningTheEnvironment };
