import { Component, OnInit } from '@angular/core';
import {DietPlanService} from '../diet-plan.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
toggleItems = false;
  constructor( private dietPlanService: DietPlanService) { }

  ngOnInit(): void {
  }


  toggle(){
    if(this.toggleItems == false){
      this.toggleItems = true;
      console.log(this.toggleItems);
      document.getElementById('items').style.display = 'block';
    }
    else if(this.toggleItems == true){
      this.toggleItems = false;
      console.log(this.toggleItems);
      document.getElementById('items').style.display = 'none';
    }
  }
  toggleFalse(){
    this.toggleItems = false;
  }
  signout(){
   this.dietPlanService.userCredentials={};
    this.dietPlanService.savedPlansArray = [];
    this.dietPlanService.savedPlansTotals = [];
    this.dietPlanService.savedPlansNametags = [];


    this.dietPlanService.savedWorkoutPlansArray= [];
    this.dietPlanService.savedWorkoutPlansTotals= [];
    this.dietPlanService.savedWorkoutPlansNametags = [];
    this.dietPlanService.publishedPlans = [];
    this.dietPlanService.plansIds =[];
    this.dietPlanService.workoutPlansIds=[];
    this.dietPlanService.token = null;
  }
}
