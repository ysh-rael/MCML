
async function createAndTrainModel({ images, labels, epochs }) {
    const tf = require('@tensorflow/tfjs-node');
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
        console.log(`images: ${images}`);
        console.log(`labels: ${labels}`);
        console.log(`epochs: ${epochs}`);
        throw new Error('Catch in createAndTrainModel: ' + error);
    }
}

module.exports = { createAndTrainModel };