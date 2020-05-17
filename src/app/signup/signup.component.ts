import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,NgForm} from '@angular/forms';
import {DietPlanService} from '../diet-plan.service';
import {Router} from '@angular/router';


import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http.service';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loginForm: FormGroup;
  passCheck;
  falseStatus ;
  signUpStatus;
  verification = true;
  loginToken;
  username;
  credentials: any = {username:'roger',password:'thebest1'}
  constructor( private dietService: DietPlanService,
               private router: Router,
               private http: HttpClient,
               private httpService: HttpService,
               private loginService: LoginService
               ) { }

  ngOnInit(): void {
    // let today = new Date();
    // let dd = today.getDate();
    // let mm = today.getMonth()+1; //January is 0!
    // let yyyy = today.getFullYear();
    //
    // if(dd<10){
    //
    //   dd='0'+dd.toString();
    // }
    // if(mm<10){
    //
    //   mm='0'+mm.toString();
    //
    // }
    //
    // today = yyyy+'-'+mm+'-'+dd;
    // document.getElementById("datefield").setAttribute("max", today);

    this.signupForm = new FormGroup({
      username: new FormControl(null),
      pwd:new FormControl(null),
      cpwd: new FormControl(null),
      email: new FormControl(null),
      gender: new FormControl(null),
      dob:new FormControl(null),
      weight:new FormControl(null),
      feet: new FormControl(null),
      inch:new FormControl(null)
    });



    this.loginForm = new FormGroup({
      username: new FormControl(null),
      pwd: new FormControl(null)
    });
  }

  onSignUp(){
    if(this.signupForm.value.pwd == this.signupForm.value.cpwd) {

      this.passCheck = true;

      let username = this.signupForm.value.username;
      let email = this.signupForm.value.email;
      let pwd = this.signupForm.value.cpwd;
      let dob = this.signupForm.value.dob;
      let gender = this.signupForm.value.gender;
      let weight = this.signupForm.value.weight;
      let feet = this.signupForm.value.feet;
      let inch = this.signupForm.value.inch;
      this.dietService.userCredentials = {username:username,email:email,password:pwd,dob:dob,weight:weight,feet:feet,inch:inch};

      this.httpService.onSignup({username:username,email:email,password:pwd,dob:dob,gender:gender,weight:weight,feet:feet,inch:inch}).subscribe(
        (response) => {
          console.log(response);
          if(response.success == true){
            this.signUpStatus = true;
            this.signupForm.reset();
          }
        },
        (error) => console.log(error)
      );


      // this.router.navigate(['/create-plan']);

    }
  }
  onLogin(){
    var name = this.loginForm.value.username;
    var pwd = this.loginForm.value.pwd;

    this.httpService.onLogin({username:name,password:pwd}).subscribe(
     (data:any) => {
       // if (data.isVerified == true){
         if (data.success == true && data.isVerified == true) {
           this.falseStatus = false;
           this.dietService.token = data.token;
           this.loginService.setLoggedin(true);
           this.httpService.onGetData({username: name}).subscribe(
             (data: any) => {
               this.dietService.userCredentials = {
                 username: data.username,
                 password: data.password,
                 email: data.email,
                 weight: data.weight,
                 dob: data.dob,
                 gender: data.gender,
                 feet: data.feet,
                 inch: data.inch,
                 isVerified: data.isVerified
               };

               for (let i = 0; i < data.plans.length; i++) {
                 this.dietService.savedPlansArray[i] = data.plans[i].plan;
                 this.dietService.savedPlansNametags[i] = data.plans[i].nameTags;
                 this.dietService.savedPlansTotals[i] = data.plans[i].totals;
                 this.dietService.plansIds[i] = data.plans[i]._id;
               }
               for (let j = 0; j < data.workoutPlans.length; j++) {
                 this.dietService.savedWorkoutPlansArray[j] = data.workoutPlans[j].workoutPlan;
                 this.dietService.savedWorkoutPlansNametags[j] = data.workoutPlans[j].nameTags;
                 this.dietService.savedWorkoutPlansTotals[j] = data.workoutPlans[j].workoutTotals;
                 this.dietService.workoutPlansIds[j] = data.workoutPlans[j]._id;
               }
               console.log(data.publishedPlans);
               for (let k = 0; k < data.publishedPlans.length; k++) {

                 this.dietService.publishedPlans.push(data.publishedPlans[k]);
               }

               setTimeout(() => {
                 this.router.navigate(['/create-plan']);
                 this.upvoteCheck();
               }, 1000);

             }
           )
         }
         else if(data.success == true && data.isVerified == false){
           this.loginToken = data.token;
           this.username = name;
           this.falseStatus = false;
           this.verification = false;

         }
         else if (data.success == false) {
           this.falseStatus = true;
         }
     // }
     // else if(data.isVerified == false){
     //
     //   }
     },
      (error) => console.log(error)
    );
  }


  navigateToConfirmation(){
    this.router.navigate(['/confirmation']);
  }
  verifyAccount(){
    this.router.navigate(['/confirmation']);
  }
  moveToHomepage(){
    this.dietService.token = this.loginToken;
    this.loginService.setLoggedin(true);
    this.httpService.onGetData({username: this.username}).subscribe(
      (data: any) => {
        this.dietService.userCredentials = {
          username: data.username,
          password: data.password,
          email: data.email,
          weight: data.weight,
          dob: data.dob,
          gender: data.gender,
          feet: data.feet,
          inch: data.inch,
          isVerified: data.isVerified
        };

        for (let i = 0; i < data.plans.length; i++) {
          this.dietService.savedPlansArray[i] = data.plans[i].plan;
          this.dietService.savedPlansNametags[i] = data.plans[i].nameTags;
          this.dietService.savedPlansTotals[i] = data.plans[i].totals;
          this.dietService.plansIds[i] = data.plans[i]._id;
        }
        for (let j = 0; j < data.workoutPlans.length; j++) {
          this.dietService.savedWorkoutPlansArray[j] = data.workoutPlans[j].workoutPlan;
          this.dietService.savedWorkoutPlansNametags[j] = data.workoutPlans[j].nameTags;
          this.dietService.savedWorkoutPlansTotals[j] = data.workoutPlans[j].workoutTotals;
          this.dietService.workoutPlansIds[j] = data.workoutPlans[j]._id;
        }
        console.log(data.publishedPlans);
        for (let k = 0; k < data.publishedPlans.length; k++) {

          this.dietService.publishedPlans.push(data.publishedPlans[k]);
        }

        setTimeout(() => {
          this.router.navigate(['/create-plan']);
          this.upvoteCheck();
        }, 1000);

      },
      (error) => console.log(error)
    )
  }
  upvoteCheck(){

    for(let i=0;i< this.dietService.publishedPlans.length;i++){
      for(let j =0;j< this.dietService.publishedPlans[i].upvotes.length; j++){
        if(this.dietService.publishedPlans[i].upvotes[j].username == this.dietService.userCredentials.username ){
          this.dietService.publishedPlans[i].upvoteCheck =true;
        }
      }
    }
  }

  forgotPassword() {
    this.router.navigate(['/forgotPassword']);
  }
}
