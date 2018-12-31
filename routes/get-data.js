var express = require('express');
var router = express.Router();
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'crudDemo';
const client = new MongoClient(url);

function findDocuments(db, callback) {
  // Get the post its collection
  const collection = db.collection('postIts');
  // Find some post its
  collection.find({}).maxTimeMS(150).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}


// get those post its
router.get('/get-data', (req, res) => {
  client.connect((err) => {
    assert.equal(null, err);
    const db = client.db(dbName);

    findDocuments(db, (docs) => {
      res.render('index', {posts: docs, title: 'CRUDZONE'});
    });
  });
});

module.exports = router;
