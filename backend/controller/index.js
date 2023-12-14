const { getDefault, postDefault, authorization } = require('./default');
const { mcml } = require('./mcml');

module.exports.controller = {
    get: {
        default: [authorization, getDefault]
    },
    post: {
        default: [authorization, postDefault],
        mcml: [authorization, mcml]
    }
}; 