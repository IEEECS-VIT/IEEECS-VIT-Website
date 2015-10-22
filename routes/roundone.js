'use strict';
var express = require('express');
var async = require('async');

var router = express.Router();



function nRandomNumbers(n, max) {
  var arr = [];
  while(arr.length < n){
    var randomnumber=Math.floor(Math.random()*max);
    var found=false;
    for(var i=0;i<arr.length;i++){
    	if(arr[i]==randomnumber){
        found=true;
        break;
      }
    }
    if(!found)
      arr[arr.length]=randomnumber;
  }
  return arr;
};

function getNRandomRecords(n, collection, callback) {
  collection.count(function (err, totalCount) {
    if(err)
      console.log(err);
    console.log(totalCount);
    async.map(nRandomNumbers(n, totalCount),
      function (r, asyncCallback){
        console.log(r);
        collection.findOne(
          {
            _id: {$eq: r}
          },
           function(err, result) {
                  if (err)
                    return next(err)

                  var doc= result;
                    console.log(doc);
                    asyncCallback(null, doc);
              }
          )
      }, function(err, results) {
        callback(null, results);
      });
    })
};

router.get('/', function(req, res) {
  res.render('index', {url:"/roundone/general"});
});

router.get('/general', function(req, res) {
  res.render('general');
});



router.post('/general', function(req, res) {
    let data = {
      _id: req.body.reg_no,
      name: req.body.name,
      reg_no: req.body.reg_no,
      phone: req.body.phone,
      email: req.body.email,
      preference: req.body.preference
    }
    let collection = req.db.collection('roundone');
    const onInsert = function (err) {
        if (err) {
            //console.log(err);
           res.render('general', {error: "You have already submitted the form once."});
        }
        else {
            res.cookie('name', data.name, {signed: true});
            res.cookie('reg_no', data.reg_no, {signed: true});
            res.redirect('/roundone/instructions');
        }
    };
    collection.insertOne(data, onInsert);
});

router.get('/instructions', function(req, res) {
  if(req.signedCookies['reg_no']){
    res.render('instructions', {reg_no: req.signedCookies['reg_no'], name: req.signedCookies['name']});
  }

});

router.get('/questions', function(req, res) {

  if(!req.signedCookies['name']){
    console.log("no cookie");
    res.redirect('/roundone');

  }

  else if(req.signedCookies['technical'] && req.signedCookies['management'])
  {
    console.log('refresh');
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('questions', {technical: JSON.parse(req.signedCookies['technical']), management: JSON.parse(req.signedCookies['management'])});
  }
  else{
      res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    console.log(req.signedCookies['name']);
    let technical = req.db.collection('technical');
    let management = req.db.collection('management');
    //let keys = nRandomNumbers(5 ,10);

    async.parallel({
        'management':function (asyncCallback) {
          getNRandomRecords(3, management, function (err, managementq) {
            if(err){
              console.log(err);
            }
            asyncCallback(null, managementq);
        })
      },
      'technical':function (asyncCallback) {
          getNRandomRecords(12, technical, function (err, technicalq) {
            if(err)
            {
              console.log(err);
            }
            asyncCallback(null, technicalq);
        })
      }
    }, function (err, results) {
      console.log(results.technical);
        function onUpdate() {
          res.cookie('technical', JSON.stringify(results.technical) , {signed: true});
          res.cookie('management', JSON.stringify(results.management) , {signed: true});
          res.render('questions', {technical: results.technical, management: results.management});
        };

        let collection = req.db.collection('roundone');
        let _id = req.signedCookies['reg_no'];

        collection.update({_id: _id}, {$set: {begin_at: new Date().toLocaleString(), begin_at_ms: new Date().getTime()} }, onUpdate);
    });
  }



});


router.post('/questions', function(req, res) {
  if(!req.signedCookies['name']){
    console.log("no cookie");
    res.redirect('/roundone');

  }
  //check technical questions
  var ts = [];
  var ms = [];
  var blurCount = 0;
  for (var property in req.body) {
    if (req.body.hasOwnProperty(property)) {
        var question = property;
        var answer = req.body[property];
        var question_type = question[0];
        if(question_type == 't'){
          //technical
          ts.push( { _id: question.slice(1, question.length), answer: answer} );
        }
        else if(question_type == 'm'){
          ms.push( { _id: question.slice(1, question.length), answer: answer} );
        }
        else {
          blurCount = answer;
          console.log(blurCount);
        }
    }
  }
  console.log(ms);

  var score = 0;
  var technical = req.db.collection('technical');
  async.map(ts,
    function (t, asyncCallback){
      //console.log(t) ;
      technical.findOne({_id: parseInt(t._id)}, function (err, doc) {
        if(err)
          console.log(err);
        if(doc.answer == t.answer){
          score++;
        }
        console.log(doc.answer);
        t.correct = doc.options[doc.answer];
        t.question = doc.question;
        t.answer = doc.options[t.answer];
        //console.log([doc.correct, t.answer]);
        asyncCallback(null, doc);
      });
    },function (err, results) {
      console.log(score);

      function onUpdate() {
        res.clearCookie('name', {});
        res.clearCookie('technical', {});
        res.clearCookie('management', {});
        res.clearCookie('reg_no', {});
        res.redirect('/roundone');
      }

      let management = req.db.collection('management');
      async.map(ms,
        function (m, asyncCallback){
          management.findOne({_id: parseInt(m._id)}, function (err, doc) {
            if(err)
              console.log(err);
            m.question = doc.question;
            asyncCallback(null, doc);
          });
        },function (err, results){

        let collection = req.db.collection('roundone');
        let updateQuery = {$set: {end_at_ms: new Date().getTime(), management: ms, technical: ts, technicalScore: score, blurCount:  blurCount} };
        let _id = req.signedCookies['reg_no'];
        collection.updateOne({_id: _id}, updateQuery, onUpdate);
    });
    });

});

module.exports = router;
