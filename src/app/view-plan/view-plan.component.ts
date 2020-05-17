import { Component, OnInit } from '@angular/core';
import {DietPlanService} from '../diet-plan.service';
import {HttpService} from '../http.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.css']
})
export class ViewPlanComponent implements OnInit {
  savedPlansArray :any ;
  savedPlansTotals: any ;
  savedPlansNametags: any ;
  prev = null;
  bol = false;
  editPlanName;
  planSelectedButton = 'yourDietPlans'

  constructor( private dietPlanService : DietPlanService,
               private http: HttpClient,
               private httpService:HttpService) { }

  ngOnInit(): void {
    this.savedPlansArray = this.dietPlanService.savedPlansArray;
    this.savedPlansNametags =this.dietPlanService.savedPlansNametags;
    this.savedPlansTotals = this.dietPlanService.savedPlansTotals;
    let len =this.savedPlansTotals.length;


  }

  showPlan(i){
    if(this.prev == null)
    {

      document.getElementsByClassName('content')[i]['style'].display = 'block';

      this.prev=i;
      this.bol = true;

    }
    else if(this.prev != null && this.prev == i && this.bol==true){

      document.getElementsByClassName('content')[i]['style'].display = 'none';
      this.bol = false;

    }
    else if(this.prev != null && this.prev == i && this.bol==false){

      document.getElementsByClassName('content')[i]['style'].display = 'block';
      this.bol = true;

    }
    else if(this.prev != null && this.prev != i ){

      document.getElementsByClassName('content')[i]['style'].display = 'block';
      document.getElementsByClassName('content')[this.prev]['style'].display = 'none';
      this.bol = true;
      this.prev = i;

    }

  }

  saveRecipe(index,recipe){
    var recipe1 = recipe.replace("\r\n", "<br />\r\n");
    this.savedPlansNametags[index].recipe = recipe1;
    this.savedPlansNametags[index].editMode =1;
    let username = this.dietPlanService.userCredentials.username;
    let id = this.dietPlanService.plansIds[index];
    console.log(recipe1);
    this.httpService.onSaveRecipeName({username:username,index:index,id :id,recipe:recipe1}).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
  deletePlan(index) {
    let username = this.dietPlanService.userCredentials.username;
    let plansId = this.dietPlanService.savedPlansArray[index][0]._id;
    let totalsId = this.dietPlanService.savedPlansTotals[index]._id;
    let tagsId = this.dietPlanService.savedPlansNametags[index]._id;
    let id = this.dietPlanService.plansIds[index];


    this.httpService.onDeletePlan({username:username,index:index,id:id}).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.savedPlansNametags.splice(index, 1);
    this.savedPlansTotals.splice(index, 1);
    this.savedPlansArray.splice(index, 1);
    this.dietPlanService.plansIds.splice(index,1);
    this.prev =null;

  }
  editName(val,index){
      this.savedPlansNametags[index].editPlanName =val;
      this.bol =false;


    }
    saveName(index,changedName){
     let username = this.dietPlanService.userCredentials.username;
    this.savedPlansNametags[index].nameTag= changedName;
    this.savedPlansNametags[index].editPlanName= 0;
    this.bol = false;

   // console.log(this.dietPlanService.plansIds[index]);
    let id = this.dietPlanService.plansIds[index];

    console.log(id,changedName,index);

      this.httpService.onEditName({_id: id, nameTag:changedName,index:index,username: username}).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );

  }

  hide(val){
    if(val == 0){

      document.getElementById('plan1').style.display ='block';
      document.getElementById('plan11').style.display ='block';
      document.getElementById('plan2').style.display ='none';
      this.planSelectedButton = 'yourDietPlans'
    }
    else if(val =1){
      document.getElementById('plan11').style.display ='none';
      document.getElementById('plan1').style.display ='none';
      document.getElementById('plan2').style.display ='block';
      this.planSelectedButton = 'yourWorkoutPlans';
    }
  }
  changePlanName(i){
    this.showPlan(i);
  }

  publishPlan(i){
    var r = confirm('are you sure you want to Publish this Plan ?');
    if (r == true) {
      let name = this.dietPlanService.userCredentials.username;
      let date = Date().toString().slice(0,24);
      let nameTags = this.savedPlansNametags[i];
      nameTags.date = date;
      let totals = this.savedPlansTotals[i];
      let plan = this.savedPlansArray[i];
     this.httpService.onPublishRecipe({creatorName:name,nameTags:nameTags,totals:totals,plan:plan,username:this.dietPlanService.userCredentials.username,index:i ,id:this.savedPlansNametags[i]._id}).subscribe(
       (response)=>{console.log(response)
        if(response.success == true){
         this.dietPlanService.savedPlansNametags[i].publish = true;
        }
       },
       (error)=>{console.log(error)}
     );
    }
  }
}
