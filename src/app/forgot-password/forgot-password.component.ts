import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../http.service';
import {DietPlanService} from '../diet-plan.service';
import {Router} from '@angular/router';

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
               private dietService: DietPlanService,
               private router: Router) {
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
    var email = this.confirmationForm.value.email;
    this.email = email;
    this.httpService.onForgotPassword({email:email}).subscribe(
      (response) => {
        if(response.success == true){
          this.confirmation = true;
          this.dietService.secretKey = response.secretKey;
          this.message = 'Verification Code has been sent to your Email';

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
    var enteredCode = this.verificationForm.value.key;
    var secretKey = this.dietService.secretKey;
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
    var pwd = this.passwordChangeForm.value.pwd;
    var cpwd = this.passwordChangeForm.value.cpwd;
    if(pwd == cpwd) {

      this.passCheck = true;

      this.httpService.onChangePwd({email:this.email,password:pwd}).subscribe(
        (response) => {this.pwdSaved = 1},
        (error) => console.log(error)
      );

    }
  }
  onLogin(){
    this.router.navigate(['/']);
  }
}
