'use strict';
var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

router.get('/', function (req, res) {
    let s_time = 1450117800000;
    let current_time = new Date().getTime();
    var difference = ((s_time - current_time) / 1000);
    difference = Math.round(difference);
    res.render('countdown', {time: difference});
});

router.get('/selections', function (req, res) {
    res.redirect('/');
    //res.render('general');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res) {
    let collection = req.db.collection('admin');
    const onFetch = function (err, doc) {
        if (!err) {
            if (doc && (bcrypt.compareSync(req.body.password, doc.password))) {
                res.cookie('username', req.body.username, {maxAge: 86400000, signed: true});
                res.redirect('/admin');
            }
            else {
                res.redirect('/login');
            }
        }
    };
    collection.findOne({username: req.body.username}, onFetch);
});

router.get('/selected', function (req, res) {
  function onFind(err, doc) {
    if(!err && doc){
      doc.toArray(function (err, arr) {
        //console.log(arr);
        res.render('selected', {selected : arr});
      })

    }
    else {
      res.redirect('/');
    }
  }
  let collection = req.db.collection('selectedFinal');

  collection.find({}, onFind);

})

router.get('/logout', function (req, res) {
    if (req.signedCookies.username) {
        res.clearCookie('username', {});
        res.redirect('/login');
    }
    else {
        res.redirect('/');
    }
});
router.get('/material', function (req, res) {
    res.render('material');
});

module.exports = router;
