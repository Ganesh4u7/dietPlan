import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../http.service';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})

export class ConfirmationComponent implements OnInit {

  confirmationForm: FormGroup;
  confirmation = false;
  message = '';

  constructor( private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.confirmationForm = new FormGroup({
      email: new FormControl(null)
    });
  }

  onConfirmationEmail() {
   let email = this.confirmationForm.value.email;
    this.httpService.onSendMail({email:email}).subscribe(
      (response) => {
        if(response.success == true){
          this.confirmation = true;
          this.message = response.message;
        }
      },
      (error) => console.log(error)
    );

  }
}
