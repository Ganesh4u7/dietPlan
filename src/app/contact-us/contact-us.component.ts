import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../http.service';
import {DietPlanService} from '../diet-plan.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  messageForm:FormGroup;
  messageSent = false;
  constructor( private httpService: HttpService,
               private  dietService:DietPlanService) {
  }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      subject: new FormControl(null),
      message: new FormControl(null)
      }
    )
  }

  onSubmitMessage(){
   let subject =this.messageForm.value.subject;
   let message = this.messageForm.value.message;
   console.log(this.dietService.userCredentials.email);
   this.httpService.onSendMessage({username:this.dietService.userCredentials.username,email:this.dietService.userCredentials.email,
   subject:subject,message:message}).subscribe(
     (response)=>{
       if(response.success == true){
         this.messageSent = true;
         this.messageForm.reset();
       }
     },
   (error)=>{console.log(error)}
   );
  }

}
