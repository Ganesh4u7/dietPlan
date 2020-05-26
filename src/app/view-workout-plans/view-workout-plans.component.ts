import { Component, OnInit } from '@angular/core';
import {DietPlanService} from '../diet-plan.service';
import {HttpService} from '../http.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-view-workout-plans',
  templateUrl: './view-workout-plans.component.html',
  styleUrls: ['./view-workout-plans.component.css']
})
export class ViewWorkoutPlansComponent implements OnInit {
  personWeight;
  savedWorkoutPlansArray :any ;
  savedWorkoutPlansTotals: any ;
  savedWorkoutPlansNametags: any ;
  prev1 = null;
  bol1 = false;
  editPlanName;

  constructor( private dietPlanService : DietPlanService,
               private http: HttpClient,
               private httpService:HttpService) { }

  ngOnInit(): void {
    this.savedWorkoutPlansArray = this.dietPlanService.savedWorkoutPlansArray;
    this.savedWorkoutPlansNametags =this.dietPlanService.savedWorkoutPlansNametags;
    this.savedWorkoutPlansTotals = this.dietPlanService.savedWorkoutPlansTotals;
    this.personWeight = this.dietPlanService.userCredentials.weight;

  }

  showPlan1(i){
    if(this.prev1 == null)
    {

      document.getElementsByClassName('content1')[i]['style'].display = 'block';

      this.prev1=i;
      this.bol1 = true;

    }
    else if(this.prev1 != null && this.prev1 == i && this.bol1==true){

      document.getElementsByClassName('content1')[i]['style'].display = 'none';
      this.bol1 = false;

    }
    else if(this.prev1 != null && this.prev1 == i && this.bol1==false){

      document.getElementsByClassName('content1')[i]['style'].display = 'block';
      this.bol1 = true;

    }
    else if(this.prev1 != null && this.prev1 != i ){

      document.getElementsByClassName('content1')[i]['style'].display = 'block';
      document.getElementsByClassName('content1')[this.prev1]['style'].display = 'none';
      this.bol1 = true;
      this.prev1 = i;

    }

  }

  saveRecipe1(index,recipe){

  }
  deletePlan1(index) {
    var username = this.dietPlanService.userCredentials.username;
    var plansId = this.dietPlanService.savedWorkoutPlansArray[index][0]._id;
    var totalsId = this.dietPlanService.savedWorkoutPlansTotals[index]._id;
    var tagsId = this.dietPlanService.savedWorkoutPlansNametags[index]._id;
    var id = this.dietPlanService.workoutPlansIds[index];


    this.httpService.onDeleteWorkoutPlan({username:username,index:index,id:id}).subscribe(
      (response) => {},
      (error) => console.log(error)
    );
    this.savedWorkoutPlansNametags.splice(index, 1);
    this.savedWorkoutPlansTotals.splice(index, 1);
    this.savedWorkoutPlansArray.splice(index, 1);
    this.dietPlanService.plansIds.splice(index,1);

  }
  editName1(val,index){
    this.savedWorkoutPlansNametags[index].editPlanName =val;
    this.bol1 =false;


  }
  saveName1(index,changedName){
    var username = this.dietPlanService.userCredentials.username;
    this.savedWorkoutPlansNametags[index].nameTag= changedName;
    this.savedWorkoutPlansNametags[index].editPlanName= 0;
    this.bol1 = false;


    var id = this.dietPlanService.workoutPlansIds[index];


    this.httpService.onEditWorkoutName({_id: id, nameTag:changedName,index:index,username: username}).subscribe(
      (response) => {},
      (error) => console.log(error)
    );

  }
}

