const { getDefault, postDefault, authorization } = require('./default');
const { mcml, validation, sendEmail, createZip, cleaningTheEnvironment } = require('./mcml');

module.exports.controller = {
    get: {
        default: [authorization, getDefault]
    },
    post: {
        default: [authorization, postDefault],
        mcml: [authorization, validation, mcml, createZip, sendEmail, cleaningTheEnvironment],
        mcml2: [authorization, validation, mcml],
    }
}; 