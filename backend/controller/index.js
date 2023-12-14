const { getDefault, postDefault } = require('./default');

module.exports.controller = {
    get: {
        default: getDefault
    },
    post: {
        default: postDefault
    }
}; 