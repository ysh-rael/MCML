const tf = require('@tensorflow/tfjs-node');

async function createAndTrainModel({ images, labels, epochs }) {
    try {
        const model = tf.sequential();
        // Adicionar camadas ao modelo conforme necessário
        model.add(tf.layers.flatten({ inputShape: [300, 300, 3] }));
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

        // Compilar o modelo
        model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

        // Treinar o modelo
        await model.fit(tf.stack(images), labels, { epochs });

        return model;
    } catch (error) {
        throw new Error('Catch in createAndTrainModel: ' + error)
    }
}

module.exports = { createAndTrainModel };