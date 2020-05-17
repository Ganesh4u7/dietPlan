var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tokensData = new schema({
  username:String,
  token:String
});

module.exports = tokensData;
