import { Component, OnInit, OnDestroy } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DietPlanService} from '../diet-plan.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {


  // Custom Menu Bar Variables
  menuButtonSelected = new Subject<string>()
  currentSelectedbutton : string = 'vegetables';
  planSelectedButton: string = 'createDietPlan';
  menuButtonSubscription: Subscription;
  publishPlanTextArea = false;

  searchText;
  selectedItemType :any = [];
  selectedItemType1 :any = [];
  lastSelectedItemName:string ='vegetables';
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];
  vegetables;
  fruits;
  nuts;
  seeds;
  liquids;
  others;



  done : any = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',
    // 'Walk dog'
  ];
  total: any = {
    kcal:0,protein:0,carbs:0,fat:0,sfat:0,DFib:0,sugar:0,sodium:0,weight:0

  };
  clickedFruites:any = [];
  clickedVegetables: any = [];
  constructor( private dietPlanService: DietPlanService,

               private http: HttpClient,
               private httpService: HttpService) { }

  ngOnInit() {
   // this.vegetables = this.dietPlanService.vegetables;

    this.vegetables = this.dietPlanService.vegetables;
    this.selectedItemType = this.vegetables;
    this.selectedItemType1 = this.selectedItemType;
    this.fruits = this.dietPlanService.fruits;
    this.nuts = this.dietPlanService.nuts;
    this.seeds = this.dietPlanService.seeds;
    this.liquids = this.dietPlanService.liquids;
    this.others = this.dietPlanService.others;

    // Subcribing for menu button updates
    this.menuButtonSubscription = this.menuButtonSelected.subscribe(
      (selectedButton: string) =>{
        this.currentSelectedbutton = selectedButton
      }
    )
  }
  ngOnDestroy(){
    this.menuButtonSubscription.unsubscribe()
  }

  onSearch(search){
    var PATTERN = search,
      filtered = this.selectedItemType.filter( (str)=> {
       if( str.name.toLowerCase().includes(PATTERN) ){
         return str;
       }

      });
    this.selectedItemType1 = filtered;



  }


  drop(event: CdkDragDrop<string[]>,arrayName: string) {

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(arrayName == 'todo') {
        if (this.done[event.previousIndex].itemType == 'vegetables') {
          this.done[event.previousIndex].click = 0;
        //  this.vegetables.push(this.done[event.previousIndex]);
          //this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
        else if (this.done[event.previousIndex].itemType == 'fruits') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
        else if (this.done[event.previousIndex].itemType == 'seeds') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
        else if (this.done[event.previousIndex].itemType == 'liquids') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
        else if (this.done[event.previousIndex].itemType == 'nuts') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
        else if (this.done[event.previousIndex].itemType == 'others') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }

      }
      else if(arrayName == 'done'){

             if(this.searchText == undefined) {
               this.selectedItemType[event.previousIndex].click =1;
               transferArrayItem(event.previousContainer.data,
                 event.container.data,
                 event.previousIndex,
                 event.currentIndex)

             }
             else if(this.searchText != undefined){
               for( let j =0 ; j<this.selectedItemType.length; j++){
                  if(this.selectedItemType[j].name == this.selectedItemType1[event.previousIndex].name){
                    this.selectedItemType[j].click =1;
                    this.selectedItemType.splice(j,1);
                     this.searchText = undefined;
                  }
               }
               transferArrayItem(this.selectedItemType1,
                 event.container.data,
                 event.previousIndex,
                 event.currentIndex)

             }

      }
      let str = this.vegetables[event.previousIndex];

      // this.done.splice(event.currentIndex,0,str);
      this.totalValues();
}
  }


  add(i,weight){
    let integer = parseInt(weight.value, 10);
    this.done[i].sWeight = integer;
    this.totalValues();

  }
  savePlan(tag){


    let date = Date().toString().slice(0,24);

    this.httpService.onSendPlans([this.done,{nameTag:tag.value,date:date,editMode:0,editPlanName:0,recipe:"",publish:0},this.total,{username:this.dietPlanService.userCredentials.username,tot:this.dietPlanService.plansIds.length}]).subscribe(
      (response) => {
      this.dietPlanService.plansIds.push(response.id);
        this.dietPlanService.savedPlansArray.push(this.done);
        this.dietPlanService.savedPlansTotals.push(this.total);
        this.dietPlanService.savedPlansNametags.push({nameTag:tag.value,date:date,editMode:0,editPlanName:0,recipe:"",publish:0});
        },
      (error) => console.log(error)
    );


 console.log(this.dietPlanService.savedPlansNametags);
 this.done= [];
    // this.httpService.onSendTotals(this.total).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );

 this.total={
   kcal:0,protein:0,carbs:0,fat:0,sfat:0,DFib:0,sugar:0,sodium:0,weight:0};
   this.dietPlanService.vegetables = this.dietPlanService.vegetables1;
   this.dietPlanService.fruits = this.dietPlanService.fruits1;
   this.dietPlanService.seeds = this.dietPlanService.seeds1;
   this.dietPlanService.nuts = this.dietPlanService.nuts1;
   this.dietPlanService.liquids = this.dietPlanService.liquids1;
   this.dietPlanService.others = this.dietPlanService.others1;
    this.vegetables = this.dietPlanService.vegetables;
    this.selectedItemType = this.vegetables;
    this.fruits = this.dietPlanService.fruits;
    this.nuts = this.dietPlanService.nuts;
    this.seeds = this.dietPlanService.seeds;
    this.liquids = this.dietPlanService.liquids;
    this.others = this.dietPlanService.others;
 this.selectedItemType = this.vegetables;

 // console.log(this.dietPlanService.vegetables);

  }

  totalValues(){
    this.total= {
      kcal:0,protein:0,carbs:0,fat:0,sfat:0,DFib:0,sugar:0,sodium:0,weight:0

    }
    for(let i=0;i<this.done.length;i++){
      this.total.kcal += this.done[i].kcal*this.done[i].sWeight;
      this.total.protein += this.done[i].protein*this.done[i].sWeight;
      this.total.carbs += this.done[i].carbs*this.done[i].sWeight;
      this.total.fat += this.done[i].fat*this.done[i].sWeight;
      this.total.sfat += this.done[i].sfat*this.done[i].sWeight;
      this.total.DFib += this.done[i].DFib*this.done[i].sWeight;
      this.total.sugar += this.done[i].sugar*this.done[i].sWeight;
      this.total.sodium += this.done[i].sodium*this.done[i].sWeight;
      this.total.weight += this.done[i].sWeight;
    }
    console.log(this.total);
  }

  changeItems(itemType){

    if(itemType =="vegetables"){
      this.selectedItemType=this.vegetables;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="fruits"){
      this.selectedItemType=this.fruits;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="seeds"){
      this.selectedItemType=this.seeds;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="nuts"){
      this.selectedItemType=this.nuts;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="liquids"){
      this.selectedItemType=this.liquids;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="others"){
      this.selectedItemType=this.others;
      this.lastSelectedItemName = itemType;
    }

  }

  clickLeft(index){
    if(this.lastSelectedItemName == 'vegetables'){
      if(this.vegetables[index].click == 0){
        this.vegetables[index].click = 1;
      }
      else{
        this.vegetables[index].click = 0;
      }
    }
    else if(this.lastSelectedItemName == 'fruites'){
      if(this.fruits[index].click == 0){
        this.fruits[index].click = 1;
      }
      else{
        this.fruits[index].click = 0;
      }
    }
    else if(this.lastSelectedItemName == 'nuts'){
      if(this.fruits[index].click == 0){
        this.fruits[index].click = 1;
      }
      else{
        this.fruits[index].click = 0;
      }
    }
    else if(this.lastSelectedItemName == 'liquids'){
      if(this.fruits[index].click == 0){
        this.fruits[index].click = 1;
      }
      else{
        this.fruits[index].click = 0;
      }
    }
    else if(this.lastSelectedItemName == 'seeds'){
      if(this.fruits[index].click == 0){
        this.fruits[index].click = 1;
      }
      else{
        this.fruits[index].click = 0;
      }
    }
    else if(this.lastSelectedItemName == 'others'){
      if(this.fruits[index].click == 0){
        this.fruits[index].click = 1;
      }
      else{
        this.fruits[index].click = 0;
      }
    }

  }
  getBackgroundColor(i){
    if(this.lastSelectedItemName == 'vegetables'){
      if(this.selectedItemType[i].click ==1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'fruits'){
      if(this.selectedItemType[i].click == 1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'nuts'){
      if(this.selectedItemType[i].click == 1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'seeds'){
      if(this.selectedItemType[i].click == 1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'liquids'){
      if(this.selectedItemType[i].click == 1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'others'){
      if(this.selectedItemType[i].click == 1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
  }
  getBackgroundColorRight(i){
    if(this.done[i].click == 0){
      return '#aeff60';
    }
    else{
      return 'white';
    }
  }

  clickRight(index){
    if(this.lastSelectedItemName == 'vegetables'){
      if(this.done[index].click == 1){
        this.done[index].click = 0;
      }
      else{
        this.done[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'fruits'){
      if(this.done[index].click==1){
        this.done[index].click = 0;
      }
      else{
        this.done[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'nuts'){
      if(this.done[index].click==1){
        this.done[index].click = 0;
      }
      else{
        this.done[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'seeds'){
      if(this.done[index].click==1){
        this.done[index].click = 0;
      }
      else{
        this.done[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'liquids'){
      if(this.done[index].click==1){
        this.done[index].click = 0;
      }
      else{
        this.done[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'others'){
      if(this.done[index].click==1){
        this.done[index].click = 0;
      }
      else{
        this.done[index].click = 1;
      }
    }
  }


  rightMove(){

    if(this.lastSelectedItemName == 'vegetables'){
      for(let i=this.vegetables.length-1 ;i>=0;i--){
        if(this.vegetables[i].click ==1){
          this.done.push(this.vegetables[i]);
          this.vegetables.splice(i,1);
          this.totalValues();

        }
      }
    }
    else if(this.lastSelectedItemName == 'fruites'){
      for(let i=this.fruits.length-1 ;i>=0;i--){
        if(this.fruits[i].click ==1){
          this.done.push(this.fruits[i]);
          this.fruits.splice(i,1);
          this.totalValues();

        }
      }
    }
    else if(this.lastSelectedItemName == 'nuts'){
      for(let i=this.fruits.length-1 ;i>=0;i--){
        if(this.fruits[i].click ==1){
          this.done.push(this.fruits[i]);
          this.fruits.splice(i,1);
          this.totalValues();

        }
      }
    }
    else if(this.lastSelectedItemName == 'seeds'){
      for(let i=this.fruits.length-1 ;i>=0;i--){
        if(this.fruits[i].click ==1){
          this.done.push(this.fruits[i]);
          this.fruits.splice(i,1);
          this.totalValues();

        }
      }
    }
    else if(this.lastSelectedItemName == 'liquids'){
      for(let i=this.fruits.length-1 ;i>=0;i--){
        if(this.fruits[i].click ==1){
          this.done.push(this.fruits[i]);
          this.fruits.splice(i,1);
          this.totalValues();

        }
      }
    }
    else if(this.lastSelectedItemName == 'others'){
      for(let i=this.fruits.length-1 ;i>=0;i--){
        if(this.fruits[i].click ==1){
          this.done.push(this.fruits[i]);
          this.fruits.splice(i,1);
          this.totalValues();

        }
      }
    }
  }
  leftMove(){

    for(let i =this.done.length-1 ;i>=0;i--){
      if(this.done[i].click == 0) {
        if (this.done[i].itemType == 'vegetables') {
          this.vegetables.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'fruites')
        {
          this.fruits.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'liquids')
        {
          this.fruits.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'nuts')
        {
          this.fruits.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'seeds')
        {
          this.fruits.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'others')
        {
          this.fruits.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }

      }
    }
  }

  hide(val){
    if(val == 0){
      this.planSelectedButton = 'createDietPlan';
      document.getElementById('diet1').style.display ='block';
      document.getElementById('main-container').style.display ='block';
      document.getElementById('hide').style.display ='none';
    }
    else if(val =1){
      this.planSelectedButton = 'createWorkoutPlan';
      document.getElementById('diet1').style.display ='none';
      document.getElementById('main-container').style.display ='none';
      document.getElementById('hide').style.display ='block';
    }
  }

  onMenuButtonSelect(buttonName: string){
    this.menuButtonSelected.next(buttonName);
    this.changeItems(this.currentSelectedbutton);

  }
  scrollRight(){
    document.getElementById("item-types-container").scrollBy (100,0);


  }
  scrollLeft(){
    document.getElementById("item-types-container").scrollBy (-100,0);
  }
  scrollRight1(index){
    document.getElementsByClassName("actual-items")[index].scrollBy (+200,0);
    this.clickLeft(index);
  }

  scrollLeft1(index){
    document.getElementsByClassName("actual-items")[index].scrollBy (-200,0);
    this.clickLeft(index);
  }

  publishPlan() {
    this.publishPlanTextArea = true;
  }


}
