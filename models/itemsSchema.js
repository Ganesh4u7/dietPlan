var mongoose = require('mongoose');
var schema = mongoose.Schema;


var itemsData = new schema({
  name:String,
  telName:String,
  hinName:String,
  kcal:Number,
  carbs:Number,
  protein:Number,
  fat:Number,
  sfat:Number,
  pfat:Number,
  mfat:Number,
  cholesterol:Number,
  sodium:Number,
  potassium:Number,
  dfib:Number,
  sugar:Number,
  vitA:Number,
  vitC:Number,
  vitK:Number,
  vitE:Number,
  vitB6:Number,
  calcium:Number,
  iron:Number,
  vitD:Number,
  zinc:Number,
  vitB12:Number,
  mag:Number,
  sWeight:Number,
  click:Number,
  itemType:String,
  weight:Number,
  imgUrl:String
});

module.exports = itemsData;
