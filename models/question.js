var mongoose = require('mongoose');
var User = require('./user');

var Question = mongoose.Schema({
  question : { type: String, required: true },
  submittedBy: {  type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
  category: {
    type: String,
    required: true,
    enum: ['technical', 'management']
  },
  options : { type: [String] }, // null if management
  correctOption : { type: Number } // null if management
});



Question.pre('save', function (next) {
    var question = this;
    if (question.category == 'technical') {
        if (question.options == null) {
            return next(new Error('A technical question must have options.'));
        }
        if (question.correctOption == null) {
            return next(new Error('A correct option must be specified for technical questions.'));
        }
        if (question.correctOption > question.options.length) {
            return next(new Error('Correct option out of bounds.'));
        }
    }
    return next(null);
    
})

module.exports = mongoose.model('Question', Question);