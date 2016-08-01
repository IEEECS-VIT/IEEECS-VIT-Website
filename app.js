require('dotenv').config({silent: true});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress =  require('compression');
var session = require('express-session');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var flash  = require('flash');

// Auth
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var index = require('./routes/index');
var account = require('./routes/account');
var admin = require('./routes/admin');

var app = express();
app.use(compress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // TODO: Env var
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/ccs');

app.use(session({secret: process.env.SESSION_SECRET, resave: '', saveUninitialized: ''})); // TODO: Env var
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//app.use('/', index);
//app.use('/account', account);
//app.use('/admin', admin);
//app.use('/roundone', roundone);

app.get('/', function (req, res, next)
{
  return res.render('index');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  //console.log(roundone);
  app.use(function(err, req, res, next) {
    if (err.status == 403) {
      return res.redirect(err.status, '/account/login');
    }
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if (err.status == 403) {
     return res.redirect(err.status, '/account/login');
  }
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
