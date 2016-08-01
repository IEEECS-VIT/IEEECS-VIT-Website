var path = require('path');
var Promise = require('bluebird');
var passport = require('passport');
var User = Promise.promisifyAll(require(path.join(__dirname, '..', 'models', 'user')));

exports.getLogin = function (req, res, next)
{
    return res.render('account-login');
}

exports.postLogin = function (req, res, next)
{
    if (req.user.role == 'student')
    {
        return res.redirect('/');
    }
    return res.redirect('/admin');
    
}

exports.getLogout = function (req, res, next)
{
    req.logout();
    return res.redirect('/');
}


exports.getRegister = function (req, res, next)
{
    return res.render('account-register');
}

exports.postRegister = function (req, res, next)
{
    var user = new User({ username : req.body.reg_no, email : req.body.email, name: req.body.name, role : 'admin' });
    console.log(user);
    return User.registerAsync(user, req.body.password)
    .then (function(account) {
        req.flash('message', 'Registration Successful.');
        return res.redirect('login');
    })
    .catch(function (err) {
        req.flash('message', 'You seem to have registered already.');
        return res.redirect('back');
    });
}
