const { Print } = require("../../utils/print");
const { createAndTrainModel } = require("./createAndTrainModel");
const { prepareData } = require("./prepareData");
const { saveModel } = require("./saveModel");

const print = new Print({ informa: 'trainModel', alerta: 'trainModel', erro: 'trainModel', sucesso: 'trainModel' });


async function createModel({ arayPathImgs, epochs }) {
    try {
        // Preparar os dados de treinamento
        const _ = await prepareData(arayPathImgs);
        if(!_) {
            print.erro('Erro in prepareData')
            throw new Error('prepareData not sender image or label. it is null')
        }
        const { images, labels } = _

        // Criar e treinar o modelo
        const model = await createAndTrainModel({ images, labels, epochs });
        if (!model) {
            print.erro('model is null')
            throw new Error('Model is not created. it is null')
        }

        // Salvar o modelo
        await saveModel(model);
    } catch (error) {
        print.erro('Error during training');
        throw new Error(error)
    }
}

module.exports = { createModel }