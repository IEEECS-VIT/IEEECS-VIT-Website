'use strict';
var express = require('express');
var async = require('async');

var router = express.Router();

let options = {
    question: 1,
    options: 1,
    correct: 1
};

function nRandomNumbers(n, max) {
    var arr = [];
    while (arr.length < n) {
        var randomnumber = Math.floor(Math.random() * max);
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == randomnumber) {
                found = true;
                break;
            }
        }
        if (!found)
            arr[arr.length] = randomnumber;
    }
    return arr;
};

function getNRandomRecords(n, collection, callback) {
    collection.count(function (err, totalCount) {
        if (err)
            console.log(err);
        async.map(nRandomNumbers(n, totalCount),
            function (r, asyncCallback) {
                collection.findOne(
                    {
                        _id: {$eq: r}
                    },
                    function (err, result) {
                        if (err) {
                            return next(err)
                        }
                        else {
                            var doc = result;
                            asyncCallback(null, doc);
                        }
                    });
            }, function (err, results) {
                callback(null, results);
        });
    });
};

router.get('/', function (req, res) {
    res.redirect('/');
    //res.render('index', {url: "/roundone/general"});
});

router.get('/general', function (req, res) {
    res.redirect('/');
    //res.render('general');
});
/*
router.post('/general', function (req, res) {
    if (req.body.reg_no && req.body.name && req.body.phone && req.body.email && req.body.preference) {
        let data = {
            _id: req.body.reg_no.toUpperCase(),
            name: req.body.name,
            reg_no: req.body.reg_no.toUpperCase(),
            phone: req.body.phone,
            email: req.body.email,
            preference: req.body.preference
        };
        let collection = req.db.collection('round');
        const onInsert = function (err) {
            if (err) {
                res.render('general', {error: "You have already submitted the form once."});
            }
            else {
                res.cookie('name', data.name, {signed: true});
                res.cookie('reg_no', data.reg_no, {signed: true});
                res.redirect('/roundone/instructions');
            }
        };
        collection.insertOne(data, onInsert);
    }
    else {
        res.render('error', {message: 'Invalid request'});
    }
});
*/
router.get('/instructions', function (req, res) {
    res.redirect('/');
    /*if (req.signedCookies['reg_no']) {
        res.render('instructions', {reg_no: req.signedCookies['reg_no'], name: req.signedCookies['name']});
    }*/
});

router.get('/questions', function (req, res) {
    res.redirect('/');
    /*
    if (!req.signedCookies['name']) {
        res.redirect('/roundone');

    }
    else if (req.signedCookies['loaded']) {
        console.log('refresh');
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        let collection = req.db.collection('round');
        let _id = req.signedCookies['reg_no'];
        collection.findOne({_id: _id}, function (err, doc) {
            if (err) {
                console.log(err);
            }
            else if (doc) {
                res.render('questions', {
                    technical: doc.technicalQuestions,
                    management: doc.managementQuestions,
                    coding: doc.codingQuestion[0]
                });
            }
        });
    }
    else {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        let technical = req.db.collection('technical');
        let management = req.db.collection('management');
        let coding = req.db.collection('coding');
        async.parallel({
                'management': function (asyncCallback) {
                    getNRandomRecords(3, management, function (err, managementq) {
                        if (err) {
                            console.log(err);
                            asyncCallback(err, null);
                        }
                        asyncCallback(null, managementq);
                    })
                },
                'technical': function (asyncCallback) {
                    getNRandomRecords(12, technical, function (err, technicalq) {
                        if (err) {
                            console.log(err);
                            asyncCallback(err, null);
                        }
                        asyncCallback(null, technicalq);
                    })
                },
                'coding': function (asyncCallback) {
                    getNRandomRecords(2, coding, function (err, codingq) {
                        if (err) {
                            console.log(err);
                            asyncCallback(err, null);
                        }
                        asyncCallback(null, codingq);
                    })
                }
            },
            function (err, results) {
                function onUpdate() {
                    res.cookie('loaded', "true", {signed: true});
                    res.render('questions', {
                        technical: results.technical,
                        management: results.management,
                        coding: results.coding[0]
                    });
                };
                let collection = req.db.collection('round');
                let _id = req.signedCookies['reg_no'];
                collection.update(
                    {_id: _id},
                    {
                        $set: {
                            begin_at: new Date().toLocaleString(), begin_at_ms: new Date().getTime(),
                            technicalQuestions: results.technical, managementQuestions: results.management,
                            codingQuestion: results.coding
                        }
                    },
                    onUpdate);
            });
    }*/
});
/*
router.post('/questions', function (req, res) {
    if (!req.signedCookies['name']) {
        res.redirect('/roundone');
    }
    //check technical questions
    var ts = [];
    var ms = [];
    var c;
    var s;
    var blurCount = 0;
    for (var property in req.body) {
        if (req.body.hasOwnProperty(property)) {
            var question = property;
            var answer = req.body[property];
            var question_type = question[0];
            if (question_type == 't') {
                ts.push({_id: question.slice(1, question.length), answer: answer});
            }
            else if (question_type == 'm') {
                ms.push({_id: question.slice(1, question.length), answer: answer});
            }
            else if (question_type == 'c') {
                c = {_id: question.slice(1, question.length), answer: answer};
            }
            else if (question_type == 's') {
                s = {question: "skill set", answer: answer};
            }
            else {
                blurCount = answer;
            }
        }
    }
    var score = 0;
    var collection = req.db.collection('round');
    collection.findOne({_id: req.signedCookies['reg_no']}, function (err, doc) {
        if (err) {
            console.log(err);
            asyncCallback(err, null);
        }
        else {
            let tech = doc.technicalQuestions;
            for (var i = 0; i < tech.length; i++) {
                for (var j = 0; j < ts.length; j++) {
                    let qAsked = tech[i];
                    let qAnswered = ts[j];
                    if (qAsked._id == qAnswered._id) {
                        if (qAsked.answer == qAnswered.answer) {
                            score++;
                        }
                        tech[i].answered = qAnswered.answer;
                    }
                }
            }
            c.question = doc.codingQuestion[0].question;
            function onUpdate() {
                res.clearCookie('name', {});
                res.clearCookie('reg_no', {});
                res.clearCookie('loaded', {});
                res.redirect('/');
            }
            let management = req.db.collection('management');
            async.map(ms,
                function (m, asyncCallback) {
                    management.findOne({_id: parseInt(m._id)}, function (err, doc) {
                        if (err) {
                            console.log(err);
                            asyncCallback(err, null);
                        }
                        else {
                            m.question = doc.question;
                            asyncCallback(null, doc);
                        }
                    });
                }, function (err, results) {
                    let collection = req.db.collection('round');
                    let updateQuery = {
                        $set: {
                            end_at_ms: new Date().getTime(),
                            management: ms, technicalQuestions: tech, coding: c,
                            skills: s,
                            technicalScore: score, blurCount: blurCount
                        }
                    };
                    let _id = req.signedCookies['reg_no'];
                    collection.updateOne({_id: _id}, updateQuery, onUpdate);
            });
        }
    });
});
*/
module.exports = router;
