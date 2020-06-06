var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userData =  new schema({
  username:{
    type:String,
    unique:true,
    required:true
  },
  email:{
    type:String,
    unique: true,
    required: true
  },
  password:String,
  gender:String,
  dob:Date,
  weight:Number,
  feet:Number,
  inch:Number,
  token:String,
  forgotPassword:{type:Number,default:0},
  isVerified: { type: Boolean, default: false },
  plans:[{
    nameTags: {
      nameTag: String, date: Date, editMode: Number, recipe: String, editPlanName: Number,publish:{type:Boolean,default:false}
    },
    plan: [{
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
    }],
    totals:
      {
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
        weight:Number
      }
  }],
  workoutPlans:[{
    nameTags: {
      nameTag: String, date: Date, editMode: Number, recipe: String, editPlanName: Number,publish:Number
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


  }]



});


module.exports =userData;
