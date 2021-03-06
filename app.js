var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

const uri = "mongodb+srv://ganesh:thebest1@cluster0.e6tdc.mongodb.net/diet-plan?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
});

app.use(bodyparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.use(cors());
var corsOptions = {
  origin: 'http://know-your-calories.herokuapp.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.options('*', cors())

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  next();
});

app.use(express.static(path.join(__dirname, './dist/dietplan')));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,"./dist/dietplan/index.html"));
});
app.get('/login',function(req,res){
  res.sendFile(path.join(__dirname,"./dist/dietplan/index.html"));
});
app.get('/signup',function(req,res){
  res.sendFile(path.join(__dirname,"./dist/dietplan/index.html"));
});
app.get('/covid',function(req,res){
  res.sendFile(path.join(__dirname,"./dist/dietplan/index.html"));
});
app.get('/create-plan',function(req,res){
  res.sendFile(path.join(__dirname,"./dist/dietplan/index.html"));
});
// app.all('*', function(req, res, next) {
//   res.sendFile(path.join(__dirname,"./dist/dietplan/index.html"));
// });
app.use('',require('./routes/requests'));

module.exports = app;
