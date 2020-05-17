import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import * as Rx from 'rxjs-compat';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {DietPlanService} from './diet-plan.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private dietPlanService: DietPlanService) {
  }


  onLogin(data) {
    return this.http.post('/login', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  onSignup(data) {
    return this.http.post('/signup', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  onSendPlans(data) {
    return this.http.post('/plans', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));


  }
  onEditName(data){
    return this.http.post('/editname', data,{responseType: 'text'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onDeletePlan(data){
    return this.http.post('/deleteplan', data,{responseType: 'text'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  onSaveRecipeName(data){
    return this.http.post('/saveRecipeName', data,{responseType: 'text'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  onSendWorkoutPlans(data) {
    return this.http.post('/workoutPlans', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));


  }
  onDeleteWorkoutPlan(data){
    return this.http.post('/deleteWorkoutPlan', data,{responseType: 'text'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  onEditWorkoutName(data){
    return this.http.post('/editWorkoutName', data,{responseType: 'text'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  onGetData(data) {
    let headers   = new HttpHeaders();
    return this.http.post('/getData', data,{
      headers: new HttpHeaders({'Authorization': `Bearer ${this.dietPlanService.token}`,'responseType': 'json'})}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onChangePwd(data){
    return this.http.post('/changePassword', data,{responseType: 'text'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onSaveSettings(data){
    return this.http.post('/saveSettings', data,{responseType: 'text'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onPublishRecipe(data){
    return this.http.post('/publishRecipe', data,{responseType: 'text'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onSendUpvote(data){
    return this.http.post('/saveUpvote', data,{responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onSendMail(data) {
    return this.http.post('/sendMail', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onForgotPassword(data) {
    return this.http.post('/forgotPassword', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onSendMessage(data){
    return this.http.post('/sendMessage', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onAddItem(data){
    return this.http.post('/addItem', data, {responseType: 'json'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  // onLogin(data) {
  //   return this.http.post('http://localhost:4300/login', data, {responseType: 'json'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  //
  // onSignup(data) {
  //   return this.http.post('http://localhost:4300/signup', data, {responseType: 'json'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  //
  // onSendPlans(data) {
  //   return this.http.post('http://localhost:4300/plans', data, {responseType: 'json'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  //
  //
  // }
  // onEditName(data){
  //   return this.http.post('http://localhost:4300/editname', data,{responseType: 'text'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  // onDeletePlan(data){
  //   return this.http.post('http://localhost:4300/deleteplan', data,{responseType: 'text'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  //
  // onSaveRecipeName(data){
  //   return this.http.post('http://localhost:4300/saveRecipeName', data,{responseType: 'text'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  //
  // onSendWorkoutPlans(data) {
  //   return this.http.post('http://localhost:4300/workoutPlans', data, {responseType: 'json'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  //
  //
  // }
  // onDeleteWorkoutPlan(data){
  //   return this.http.post('http://localhost:4300/deleteWorkoutPlan', data,{responseType: 'text'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  //
  // onEditWorkoutName(data){
  //   return this.http.post('http://localhost:4300/editWorkoutName', data,{responseType: 'text'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  //
  // onGetData(data) {
  //   let headers   = new HttpHeaders();
  //   return this.http.post('http://localhost:4300/getData', data,{
  //     headers: new HttpHeaders({'Authorization': `Bearer ${this.dietPlanService.token}`,'responseType': 'json'})}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  // onChangePwd(data){
  //   return this.http.post('http://localhost:4300/changePassword', data,{responseType: 'text'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  // onSaveSettings(data){
  //   return this.http.post('http://localhost:4300/saveSettings', data,{responseType: 'text'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  // onPublishRecipe(data){
  //   return this.http.post('http://localhost:4300/publishRecipe', data,{responseType: 'text'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  // onSendUpvote(data){
  //   return this.http.post('http://localhost:4300/saveUpvote', data,{responseType: 'json'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  // onSendMail(data) {
  //   return this.http.post('http://localhost:4300/sendMail', data, {responseType: 'json'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  // onForgotPassword(data) {
  //   return this.http.post('http://localhost:4300/forgotPassword', data, {responseType: 'json'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  // onSendMessage(data){
  //   return this.http.post('http://localhost:4300/sendMessage', data, {responseType: 'json'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }
  // onAddItem(data){
  //   return this.http.post('http://localhost:4300/addItem', data, {responseType: 'json'}).pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return throwError('Something went wrong!');
  //     }));
  // }

}
