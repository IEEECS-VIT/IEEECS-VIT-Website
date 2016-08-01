var path = require('path');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var account = require(path.join(__dirname, '..', 'controllers', 'account'));


router.route('/login').get(account.getLogin).post(passport.authenticate('local', { failureRedirect: '/account/login', failureFlash : true }), account.postLogin);
router.route('/register').get(account.getRegister).post(account.postRegister);

module.exports = router;
