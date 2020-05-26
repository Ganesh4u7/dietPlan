import { Component, OnInit } from '@angular/core';
import {DietPlanService} from '../diet-plan.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  width: any;
  height:any;
  selectedValue:any = null;
  bmr:any;
  bmrWorkout:any= [{bmr:1,per:1},{bmr:1.2,per:0.10},{bmr:1.375,per:0.09},{bmr:1.465,per:0.08},{bmr:1.55,per:0.08},{bmr:1.725,per:0.07},
    {bmr:1.9,per:0.06}]
  details:any = {weight:null,feet:null,inch:null,bmi:null};
  dataSource = {
    "chart": {
      "lowerLimit": "0",
      "upperLimit": "45",
      "showValue": "1",
      "numberSuffix": "",
      "theme": "fusion",
      "showToolTip": "0"
    },
    "colorRange": {
      "color": [{
        "minValue": "0",
        "maxValue": "16",
        "code": "#f20c21"
      },
        {
          "minValue": "16",
          "maxValue": "17",
          "code": "#f24156"
        },
        {
          "minValue": "17",
          "maxValue": "18.5",
          "code": "#f2919a"
        },
        {
        "minValue": "18.5",
        "maxValue": "25",
        "code": "#10cc38"
      },
        {
          "minValue": "25",
          "maxValue": "30",
          "code": "#fffe1d"
        },{
        "minValue": "30",
        "maxValue": "35",
        "code": "#f2919a"
      },
        {
          "minValue": "35",
          "maxValue": "40",
          "code": "#f24156"
        },
        {
          "minValue": "40",
          "maxValue": "45",
          "code": "#f20c21"
        },
      ]
    },
    "dials": {
      "dial": [{
        "value": 0
      }]
    }
  }
  constructor( private dietPlanService: DietPlanService) { }

  ngOnInit(): void {

this.bmi();
this.screenWidth();
this.bmrCalc();

  }

  bmi(){
    var weight = this.dietPlanService.userCredentials.weight *2.2;
    this.details.weight =this.dietPlanService.userCredentials.weight
    var feet = this.dietPlanService.userCredentials.feet;
    this.details.feet = feet;
    var inch = this.dietPlanService.userCredentials.inch;
    this.details.inch = inch;
    var totalInches = (feet * 12) + inch;
    var bmi=((weight/Math.pow(totalInches,2))*703);

    this.dataSource.dials.dial[0].value = bmi;
    this.details.bmi = bmi;

  }

screenWidth(){
  if(screen.width>720){
    this.width = (screen.width * 0.45);
    this.height = (screen.width * 0.25);
  }
  else if(screen.width<720){
    this.width = (screen.width * 0.80);
    this.height =(screen.width * 0.45)
  }
}

  bmrCalc(){
    if(this.dietPlanService.userCredentials.gender == 'male'){
      var weight1 = this.dietPlanService.userCredentials.weight;
      var height1 = (this.dietPlanService.userCredentials.feet *30.48) + (this.dietPlanService.userCredentials.inch * 2.54);
      var age = this.calculateAge(this.dietPlanService.userCredentials.dob);

      // console.log(age);
      this.bmr = (10 *weight1) + (6.25 * height1) - (5*age) + 5;
    }
  }

   calculateAge(birthday) { // birthday is a date
    const moonLanding = new Date(birthday);
    var ageDifMs = Date.now() -  moonLanding.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
