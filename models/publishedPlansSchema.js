var mongoose = require('mongoose');
var schema = mongoose.Schema;

var publishedPlansData = new schema({

  creatorName:String,
  upvotes:[{username:String}],
  upvoteCheck:{type:Boolean,default:false},
    nameTags: {
      nameTag: String, date: Date, recipe: String, editPlanName: Number
    },
    plan: [{
      name: String,
      itemType: String,
      weight: Number,
      metric: String,
      kcal: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      sfat: Number,
      DFib: Number,
      sugar: Number,
      sodium: Number,
      sWeight: Number,
      click: Number
    }],
    totals:
      {
        kcal: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
        sfat: Number,
        DFib: Number,
        sugar: Number,
        sodium: Number,
        weight: Number
      }


});

module.exports = publishedPlansData;
