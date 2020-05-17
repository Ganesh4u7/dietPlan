import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../http.service';
import {DietPlanService} from '../diet-plan.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
userSettings:FormGroup;
passwordForm: FormGroup;
passCheck:any= null;
pwdSaved = 0;
settingsSaved = 0;
username ;
email;
credentials;
  constructor( private httpService: HttpService,
               private dietService: DietPlanService)
{ }

  ngOnInit(): void {
 this.pwdSaved = 0;
 this.settingsSaved = 0;
 this.credentials = this.dietService.userCredentials;
    this.username = this.dietService.userCredentials.username;
    this.email = this.dietService.userCredentials.email;
    this.userSettings = new FormGroup({

      gender: new FormControl(null),
      dob:new FormControl(null),
      weight:new FormControl(null),
      feet: new FormControl(null),
      inch:new FormControl(null)
    });

    this.passwordForm = new FormGroup({
      pwd: new FormControl(null),
      cpwd: new FormControl(null)
    });
  }


  onUserSettings(){
    let dob  = this.userSettings.value.dob;
    let gender = this.userSettings.value.gender;
    let weight= this.userSettings.value.weight;
    let feet= this.userSettings.value.feet;
    let inch = this.userSettings.value.inch;

    this.httpService.onSaveSettings({username:this.username,dob:dob,gender:gender,weight:weight,feet:feet,inch:inch}).subscribe(
      (response) => {this.settingsSaved = 1;
      this.dietService.userCredentials.weight = weight;
      this.dietService.userCredentials.feet = feet;
      this.dietService.userCredentials.inch = inch;
      this.userSettings.reset()},
      (error) => console.log(error)
    );


  }

  onChangePwd(){
    if(this.passwordForm.value.pwd == this.passwordForm.value.cpwd) {

      this.passCheck = true;
      let pwd = this.passwordForm.value.pwd;
      this.httpService.onChangePwd({email:this.email,password:pwd}).subscribe(
        (response) => {this.pwdSaved = 1;
        this.passwordForm.reset()},
        (error) => console.log(error)
      );

    }
  }

}
