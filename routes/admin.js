var path = require('path');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var admin = require(path.join(__dirname, '..', 'controllers', 'admin'));
var allowedUsers = require(path.join(__dirname, '..', 'util', 'roles')).allowedUsers;

router.use(allowedUsers(['admin']))
router.route('/').get(admin.getIndex)
router.route('/question/new').get(admin.getNewQuestion).post(admin.postNewQuestion);
router.route('/question/list').get(admin.getListQuestions);
router.route('/question/:id').get(admin.getQuestion);

module.exports = router;
