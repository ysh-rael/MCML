const express = require('express');
const { controller } = require('./controller');
const router = express.Router();

router.get('/ping', controller.get.default);

router.post('/mcml', controller.post.default);


module.exports = { router };