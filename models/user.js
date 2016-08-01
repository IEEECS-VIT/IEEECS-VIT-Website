var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Question = require('./question');

var Response = new mongoose.Schema({
  question: {  type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  optionSelected : { type: Number },
  textResponse : { type: String }
})


var User = new mongoose.Schema({
  username : {  type: String, unique: true, required: true }, // registration number
  name : {  type: String, required: true    },
  email: {  type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'student']
  },
  responses : { type: [Response] },
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);