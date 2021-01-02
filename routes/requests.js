var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

var userDataSchema = require('../models/usersSchema');
var userData = mongoose.model('userData',userDataSchema);
var publishedPlansSchema = require('../models/publishedPlansSchema');
var publishedPlansData = mongoose.model('publishedDietPlans',publishedPlansSchema);
var publishedWorkoutPlansSchema = require('../models/publishedWorkoutPlansSchema')
var publishedWorkoutPlans = mongoose.model('publishedWorkoutPlans',publishedWorkoutPlansSchema);
var tokensSchema = require('../models/tokensSchema');
var tokensData = mongoose.model('tokensData',tokensSchema);
var messageSchema = require('../models/messagesSchema');
var messageData = mongoose.model('messagesData',messageSchema);
var itemsSchema = require('../models/itemsSchema');
var itemsData = mongoose.model('itemsData',itemsSchema);

router.post('/login',function (req,res) {

 console.log(req.body);
  let username = req.body.username;
  let pwd = req.body.password;
  let query;
  let email = req.body.email;
  if(email == 1){
    query = {
      email:username
    };
  }
  else if(email == 0){
    query ={
      username:username
    };
  }
console.log(query,email);
  userData.find(query,function (err1,data1) {
  //  console.log(data1[0]);
    if(err1){
      console.log(err1);
    }
    else if (data1.length > 0) {


      // if (data1[0].password == pwd) {
      //   let username = data1[0].username;
      //   let dob = data1[0].dob;
      //   let gender = data1[0].gender;
      //   let weight = data1[0].weight;
      //   let feet = data1[0].feet;
      //   let inch = data1[0].inch;
      //   let plans = data1[0].plans;
      //   let workoutPlans = data1[0].workoutPlans;
      //
      //   res.send({username:username,dob:dob,gender:gender,weight:weight,feet:feet,inch:inch,plans:plans,workoutPlans:workoutPlans,success:true});
   if(data1[0].password == pwd) {
     jwt.sign({username: data1[0].username, email: data1[0].email}, 'rogerFederer', (error, token) => {
       res.json({token,isVerified:data1[0].isVerified, success: true});
    console.log(data1[0].isVerified)
     })
   }
   else{
     res.json({success :false});
   }
         }


    else if(data1.length == 0) {
      res.send({username: username, success: false});
    }

  });

});

router.post('/getData',verifyToken,function(req,res){
 // console.log(req.token);
  jwt.verify(req.token,'rogerFederer',(err,authData)=>{

    if(err){
      res.sendStatus(403);
    }else{
      let username1 = req.body.username;
      let query;
      let email = req.body.email;
      if(email == 1){
        query = {
          email:username1
        };
      }
      else if(email == 0){
        query ={
          username:username1
        };
      }
      //console.log('in it1');
      userData.find(query,function (err1,data1) {
        //  console.log(data1[0]);
        if(err1){
          console.log(err1);
        }
        else if (data1.length > 0) {
         // console.log('in it');
              let username = data1[0].username;
              let pwd = data1[0].password;
              let email = data1[0].email;
              let dob = data1[0].dob;
              let gender = data1[0].gender;
              let weight = data1[0].weight;
              let feet = data1[0].feet;
              let inch = data1[0].inch;
              let plans = data1[0].plans;
              let workoutPlans = data1[0].workoutPlans;
              let vegetables,fruits,nuts,seeds,nonVeg,liquids,others;
              var pData ;
              publishedPlansData.find({},function (err3,data3) {

                // itemsData.find({itemType:'vegetables'},{_id:0},function (err4,data4) {
                //   if(err4){console.log(err4)}
                //   else{ vegetables = data4}
                // });
                //
                // itemsData.find({itemType:'fruits'},{_id:0},function (err4,data4) {
                //   if(err4){console.log(err4)}
                //   else{console.log(data4); fruits = data4}
                // });
                // itemsData.find({itemType:'nuts'},{_id:0},function (err4,data4) {
                //   if(err4){console.log(err4)}
                //   else{ nuts = data4}
                // });
                // itemsData.find({itemType:'seeds'},{_id:0},function (err4,data4) {
                //   if(err4){console.log(err4)}
                //   else{ seeds = data4}
                // });
                // itemsData.find({itemType:'non-veg'},{_id:0},function (err4,data4) {
                //   if(err4){console.log(err4)}
                //   else{ nonVeg = data4}
                // });
                // itemsData.find({itemType:'liquids'},{_id:0},function (err4,data4) {
                //   if(err4){console.log(err4)}
                //   else{ liquids = data4}
                // });
                // itemsData.find({itemType:'others'},{_id:0},function (err4,data4) {
                //   if(err4){console.log(err4)}
                //   else{ others = data4}
                // });

              //  console.log(data3);
                 pData = data3;
                res.send({username:username,password:pwd,dob:dob,email:email,gender:gender,weight:weight,feet:feet,inch:inch,plans:plans,workoutPlans:workoutPlans,publishedPlans:data3,success:true});
              });






        }

        else if(data1.length == 0) {
          res.send({username: username,success: false});
        }

      });
    }

  });
});


router.post('/signup',function (req,res) {

  let username = req.body.username;
  let email = req.body.email;
  let pwd = req.body.password;
  let dob = req.body.dob;
  let gender = req.body.gender;
  let weight = req.body.weight;
  let feet = req.body.feet;
  let inch = req.body.inch;
  let token = crypto.randomBytes(16).toString('hex')

  let data = new userData({
    username:username,email:email,password:pwd,dob:dob,gender:gender,weight:weight,feet:feet,inch:inch,token:token
  });

  data.save(function (err,userData) {
    if(err){
      console.log(err);
      if(err.code == 11000){
        res.send({username: username,success: false});
      }
      res.send({username: username,success: false});
    }
    else {
      console.log('user created with name '+ userData.username);
      let token1 =crypto.randomBytes(16).toString('hex');
      data.token  = token1;
      data.save(function (err2,data2) {
        if(err2){console.log(err2)}
        else{
          console.log(data2);
        }
      });
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'knowyourcaloriess@gmail.com',
          pass: 'FEDERER@123'
        }
      });
      let mailOptions = {
        from: 'knowyourcaloriess@gmail.com',
        to: email,
        subject: 'Account Verification Token',
        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' +req.get('host')+ '/confirmation?id='+ token1 + '.\n'
      };

      transporter.sendMail(mailOptions, function (err1, data1) {
        if (err1) {
          console.log(err1)
        }
        else {

          console.log('Email sent !!');
          res.send({success: true,username: username, message: 'Signup Completed and Confirmation mail sent.'});
        }

      });


    }
  });

});

router.post('/plans',function (req,res) {

  let plan = req.body[0];
  // console.log(plan);
  let nameTags = req.body[1];
  let totals = req.body[2];
  let username = req.body[3].username;
  let tot = req.body[3].tot;
if(username != null){
  userData.find({username: username}, function (err, data) {
    if (err) {
      console.log(err)
    }
    else {

      const info = data[0];

      const changes = {"nameTags": nameTags, "plan": plan, "totals": totals};

      info.plans.push(changes);
      info.save(function (err, data) {
        if (err) {
          console.log(err);
        }
        else {
          // console.log(data);
        }
        let id1;
        if (tot != 0) {
          id1 = data.plans[tot].id;
          return res.send({id: id1, success: true});
        }
        else if (tot == 0) {
          console.log(data.plans[0].id)
          id1 = data.plans[0].id;
          return res.send({id: id1, success: true});
        }


        // console.log(id1)

      })
    }
  });
}

});

router.post('/editname',function (req,res) {

  let editedName = req.body.nameTag;
  let index = req.body.index;
  let id = req.body._id;
  let username = req.body.username;

  userData.findOne({username:username,"plans._id": id},function (err,data) {
       data.plans[index].nameTags.nameTag = editedName;

  data.save((function(err) {
    if (err) {
      console.log(err)
    }
    console.log('name changed')
    return res.send('name changed');
  }))

  });


});

router.post('/deletePlan',function (req,res) {
  let index = req.body.index+1;
  let id = req.body.id;
  let username = req.body.username;
  // console.log(plans);

  userData.updateOne({username:username,"plans._id": id},{$pull: {"plans": {_id:id} }},{multi:true},function (err,data) {
    if(err){console.log(err)}
    else{console.log(data);
    res.send('Plan Deleted');
    }
  });

});


router.post('/saveRecipeName',function (req,res) {
  let username = req.body.username;
  let id = req.body.id;
  let index = req.body.index;
  let recipe = req.body.recipe;

  userData.findOne({username:username,"plans._id": id},function (err,data) {
   console.log(id);

    data.plans[index].nameTags.recipe = recipe;
    data.plans[index].nameTags.editMode = 1;

    data.save((function(err) {
      if (err) {
        console.log(err)
      }
      return res.send('recipe Updated');
    }))

  });
});

router.post('/workoutPlans',function (req,res) {

  let plan = req.body[0];
  // console.log(plan);
  let nameTags = req.body[1];
  let totals = req.body[2];
  let username = req.body[3].username;
  let tot = req.body[3].tot;

  userData.find({username:username},function (err,data) {
    if(err){console.log(err)}
    else{

      const info = data[0];

      const changes = {"nameTags": nameTags,"workoutPlan" : plan, "workoutTotals": totals};

      info.workoutPlans.push(changes);
      info.save(function(err,data) {
        if (err) {
          console.log(err);
        }
        else{
          // console.log(data);
        }
        let id1;
        if(tot != 0){
          return res.send({id:id1,success:true});
        }
        else if(tot == 0){
          console.log(data.plans[0].id)
          id1 = data.plans[0].id;
          return res.send({id:id1,success:true});
        }


        // console.log(id1)

      })
    }
  });


});


router.post('/deleteWorkoutPlan',function (req,res) {
  let index = req.body.index+1;
  let id = req.body.id;
  let username = req.body.username;
  // console.log(plans);

  userData.updateOne({username:username,"workoutPlans._id": id},{$pull: {"workoutPlans": {_id:id} }},{multi:true},function (err,data) {
    if(err){console.log(err)}
    else{console.log(data);
    }
  });

});

router.post('/editWorkoutName',function (req,res) {

  let editedName = req.body.nameTag;
  let index = req.body.index;
  let id = req.body._id;
  let username = req.body.username;

  userData.findOne({username:username,"workoutPlans._id": id},function (err,data) {
    data.workoutPlans[index].nameTags.nameTag = editedName;

    data.save((function(err) {
      if (err) {
        console.log(err)
      }
      return res.send('name changed');
    }))

  });


});
router.post('/saveSettings',function (req,res) {
  let username = req.body.username;
  let dob = req.body.dob;
  let gender = req.body.gender;
  let weight = req.body.weight;
  let feet = req.body.feet;
  let inch = req.body.inch;

  userData.findOne({username:username},function (err,data) {
    if(err){console.log(err)}
    else{
      data.dob = dob;
      data.gender = gender;
      data.weight = weight;
      data.feet = feet;
      data.inch = inch;

      data.save(function(err) {
        if (err) {
          console.log(err)
        }
        return res.send('Password saved');
      });
    }
  });


});

router.post('/changePassword',function (req,res) {
  let email = req.body.email;
  let pwd = req.body.password;
  userData.findOne({email:email},function (err,data) {
    if(err){console.log(err)}
    else{
      data.password =pwd;
      data.forgotPassword = 0;
      data.save(function(err) {
        if (err) {
          console.log(err)
        }
        return res.send('Password saved');
      });
    }
  });

});


router.post('/publishRecipe',function (req,res) {
userData.findOne({username:req.body.username},function (err2,data2) {
  if(err2){console.log(err2)}
  else {

      data2.plans[req.body.index].nameTags.publish = true;
      data2.save(function (err3,data3) {
        if(err3){console.log(err3)}
        else{
         // console.log(data3);
          let data = new publishedPlansData(req.body);
          data.save(function (err,data1) {
            if(err){
              console.log(err);
            }
            else{
              console.log(data1);
              res.send({id:data1._id,message:'Your Recipe Published.',success:true});
            }
          })
        }
      })

  }
});

});

router.post('/saveUpvote',function (req,res) {
  let id = req.body.id;
  let username = req.body.username;
  publishedPlansData.find({_id:id},function (err,data) {
    let info = data[0];
    info.upvotes.push({username:username});

    info.save(function (err1,data1) {
      if(err1){
        console.log(err1);
      }
      else{
        console.log(data[0].upvotes);
        res.send({success:true,upvotes:data[0].upvotes,message:'Upvoted'})
      }
    });
  });
});
router.post('/sendMessage',function (req,res) {
  let message = req.body.message;
  let subject = req.body.subject;
  let username = req.body.username;
  let email = req.body.email;
  let date = Date.now()

  var message1 = new messageData({
    username:username,email:email,subject:subject,message:message,date:date
  });
  message1.save(function (err,data) {
    if(err){console.log(err)}
    else{
      console.log(data);
      res.send({success:true});
    }
  });

});
router.post('/sendMail',function (req,res) {
  let email =req.body.email;
  userData.findOne({email:email},function (err,data) {
    if(err){console.log(err)}
    else if(data == {}){
      res.send({success:false,message:'Entered Email was not linked with any account '});
    }
    else {

      if (data.isVerified == true) {
        res.send({success: true, message: 'Entered Email already confirmed.'})
      }
      else {
        let token1 =crypto.randomBytes(16).toString('hex');
        data.token  = token1;
        data.save(function (err2,data2) {
          if(err2){console.log(err2)}
          else{
            console.log(data2);
          }
        });
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'knowyourcaloriess@gmail.com',
            pass: 'FEDERER@123'
          }
        });
        let mailOptions = {
          from: 'knowyourcaloriess@gmail.com',
          to: email,
          subject: 'Account Verification Token',
          text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' +req.get('host')+ '/confirmation?id='+ token1 + '.\n'
        };

        transporter.sendMail(mailOptions, function (err1, data1) {
          if (err1) {
            console.log(err1)
          }
          else {
            console.log('Email sent !!');
            res.send({success: true, message: 'Confirmation mail sent.'});
          }

        });
      }
    }
  });
});

router.get('/confirmation',function (req,res) {

  let token = req.query.id;


      userData.findOne({token:token},function (err1,data1) {
        if (data1.isVerified == true) {
          res.sendFile('public/index1.html', {root: __dirname});
        }
        else {
        data1.isVerified = true;
        data1.save(function (err2, data2) {

          if (err2) {
            console.log(err2)
          }
          else {
            res.sendFile('public/index.html', {root: __dirname});
          }
        });
      }
      });
});
router.post('/forgotPassword',function (req,res) {
  let email = req.body.email;
  //console.log(email);
  userData.findOne({email:email},function (err,data) {
    //console.log(data);
    if(err){console.log(err)}
    else {
      console.log(data);
      if (data != null) {
        if (data.email == email) {
          let secretKey = Math.floor(Math.random() * Math.floor(999999));
          //console.log(data.forgotPassword);
          data.forgotPassword = secretKey;
          data.save(function (err1, data1) {
            if (err1) {
              console.log(err1)
            }
            else {

              let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'knowyourcaloriess@gmail.com',
                  pass: 'TheBest@123'
                }
              });
              let mailOptions = {
                from: 'knowyourcaloriess@gmail.com',
                to: email,
                subject: 'Forgot Password',
                text: 'Hello ' + data.username + ',\n\n' + 'We understand you would like to change your password. Your Verification Code is .' + secretKey + '\n'
              };

              transporter.sendMail(mailOptions, function (err2, data2) {
                if (err2) {
                  console.log(err2)
                }
                else {
                  console.log('Email sent !!');
                  console.log({success: true, secretKey: secretKey});
                  res.send({success: true, secretKey: secretKey});
                }

              });

            }
          });
        }
      }
      else {
        res.send({success: false, message: 'Email does not exist.'});
      }
    }

  });
});

router.post('/addItem',function (req,res) {
  let data = req.body;


  var item = new itemsData(
    data
  );
  item.save(function (err,data) {
    if(err){console.log(err)}
    else{
      console.log(data);
      res.send({success:true});
    }
  });

});
router.post('/checkUsername',function (req,res) {
  let query = req.body.query;
  userData.find(query,function (err,data) {
    if(err){
      console.log(err)
    }
    else {
      if(data.length == 0){
        res.send({success:true,found:0});
      }
      else if(data.length > 0){
        res.send({success:true,found:1})
      }
    }
  });
});

function verifyToken(req,res,next){

  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    console.log(bearerToken);
    req.token = bearerToken;
    next();

  }
  else {
    res.sendStatus(403);
  }

}

    module.exports =router;


