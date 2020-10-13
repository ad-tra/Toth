var mongoose = require("mongoose");

var main = new mongoose.Schema({
  type: Number,
  content: String,
  date: String,
  link: String,
  discrp: String 
});

module.exports = mongoose.model('articles', main);