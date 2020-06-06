var mongoose = require('mongoose');
var schema = mongoose.Schema;

var messagesData = new schema ({
   username:String,
   email:String,
   subject:String,
  message:String,
  date:Date
});

module.exports = messagesData;
