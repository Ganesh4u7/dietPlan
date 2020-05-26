import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,NgForm} from '@angular/forms';
import {DietPlanService} from '../diet-plan.service';
import {Router} from '@angular/router';
import {debounceTime, delay, distinctUntilChanged, mergeMap} from 'rxjs/operators';
import {fromEvent, of, Subject, Subscription} from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http.service';
import {LoginService} from '../login.service';
import {Observable} from 'rxjs';
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
  nameCheck;
  emailCheck;
  userFound;
  emailFound;
  timeoutID = null;
  credentials: any = {username:'roger',password:'thebest1'}

  // public keyUp = new Subject<KeyboardEvent>();
  //
  // private subscription: Subscription;

  constructor( private dietService: DietPlanService,
               private router: Router,
               private http: HttpClient,
               private httpService: HttpService,
               private loginService: LoginService
               ) {
    // this.subscription = this.keyUp.pipe(
    //   map(event => (<HTMLInputElement>event.target).value),
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   mergeMap(search => of(search).pipe(
    //     delay(500),
    //   )),
    // ).subscribe(console.log);

  }

  ngOnInit(): void {
    // var today = new Date();
    // var dd = today.getDate();
    // var mm = today.getMonth()+1; //January is 0!
    // var yyyy = today.getFullYear();
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

      var username = this.signupForm.value.username.toLowerCase();
      var email = this.signupForm.value.email.toLowerCase();
      var pwd = this.signupForm.value.cpwd;
      var dob = this.signupForm.value.dob;
      var gender = this.signupForm.value.gender;
      var weight = this.signupForm.value.weight;
      var feet = this.signupForm.value.feet;
      var inch = this.signupForm.value.inch;
      this.dietService.userCredentials = {username:username,email:email,password:pwd,dob:dob,weight:weight,feet:feet,inch:inch};

      this.httpService.onSignup({username:username,email:email,password:pwd,dob:dob,gender:gender,weight:weight,feet:feet,inch:inch}).subscribe(
        (response) => {
          if(response.success == true){
            this.signUpStatus = true;
            this.signupForm.reset();
          }
          else if(response.success == false){
            this.signUpStatus = false;
          }
        },
        (error) => console.log(error)
      );


      // this.router.navigate(['/create-plan']);

    }
  }
  onLogin(){
    var name = this.loginForm.value.username.toLowerCase();
    var pwd = this.loginForm.value.pwd;
    var email = 0;
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(name)){
      email = 1;
    }
    else{
      email = 0;
    }

    this.httpService.onLogin({username:name,password:pwd,email:email}).subscribe(
     (data:any) => {
       // if (data.isVerified == true){
         if (data.success == true && data.isVerified == true) {
           this.falseStatus = false;
           this.dietService.token = data.token;
           this.loginService.setLoggedin(true);
           this.httpService.onGetData({username: name,email:email}).subscribe(
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

               for (var i = 0; i < data.plans.length; i++) {
                 this.dietService.savedPlansArray[i] = data.plans[i].plan;
                 this.dietService.savedPlansNametags[i] = data.plans[i].nameTags;
                 this.dietService.savedPlansTotals[i] = data.plans[i].totals;
                 this.dietService.plansIds[i] = data.plans[i]._id;
               }
               for (var j = 0; j < data.workoutPlans.length; j++) {
                 this.dietService.savedWorkoutPlansArray[j] = data.workoutPlans[j].workoutPlan;
                 this.dietService.savedWorkoutPlansNametags[j] = data.workoutPlans[j].nameTags;
                 this.dietService.savedWorkoutPlansTotals[j] = data.workoutPlans[j].workoutTotals;
                 this.dietService.workoutPlansIds[j] = data.workoutPlans[j]._id;
               }
               for (var k = 0; k < data.publishedPlans.length; k++) {

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
           this.username = data.username;
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

        for (var i = 0; i < data.plans.length; i++) {
          this.dietService.savedPlansArray[i] = data.plans[i].plan;
          this.dietService.savedPlansNametags[i] = data.plans[i].nameTags;
          this.dietService.savedPlansTotals[i] = data.plans[i].totals;
          this.dietService.plansIds[i] = data.plans[i]._id;
        }
        for (var j = 0; j < data.workoutPlans.length; j++) {
          this.dietService.savedWorkoutPlansArray[j] = data.workoutPlans[j].workoutPlan;
          this.dietService.savedWorkoutPlansNametags[j] = data.workoutPlans[j].nameTags;
          this.dietService.savedWorkoutPlansTotals[j] = data.workoutPlans[j].workoutTotals;
          this.dietService.workoutPlansIds[j] = data.workoutPlans[j]._id;
        }
        for (var k = 0; k < data.publishedPlans.length; k++) {

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

    for(var i=0;i< this.dietService.publishedPlans.length;i++){
      for(var j =0;j< this.dietService.publishedPlans[i].upvotes.length; j++){
        if(this.dietService.publishedPlans[i].upvotes[j].username == this.dietService.userCredentials.username ){
          this.dietService.publishedPlans[i].upvoteCheck =true;
        }
      }
    }
  }

  forgotPassword() {
    this.router.navigate(['/forgotPassword']);
  }



  debounce1(delay){
    if(this.timeoutID != null){
      clearTimeout(this.timeoutID);
    }
    this.timeoutID = setTimeout(()=>{
      let name = this.nameCheck.toLowerCase();

      this.httpService.onCheckUsername({query: {username: name}}).subscribe(
        responce=>{
          if(responce.found == 1){
            this.userFound =1;
          }
          else{
            this.userFound =0;
          }
        },
        error => {console.log(error)}
      );
    },delay);
  }

  debounce2(delay){
    if(this.timeoutID != null){
      clearTimeout(this.timeoutID);
    }
    this.timeoutID = setTimeout(()=>{
      let email = this.emailCheck.toLowerCase();

      this.httpService.onCheckUsername({query:{email:email}}).subscribe(
        responce=>{
          if(responce.found == 1){
            this.emailFound =1;
          }
          else{
            this.emailFound =0;
          }
        },
        error => {console.log(error)}
      );
    },delay);
  }

 searchName(name){
    this.userFound= 2;
   this.debounce1(2000);
 }
 searchEmail(){
    this.emailFound = 2;
   this.debounce2(2000);
 }
 passwordCheck(){
    console.log(this.signupForm.value.pwd,this.signupForm.value.cpwd);
   if(this.signupForm.value.pwd == this.signupForm.value.cpwd) {
     this.passCheck = true;
   }
   else{
     this.passCheck =false;
   }
 }

}
