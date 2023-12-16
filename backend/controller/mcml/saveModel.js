async function saveModel(model) {
    await model.save('file://./trainedModel');
}

module.exports = { saveModel }