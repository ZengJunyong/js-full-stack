var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression')
var helmet = require('helmet');
var debug = require('debug')('js-full-stack:app');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),{
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}));

app.use(function(req, res,next) {
  debug('Cookies: ', req.cookies);
  next();
});

app.use('/', routes);
app.use('/users', users);

app.get('/users/:userId/books/:bookId', function(req, res) {
  res.send(req.params);
});

app.get('/flights/:from-:to', function(req, res) {
  res.send(req.params);
});

app.get('/plantae/:genus.:species', function(req, res) {
  res.send(req.params);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  // development error handler, will print stacktrace
  // production error handler, no stacktraces leaked to user
  if (app.get('env') != 'development') {
    err = {}
  }
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


module.exports = app;
