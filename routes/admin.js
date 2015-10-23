'use strict';
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  if(!req.signedCookies.username){
    res.redirect('/login');
  }
  else {
      let collection = req.db.collection('round');
      function onFind(err, docs) {
        if(err){
          console.log(err);
          res.redirect('/login');
        }
        docs.toArray(function (err, records) {
          res.render('admin', {records: records});
        });
      }
      collection.find({}, onFind);
  }
});

router.get('/:id', function (req, res) {
  if(!req.signedCookies.username){
    res.redirect('/login');
  }
  else
  {
      let collection = req.db.collection('round');
      function onFind(err, doc) {
        if(err || !doc){
          console.log(err);
          res.redirect('/admin');
        }
          res.render('details', {details: doc});
      }
      collection.findOne({_id: req.params.id}, onFind);
  }
});

module.exports = router;
