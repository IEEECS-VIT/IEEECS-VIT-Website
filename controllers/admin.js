var path = require('path');
var passport = require('passport');
var Question = require(path.join(__dirname, '..', 'models', 'question'));


exports.getIndex = function (req, res, next)
{
    return res.render('admin-index');
}

exports.getNewQuestion = function (req, res, next)
{
    return res.render('admin-question-new');
}

exports.postNewQuestion = function (req, res, next)
{
    console.log(req.user);
    var question = {    question: req.body.question, category: req.body.category, submittedBy: req.user    };
    if (req.body.category == 'technical')
    {
        question.options = [];
        question.options[0] = req.body.option0;
        question.options[1] = req.body.option1;
        question.options[2] = req.body.option2;
        question.options[3] = req.body.option3;

        question.correctOption = req.body.correctOption;
    }
    
    var questionDocument  = new Question(question);
    console.log(questionDocument);
    
    questionDocument.save()
    .then(function (doc) {
        req.flash('message', 'Question added successfully.');
        return res.redirect('back');
    })
    .catch(function (err) {
        req.flash('message', 'Please check the question and retry.');
        console.log(err);
        return res.redirect('back');
    })
}

exports.getListQuestions = function (req, res, next)
{
    Question.find({})
    .populate('submittedBy')
    .then(function (docs) {
        return res.render('admin-question-list', {questions: docs});
    })
    .catch(next);
}

exports.getQuestion = function (req, res, next)
{
    console.log(req.params.id);
    Question.findById(req.params.id)
    .populate('submittedBy')
    .then(function (doc) {
        console.log(doc);
        return res.render('admin-question-details', {question: doc});
    })
    .catch(next);
}

