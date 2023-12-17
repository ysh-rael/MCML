const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const model = await tf.loadLayersModel('file://./trainedModel/model.json');
    return model;
}
module.exports = { loadModel }