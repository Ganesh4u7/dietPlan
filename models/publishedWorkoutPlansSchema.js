var mongoose = require('mongoose');
var schema = mongoose.Schema;

var publishedWorkoutPlansData = new schema({

  creatorName: String,
  upvotes:[{username:String}],
    nameTags: {
      nameTag: String, date: Date,  recipe: String, editPlanName: Number
    },
    workoutPlan: [{
      name: String,
      description: String,
      met: Number,
      mins: Number,
      click: Number
    }],
    workoutTotals:{
      calories:Number,
      mins:Number
    }

});


module.exports = publishedWorkoutPlansData;
