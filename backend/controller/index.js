const { getDefault, postDefault, authorization } = require('./default');

module.exports.controller = {
    get: {
        default: [authorization, getDefault]
    },
    post: {
        default: [authorization, postDefault]
    }
}; 