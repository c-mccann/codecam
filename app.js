var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var fs = require('fs');
// your express configuration here
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//// app.set('view engine', 'jade'); // don't use jade view engine, instead serve up raw html
// app.use(express.static(__dirname + '/views/html'));  // originally did this way, but caused view engine missing error
var engines = require('consolidate'); // this block of code registers view engine and gets it to serve
app.set('views', __dirname + '/views'); // html from here. this did not allow css/js to load, so added
app.engine('html', engines.mustache); // previous line to this block
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var PORT = 8443
, http_options = {
  key: fs.readFileSync('sslcert/key.pem')
  , cert: fs.readFileSync('sslcert/cert.pem')
};
https.createServer(http_options, app).listen(PORT);
console.log('HTTPS listening on port: ' + PORT);
// app.get('/', function (req, res) {
//     res.header('Content-type', 'text/html');
//     return res.end('<h1>Hello, Secure World!</h1>');
// });
module.exports = app;
