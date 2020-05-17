import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../http.service';
import {DietPlanService} from '../diet-plan.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  confirmationForm: FormGroup;
  verificationForm: FormGroup;
  passwordChangeForm: FormGroup;
  verification = null;
  passCheck;
  pwdSaved = 0;
  message = '';
  confirmation = null;
  message1 = '';
  email;

  constructor( private httpService: HttpService,
               private dietService: DietPlanService) {
  }

  ngOnInit(): void {
    this.confirmationForm = new FormGroup({
      email: new FormControl(null)
    });
    this.verificationForm = new FormGroup({
      key: new FormControl(null)
    });
    this.passwordChangeForm = new FormGroup({
      pwd: new FormControl(null),
      cpwd: new FormControl(null)
    });
  }

  onConfirmationEmail() {
    let email = this.confirmationForm.value.email;
    this.email = email;
    this.httpService.onForgotPassword({email:email}).subscribe(
      (response) => {
        console.log(response);
        if(response.success == true){
          this.confirmation = true;
          this.dietService.secretKey = response.secretKey;
          this.message = 'Verification Code has been sent to your Email';
          console.log(this.message);
        }
        else{
          this.confirmation = false;
          this.message = response.message;
        }
      },
      (error) => console.log(error)
    );

  }

  onCheckCode(){
    let enteredCode = this.verificationForm.value.key;
    let secretKey = this.dietService.secretKey;
    if(enteredCode == secretKey){
      this.verification = true;
      this.message1 = 'Valid Code';
    }
    else{
      this.verification = false;
      this.message1 = 'Invalid Code';
    }
  }
  resendMail(){

  }

  onChangePassword(){
    let pwd = this.passwordChangeForm.value.pwd;
    let cpwd = this.passwordChangeForm.value.cpwd;
    if(pwd == cpwd) {

      this.passCheck = true;

      this.httpService.onChangePwd({email:this.email,password:pwd}).subscribe(
        (response) => {this.pwdSaved = 1},
        (error) => console.log(error)
      );

    }
  }
}
