import { Component, OnInit } from '@angular/core';
import {DietPlanService} from '../diet-plan.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-published-recipes',
  templateUrl: './published-recipes.component.html',
  styleUrls: ['./published-recipes.component.css']
})
export class PublishedRecipesComponent implements OnInit {
  plans: any;
  prev = null;
  bol = false;
  editPlanName;
  username ;
  savedPublishPlanMessages=[];
  planSelectedButton = 'yourDietPlans'

  constructor( private dietPlanService : DietPlanService,
               private http: HttpClient,
               private httpService:HttpService) { }

  ngOnInit(): void {

this.plans = this.dietPlanService.publishedPlans;
for(var i =0;i<this.plans.length;i++){
  this.savedPublishPlanMessages[i]=false;
}
this.username = this.dietPlanService.userCredentials.username;

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

  addPlan(index) {
    var date = Date().toString().slice(0,24);
      var nameTags = this.plans[index].nameTags;
      var totals = this.plans[index].totals;
      var plan = this.plans[index].plan;

    this.httpService.onSendPlans([plan,{nameTag:nameTags.nameTag,date:date,editMode:0,editPlanName:0,recipe:"",publish:0},totals,{username:this.dietPlanService.userCredentials.username,tot:this.dietPlanService.plansIds.length}]).subscribe(
      (response) => {
this.savedPublishPlanMessages[index]=true;
        this.dietPlanService.plansIds.push(response.id);

        this.dietPlanService.savedPlansArray.push(plan);
        this.dietPlanService.savedPlansTotals.push(totals);
        this.dietPlanService.savedPlansNametags.push({nameTag:nameTags.nameTag,date:date,editMode:0,editPlanName:0,recipe:"",publish:0});
  },
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

  sendUpvote(id,index){
    this.httpService.onSendUpvote({username:this.username,id:id}).subscribe(
      (responce)=>{
       if(responce.success == true){
         this.dietPlanService.publishedPlans[index].upvotes = responce.upvotes;
         this.dietPlanService.publishedPlans[index].upvoteCheck = true;
       }
      },
      (error)=>{console.log(error)}
    );
  }

}

