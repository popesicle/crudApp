var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/crud-demo");

var postSchema = new mongoose.Schema({
 name: String,
 postbody: String
});
var post = mongoose.model("Post", postSchema);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.use('/', indexRouter);

// get those post its
app.get('/get-data', (req, res) => {
  db.collection()
});

// Post it action
app.post('/create', (req, res) => {
  var postItData = new post(req.body);
  postItData.insert().then(item => {
    res.render('post-it', { title: 'THE END OF LOVE', crud: 'CRUD v.2' });
  }).catch(err => {
    res.status(400).send('cant save the post it doof');
  });
});

app.post('/update', () => {

});

app.post('/delete', () => {

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
