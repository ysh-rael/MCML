const { createFolder } = require('../../utils/createFolder');
const { deleteFile } = require('../../utils/deleteFile');
const { downloadImge } = require('../../utils/downloadImgejs');
const { Print } = require('../../utils/print');
const { createModel } = require('./createModel');
const publicPath = 'C:/Users/Yshrael/Documents/Github/MCML/backend/public/images/';

const print = new Print({ informa: 'Controller mcml', alerta: 'Controller mcml', erro: 'Controller mcml', sucesso: 'Controller mcml' });

function validation(req, res, next) {
    if (typeof req.body !== "object") {
        print.erro('body is not an object: ')
        console.log(req.body)
        print.informa('typeof req.body: ' + typeof req.body)
        return res.send({ ok: false })
    }

    if (!req.body.epochs || typeof req.body.epochs !== "number") {
        print.erro('epochs is not an number: ')
        console.log(req.body.epochs)
        print.informa('typeof req.body.epochs: ' + typeof req.body.epochs)
        return res.send({ ok: false })
    }

    if (!req.body.email || typeof req.body.email !== "string") {
        print.erro('Email is not an string valid: ')
        console.log(req.body.email)
        print.informa('typeof req.body.email: ' + typeof req.body.email)
        return res.send({ ok: false })
    }

    if (!Array.isArray(req.body.data)) {
        print.erro('data is not an array: ')
        console.log(req.body.data)
        return res.send({ ok: false })
    }

    const elementInvalid = req.body.data.find(esse => {
        if (!esse.label || esse.label && typeof esse.label !== "string") {
            print.erro('elementInvalid: label invalid')
            return true
        }
        if (!esse.id) {
            print.erro('elementInvalid: id invalid')
            return true
        }

        if (!Array.isArray(esse.imgs)) {
            print.erro('elementInvalid: imgs is not an array')
            return true
        }

        const imgsInvalid = esse.imgs.find(esse => {
            if (typeof esse.src !== "string") return true
            const arrayVertice = esse.designs.filter(esse => {
                if (esse.form !== "circle") return false
                if (typeof esse.height !== "number") return false
                if (typeof esse.width !== "number") return false
                if (typeof esse.x !== "number") return false
                if (typeof esse.y !== "number") return false
                return true
            })
            if (arrayVertice.length < 4) {
                print.erro('elementInvalid->arrayVertice: arrayVertice.length < 4')
                return true
            }
        })

        if (imgsInvalid) {
            print.erro('elementInvalid: imgsInvalid')
            return true
        }

    })

    if (elementInvalid) {
        print.erro('One element in data is not valid: ')
        console.log(req.body.data)
        return res.send({ ok: false })
    }

    next()
}

async function puta(element, pathModels) {
    console.log(' \n############################### INICIO ##### ')
        const pathNewElement = createFolder(`${pathModels}/${element.label}`)
        console.log(`pathNewElement: ${pathNewElement}`)
        if (!pathNewElement) {
            print.erro('pathNewElement is null.')
            return;
        }
        // criar a imagem em public/images
        const arrayPathImgs = []
        for (var i = 0; i < element.imgs.length; i++) {
            console.log(`i: ${i}`)
            const path = await downloadImge(`${publicPath}/${Date.now() + i}.jpg`, element.imgs[i].src)
            console.log('#')
            if(path)
            arrayPathImgs.push(path)
        else console.log(`path is null***`)
            console.log('**')
        }
        console.log('arrayPathImgs.length')
        console.log(arrayPathImgs.length)

        console.log(' \n############################### FIM ##### ')

        await createModel({ array: arrayPathImgs, epochs: 10, pathNewElement });
        // excluir as imagens criadas

        deleteFile(arrayPathImgs)

        print.sucesso(`model ${element.label} created.`)
}

async function mcml(req, res) {

    const { data } = req.body
    const pathModels = createFolder('./models')
    if (!pathModels) {
        console.log('pathModels is null')
        return;
    }
    // Treinar e salvar o modelo
    res.send({ data: 'Pong', ok: true });

    // puta(data[0], pathModels)
    console.log(data[0].label)
    const [a,b] = [puta(data[0], pathModels), puta(data[1], pathModels)]
    
    
    for (var index = 0; index < data.length; index++) {
        const element = data[index]
    }

}

module.exports = { mcml, validation };
