let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let getDataRouter = require('./routes/get-data');

let app = express();

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const dbName = 'crudDemo';
const client = new MongoClient(url);


let bodyParser = require('body-parser');
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
app.use('/', getDataRouter);

// Post it action
app.post('/create', (req, res, next) => {
  let post = {
     name: req.body.name,
     postbody: req.body.postbody,
  };
  client.connect((err) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    db.collection('postIts').insertOne(post, (result) => {
      console.log(post);
      console.log('post it connected');
    });
  });
  res.redirect('/get-data');
});

app.post('/update', (req, res, next) => {
  let post = {
     name: req.body.name,
     postbody: req.body.postbody,
  };
  let id = req.body.id;

  client.connect((err) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    db.collection('postIts').updateOne({'_id': objectId(id)}, {$set: post}, (result) => {
      console.log('updated');
      console.log('post it connected');
    });
  });
  res.redirect('/get-data');
});

app.post('/delete', (req, res, next) => {
  let id = req.body.id;

  client.connect((err) => {
    const db = client.db(dbName);
    db.collection('postIts').deleteOne ({'_id': objectId(id)}, (result) => {
      console.log('deleted');
      console.log('post it connected');
    });
  });
  res.redirect('/get-data');
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
