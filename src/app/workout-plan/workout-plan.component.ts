import { Component, OnInit } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DietPlanService} from '../diet-plan.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css']
})
export class WorkoutPlanComponent implements OnInit {

  // Custom Menu Bar Variables
  menuButtonSelected = new Subject<string>()
  currentSelectedbutton : string = 'sports'
  menuButtonSubscription: Subscription;
  sports:any=[];
  strength:any = [];
  endurance:any = [];
  conditioning:any = [];
  flexibility:any=[];
  houseWorks:any=[];
  searchText = undefined;
  filtered;

  personWeight: any  = 0;
  selectedItemType1 :any = [];
  lastSelectedItemName:string ='sports';
  todo1 = [];


  done1 : any = [

  ];
  total: any = {
    calories:0,
    mins:0

  };
  clickedFruites:any = [];
  clickedVegetables: any = [];
  constructor( private dietPlanService: DietPlanService,
               private http: HttpClient,
               private httpService: HttpService) { }

  ngOnInit() {
    // this.vegetables = this.dietPlanService.vegetables;
    this.sports = this.dietPlanService.sports;
    this.selectedItemType1 = this.sports;
    this.strength = this.dietPlanService.strength;
    this.conditioning = this.dietPlanService.conditioning;
    this.flexibility = this.dietPlanService.flexibility;
    this.houseWorks = this.dietPlanService.houseWorks;
    this.endurance = this.dietPlanService.endurance;
    this.personWeight = this.dietPlanService.userCredentials.weight;

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
  onSearch(search) {
    var PATTERN = search.toLowerCase();
    if(this.searchText != undefined){
      if (this.lastSelectedItemName == 'sports') {

        this.filtered  = this.sports.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });

        this.selectedItemType1=this.filtered ;

      }
      else if (this.lastSelectedItemName == 'houseWorks') {

        this.filtered  = this.houseWorks.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });
        this.selectedItemType1=this.filtered ;

      }
      else if (this.lastSelectedItemName == 'endurance') {

        this.filtered  = this.endurance.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });
        this.selectedItemType1=this.filtered ;

      }
      else if (this.lastSelectedItemName == 'strength') {

        this.filtered  = this.strength.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });
        this.selectedItemType1=this.filtered ;

      }
      else if (this.lastSelectedItemName == 'conditioning') {

        this.filtered  = this.conditioning.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });
        this.selectedItemType1=this.filtered ;

      }
      else if (this.lastSelectedItemName == 'flexibility') {

        this.filtered  = this.flexibility.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });
        this.selectedItemType1=this.filtered ;

      }
    }
    this.selectedItemType1 = this.filtered ;



    if(this.searchText == undefined){
      if(this.lastSelectedItemName =="sports"){
        this.selectedItemType1=this.sports;
      }
      else if (this.lastSelectedItemName =="houseWorks"){
        this.selectedItemType1=this.houseWorks;

      }
      else if (this.lastSelectedItemName =="endurance"){
        this.selectedItemType1=this.endurance;
      }
      else if (this.lastSelectedItemName =="strength"){
        this.selectedItemType1=this.strength;
      }
      else if (this.lastSelectedItemName =="conditioning"){
        this.selectedItemType1=this.conditioning;
      }
      else if (this.lastSelectedItemName =="flexibility"){
        this.selectedItemType1=this.flexibility;
      }
    }


  }


  drop1(event: CdkDragDrop<string[]>,arrayName: string) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(arrayName == 'todo1') {
        if (this.done1[event.previousIndex].itemType == 'sports') {
          this.done1[event.previousIndex].click = 0;
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done1[event.previousIndex].itemType == 'strength') {
          this.done1[event.previousIndex].click =0;

          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done1[event.previousIndex].itemType == 'houseWorks') {
          this.done1[event.previousIndex].click =0;

          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done1[event.previousIndex].itemType == 'endurance') {
          this.done1[event.previousIndex].click =0;

          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done1[event.previousIndex].itemType == 'flexibility') {
          this.done1[event.previousIndex].click =0;

          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done1[event.previousIndex].itemType == 'conditioning') {
          this.done1[event.previousIndex].click =0;

          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
      }

      else if(arrayName == 'done1'){

        if(this.searchText == undefined) {
          this.selectedItemType1[event.previousIndex].click =1;
          this.done1.splice(event.currentIndex,0,this.selectedItemType1[event.previousIndex]);
          this.selectedItemType1.splice(event.previousIndex,1);
          this.totalValues();
        }
        else if(this.searchText != undefined){


          var index = this.selectedItemType1[event.previousIndex].index;

          if(this.lastSelectedItemName == 'sports'){
            for(var i =0;i<=this.sports.length;i++){
              if(index == this.sports[i].index){
                this.sports[i].click =1;
                this.done1.splice(event.currentIndex,0,this.sports[i]);
                this.sports.splice(i,1);
                this.selectedItemType1.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'houseWorks'){
            for(var i =0;i<=this.houseWorks.length;i++){
              if(index == this.houseWorks[i].index){
                this.houseWorks[i].click =1;
                this.done1.splice(event.currentIndex,0,this.houseWorks[i]);
                this.houseWorks.splice(i,1);
                this.selectedItemType1.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'endurance'){
            for(var i =0;i<=this.endurance.length;i++){
              if(index == this.endurance[i].index){
                this.endurance[i].click =1;
                this.done1.splice(event.currentIndex,0,this.endurance[i]);
                this.endurance.splice(i,1);
                this.selectedItemType1.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'strength'){
            for(var i =0;i<=this.strength.length;i++){
              if(index == this.strength[i].index){
                this.strength[i].click =1;
                this.done1.splice(event.currentIndex,0,this.strength[i]);
                this.strength.splice(i,1);
                this.selectedItemType1.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'conditioning'){
            for(var i =0;i<=this.conditioning.length;i++){
              if(index == this.conditioning[i].index){
                this.conditioning[i].click =1;
                this.done1.splice(event.currentIndex,0,this.conditioning[i]);
                this.conditioning.splice(i,1);
                this.selectedItemType1.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'flexibility'){
            for(var i =0;i<=this.flexibility.length;i++){
              if(index == this.flexibility[i].index){
                this.flexibility[i].click =1;
                this.done1.splice(event.currentIndex,0,this.flexibility[i]);
                this.flexibility.splice(i,1);
                this.selectedItemType1.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
        }

      }

      // this.done.splice(event.currentIndex,0,str);
      this.totalValues();
    }
  }


  add(i,weight){
    var integer = parseInt(weight.value, 10);
    this.done1[i].mins = integer;
    this.totalValues();
    this.clickRight1(i);

  }
  saveWorkoutPlan(tag){

   this.dietPlanService.savedWorkoutPlansArray.push(this.done1);
    this.dietPlanService.savedWorkoutPlansTotals.push(this.total);
    var date = Date().toString().slice(0,24);

    this.httpService.onSendWorkoutPlans([this.done1,{nameTag:tag.value,date:date,editMode:0,editPlanName:0,recipe:""},this.total,{username:this.dietPlanService.userCredentials.username,tot:this.dietPlanService.plansIds.length}]).subscribe(
      (response) => {
        this.dietPlanService.workoutPlansIds.push(response.id)},
      (error) => console.log(error)
    );
    this.dietPlanService.savedWorkoutPlansNametags.push({nameTag:tag.value,date:date,editMode:0,editPlanName:0,recipe:""});
    this.done1= [];
    // this.httpService.onSendTotals(this.total).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );

    this.total={calories:0,
      mins:0};
    this.dietPlanService.sports = this.dietPlanService.sports1;
    this.dietPlanService.strength = this.dietPlanService.strength1;
    this.dietPlanService.conditioning = this.dietPlanService.conditioning1
    this.dietPlanService.flexibility = this.dietPlanService.flexibility1;
    this.dietPlanService.houseWorks = this.dietPlanService.houseWorks1;
    this.dietPlanService.endurance = this.dietPlanService.endurance1;
    this.sports = this.dietPlanService.sports1;
    this.selectedItemType1 = this.sports;
    this.strength = this.dietPlanService.strength1;
    this.conditioning = this.dietPlanService.conditioning1
    this.flexibility = this.dietPlanService.flexibility1;
    this.houseWorks = this.dietPlanService.houseWorks1;
    this.endurance = this.dietPlanService.endurance1;
    this.selectedItemType1 = this.sports;

    // console.log(this.dietPlanService.vegetables);

  }

  totalValues(){
    this.total= {
      calories:0,mins:0

    }
    for(var i=0;i<this.done1.length;i++){
      this.total.calories += (this.done1[i].met*3.5*this.personWeight/200)*this.done1[i].mins;
      this.total.mins += this.done1[i].mins

    }
  }

  changeItems(itemType){

    if(itemType =="sports"){
      this.selectedItemType1=this.sports;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="endurance"){
       this.selectedItemType1=this.endurance;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="houseWorks"){
       this.selectedItemType1=this.houseWorks;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="strength"){
       this.selectedItemType1=this.strength;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="flexibility"){
       this.selectedItemType1=this.flexibility;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="conditioning"){
      this.selectedItemType1=this.conditioning;
      this.lastSelectedItemName = itemType;
    }

  }

  clickLeft1(index){
    if(this.lastSelectedItemName == 'sports'){
      if(this.searchText == undefined) {
        if (this.sports[index].click == 0) {
          this.sports[index].click = 1;
        }
        else {
          this.sports[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        // for(var i =0;i<this.vegetables.length;i++){
        //   if(this.selectedItemType[index].index == this.vegetables[i].index){
        if(this.selectedItemType1[index].click ==0){
          this.selectedItemType1[index].click = 1;
        }
        else {
          this.selectedItemType1[index].click = 0;
        }
        //   }
        // }

      }
    }
    else if(this.lastSelectedItemName == 'houseWorks'){
      if(this.searchText == undefined) {
        if (this.houseWorks[index].click == 0) {
          this.houseWorks[index].click = 1;
        }
        else {
          this.houseWorks[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType1[index].click ==0){
          this.selectedItemType1[index].click = 1;
        }
        else {
          this.selectedItemType1[index].click = 0;
        }
      }
    }
    else if(this.lastSelectedItemName == 'endurance'){
      if(this.searchText == undefined) {
        if (this.endurance[index].click == 0) {
          this.endurance[index].click = 1;
        }
        else {
          this.endurance[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType1[index].click ==0){
          this.selectedItemType1[index].click = 1;
        }
        else {
          this.selectedItemType1[index].click = 0;
        }
      }
    }
    else if(this.lastSelectedItemName == 'strength'){
      if(this.searchText == undefined) {
        if (this.strength[index].click == 0) {
          this.strength[index].click = 1;
        }
        else {
          this.strength[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType1[index].click ==0){
          this.selectedItemType1[index].click = 1;
        }
        else {
          this.selectedItemType1[index].click = 0;
        }
      }
    }
    else if(this.lastSelectedItemName == 'conditioning'){
      if(this.searchText == undefined) {
        if (this.conditioning[index].click == 0) {
          this.conditioning[index].click = 1;
        }
        else {
          this.conditioning[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType1[index].click ==0){
          this.selectedItemType1[index].click = 1;
        }
        else {
          this.selectedItemType1[index].click = 0;
        }
      }
    }

    else if(this.lastSelectedItemName == 'flexibility'){
      if(this.searchText == undefined) {
        if (this.flexibility[index].click == 0) {
          this.flexibility[index].click = 1;
        }
        else {
          this.flexibility[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType1[index].click ==0){
          this.selectedItemType1[index].click = 1;
        }
        else {
          this.selectedItemType1[index].click = 0;
        }
      }
    }

  }
  getBackgroundColor1(i){
    if(this.lastSelectedItemName == 'sports'){
      if(this.selectedItemType1[i].click ==1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'endurance'){
      if(this.selectedItemType1[i].click ==1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'houseWorks'){
      if(this.selectedItemType1[i].click ==1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'strength'){
      if(this.selectedItemType1[i].click ==1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'conditioning'){
      if(this.selectedItemType1[i].click ==1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
    else if(this.lastSelectedItemName == 'flexibility'){
      if(this.selectedItemType1[i].click ==1){
        return '#aeff60';
      }
      else {
        return 'white';
      }
    }
  }
  getBackgroundColorRight1(i){
    if(this.done1[i].click == 0){
      return '#aeff60';
    }
    else{
      return 'white';
    }
  }

  clickRight1(index){
    if(this.lastSelectedItemName == 'sports'){
      if(this.done1[index].click == 1){
        this.done1[index].click = 0;
      }
      else{
        this.done1[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'endurance'){
      if(this.done1[index].click==1){
        this.done1[index].click = 0;
      }
      else{
        this.done1[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'strength'){
      if(this.done1[index].click==1){
        this.done1[index].click = 0;
      }
      else{
        this.done1[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'houseWorks'){
      if(this.done1[index].click==1){
        this.done1[index].click = 0;
      }
      else{
        this.done1[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'conditioning'){
      if(this.done1[index].click==1){
        this.done1[index].click = 0;
      }
      else{
        this.done1[index].click = 1;
      }
    }
    else if(this.lastSelectedItemName == 'flexibility'){
      if(this.done1[index].click==1){
        this.done1[index].click = 0;
      }
      else{
        this.done1[index].click = 1;
      }
    }
  }


  rightMove1(){

    if(this.lastSelectedItemName == 'sports'){
      for(var i=this.sports.length-1 ;i>=0;i--){
        if(this.sports[i].click ==1){
          this.done1.push(this.sports[i]);
          this.sports.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType1 =this.sports;
      this.searchText = undefined;
    }
    else if(this.lastSelectedItemName == 'endurance'){
      for(var i=this.endurance.length-1 ;i>=0;i--){
        if(this.endurance[i].click ==1){
          this.done1.push(this.endurance[i]);
          this.endurance.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType1 =this.endurance;
      this.searchText = undefined;
    }
    else if(this.lastSelectedItemName == 'houseWorks'){
      for(var i=this.houseWorks.length-1 ;i>=0;i--){
        if(this.houseWorks[i].click ==1){
          this.done1.push(this.houseWorks[i]);
          this.houseWorks.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType1 =this.houseWorks;
      this.searchText = undefined;
    }
    else if(this.lastSelectedItemName == 'conditioning'){
      for(var i=this.conditioning.length-1 ;i>=0;i--){
        if(this.conditioning[i].click ==1){
          this.done1.push(this.conditioning[i]);
          this.conditioning.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType1 =this.conditioning;
      this.searchText = undefined;
    }
    else if(this.lastSelectedItemName == 'strength'){
      for(var i=this.strength.length-1 ;i>=0;i--){
        if(this.strength[i].click ==1){
          this.done1.push(this.strength[i]);
          this.strength.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType1 =this.strength;
      this.searchText = undefined;
    }
    else if(this.lastSelectedItemName == 'flexibility'){
      for(var i=this.flexibility.length-1 ;i>=0;i--){
        if(this.flexibility[i].click ==1){
          this.done1.push(this.flexibility[i]);
          this.flexibility.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType1 =this.flexibility;
      this.searchText = undefined;
    }
  }
  leftMove1(){

    for(var i =this.done1.length-1 ;i>=0;i--){
      if(this.done1[i].click == 0) {
        if (this.done1[i].itemType == 'sports') {
          this.sports.push(this.done1[i]);
          this.done1.splice(i,1);
          this.totalValues();
        }
        else if(this.done1[i].itemType == 'endurance')
        {
          this.endurance.push(this.done1[i]);
          this.done1.splice(i,1);
          this.totalValues();
        }
        else if(this.done1[i].itemType == 'houseWorks')
        {
          this.houseWorks.push(this.done1[i]);
          this.done1.splice(i,1);
          this.totalValues();
        }
        else if(this.done1[i].itemType == 'strength')
        {
          this.strength.push(this.done1[i]);
          this.done1.splice(i,1);
          this.totalValues();
        }
        else if(this.done1[i].itemType == 'conditioning')
        {
          this.conditioning.push(this.done1[i]);
          this.done1.splice(i,1);
          this.totalValues();
        }
        else if(this.done1[i].itemType == 'flexibility')
        {
          this.flexibility.push(this.done1[i]);
          this.done1.splice(i,1);
          this.totalValues();
        }

      }
    }
  }
  onMenuButtonSelect(buttonName: string){
    this.menuButtonSelected.next(buttonName);
    this.searchText= undefined;
    this.changeItems(this.currentSelectedbutton);

  }
  scrollRight1(){
    document.getElementById("item-types-container1").scrollBy (100,0);


  }
  scrollLeft1(){
    document.getElementById("item-types-container1").scrollBy (-100,0);
  }

  // scrollRight1(index){
  //   document.getElementsByClassName("actual-items")[index].scrollBy (+1000,0);
  //   this.clickLeft1(index);
  // }
  //
  // scrollLeft1(index){
  //   document.getElementsByClassName("actual-items")[index].scrollBy (-1000,0);
  //   this.clickLeft1(index);
  // }

  publishPlan() {
   // this.publishPlanTextArea = true;
  }

  moveToChoosen(index){
    if(this.lastSelectedItemName == 'sports'){
      if(this.searchText == undefined){
        this.sports[index].click=1;
        this.done1.push(this.sports[index]);
        this.sports.splice(index,1);
        this.selectedItemType1.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType1[index].index;
        for(var i =0;i<=this.sports.length;i++){
          if(index1 == this.sports[i].index){
            this.sports[i].click =1;
            this.done1.push(this.sports[i]);
            this.sports.splice(i,1);
            this.selectedItemType1.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'houseWorks'){
      if(this.searchText == undefined){
        this.houseWorks[index].click=1;
        this.done1.push(this.houseWorks[index]);
        this.houseWorks.splice(index,1);
        this.selectedItemType1.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType1[index].index;
        for(var i =0;i<=this.houseWorks.length;i++){
          if(index1 == this.houseWorks[i].index){
            this.houseWorks[i].click =1;
            this.done1.push(this.houseWorks[i]);
            this.houseWorks.splice(i,1);
            this.selectedItemType1.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'endurance'){
      if(this.searchText == undefined){
        this.endurance[index].click=1;
        this.done1.push(this.endurance[index]);
        this.endurance.splice(index,1);
        this.selectedItemType1.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType1[index].index;
        for(var i =0;i<=this.endurance.length;i++){
          if(index1 == this.endurance[i].index){
            this.endurance[i].click =1;
            this.done1.push(this.endurance[i]);
            this.endurance.splice(i,1);
            this.selectedItemType1.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'strength'){
      if(this.searchText == undefined){
        this.strength[index].click=1;
        this.done1.push(this.strength[index]);
        this.strength.splice(index,1);
        this.selectedItemType1.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType1[index].index;
        for(var i =0;i<=this.strength.length;i++){
          if(index1 == this.strength[i].index){
            this.strength[i].click =1;
            this.done1.push(this.strength[i]);
            this.strength.splice(i,1);
            this.selectedItemType1.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'flexibility'){
      if(this.searchText == undefined){
        this.flexibility[index].click=1;
        this.done1.push(this.flexibility[index]);
        this.flexibility.splice(index,1);
        this.selectedItemType1.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType1[index].index;
        for(var i =0;i<=this.flexibility.length;i++){
          if(index1 == this.flexibility[i].index){
            this.flexibility[i].click =1;
            this.done1.push(this.flexibility[i]);
            this.flexibility.splice(i,1);
            this.selectedItemType1.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'conditioning'){
      if(this.searchText == undefined){
        this.conditioning[index].click=1;
        this.done1.push(this.conditioning[index]);
        this.conditioning.splice(index,1);
        this.selectedItemType1.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType1[index].index;
        for(var i =0;i<=this.conditioning.length;i++){
          if(index1 == this.conditioning[i].index){
            this.conditioning[i].click =1;
            this.done1.push(this.conditioning[i]);
            this.conditioning.splice(i,1);
            this.selectedItemType1.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
  }
  moveToItemslist(index){
    if (this.done1[index].itemType == 'sports') {
      this.done1[index].click=0;
      this.sports.push(this.done1[index]);
      this.done1.splice(index,1);
      this.totalValues();
    }
    else if(this.done1[index].itemType == 'houseWorks')
    {
      this.done1[index].click=0;
      this.houseWorks.push(this.done1[index]);
      this.done1.splice(index,1);
      this.totalValues();
    }
    else if(this.done1[index].itemType == 'endurance')
    {
      this.done1[index].click=0;
      this.endurance.push(this.done1[index]);
      this.done1.splice(index,1);
      this.totalValues();
    }
    else if(this.done1[index].itemType == 'strength')
    {
      this.done1[index].click=0;
      this.strength.push(this.done1[index]);
      this.done1.splice(index,1);
      this.totalValues();
    }
    else if(this.done1[index].itemType == 'flexibility')
    {
      this.done1[index].click=0;
      this.flexibility.push(this.done1[index]);
      this.done1.splice(index,1);
      this.totalValues();
    }
    else if(this.done1[index].itemType == 'conditioning')
    {
      this.done1[index].click=0;
      this.conditioning.push(this.done1[index]);
      this.done1.splice(index,1);
      this.totalValues();
    }

  }

}
