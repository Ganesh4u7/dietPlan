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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  constructor( private dietService: DietPlanService,
               private router: Router,
               private http: HttpClient,
               private httpService: HttpService,
               private loginService: LoginService
  ) {

  }

  ngOnInit(): void {


    this.loginForm = new FormGroup({
      username: new FormControl(null),
      pwd: new FormControl(null)
    });
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



}

