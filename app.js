var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var compress =  require('compression');
var session = require('express-session');
var csurf = require('csurf');

var routes = require(path.join(__dirname, 'routes', 'index'));
var roundOne = require(path.join(__dirname, 'routes', 'roundone'));
var admin = require(path.join(__dirname, 'routes', 'admin'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_STRING || 'randomsecretstring'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(session({secret: 'session secret key', resave: '', saveUninitialized: ''}));
app.use(csurf());

var mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ccs16';
var mongodb;

const onConnect = function (err, db) {
  if (!err) {
    mongodb = db;
  }
};

mongo.connect(mongoURI, onConnect);

app.use(function (req, res, next) {
  req.db = mongodb;
  next();
});

app.use('/', routes);
app.use('/roundone', roundOne);
app.use('/admin', admin);

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
  app.use(function(err, req, res, next) {
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
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
