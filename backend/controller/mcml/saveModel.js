async function saveModel(model, pathNewElement) {
    await model.save('file://'+pathNewElement);
}

module.exports = { saveModel }