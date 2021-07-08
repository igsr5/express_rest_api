var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017';

router.get('/', (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true}, (err, client) => {
    client.db('db').collection('restapi').find().toArray((err, r) => {
      client.close();
      res.send(r);
    });
  });
});

router.get( '/:id', function ( req, res ) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    let key = {}
    key[req.params.id] = { $regex:".*" }
    client.db('db').collection("restapi").findOne( key, function(err, r) {
      client.close();
      res.send(r);
    });
  });
} );

router.post( '/', ( req, res ) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    client.db('db').collection("restapi").insertOne(req.body).then((err, r) => {
      client.close();
      res.send(r);
    });
  });
});

router.put( '/:id', function ( req, res ) {
  collection("resapi").findOneAndUpdate( { _id: new ObjectID( req.params.id ) }, req.body, {}, function(err, r){
    res.send( r );
  } );
} );

module.exports = router;
