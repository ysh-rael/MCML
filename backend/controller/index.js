const { getDefault, postDefault, authorization } = require('./default');
const { mcml, validation } = require('./mcml');

module.exports.controller = {
    get: {
        default: [authorization, getDefault]
    },
    post: {
        default: [authorization, postDefault],
        mcml: [authorization, validation, mcml]
    }
}; 