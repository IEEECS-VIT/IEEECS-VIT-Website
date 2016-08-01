var path = require('path');
var express = require('express');
var router = express.Router();
var home = require(path.join(__dirname, '..', 'controllers', 'home'));


router.route('/').get(home.getIndex);

module.exports = router;
