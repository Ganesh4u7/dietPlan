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
  lastIndex = 10;
  scrollvalue =false;

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
  filtered;



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
    this.selectedItemType = this.vegetables.slice(0,10);
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

  onSearch(search) {
    var PATTERN = search.toLowerCase();
    if(this.searchText != undefined){
      if (this.lastSelectedItemName == 'vegetables') {

        this.filtered = this.vegetables.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });

        this.selectedItemType=this.filtered;

      }
      else if (this.lastSelectedItemName == 'fruits') {

        this.filtered = this.fruits.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;

          }
        });
        this.selectedItemType=this.filtered;

      }
      else if (this.lastSelectedItemName == 'liquids') {

        this.filtered = this.liquids.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });
        this.selectedItemType=this.filtered;

      }
      else if (this.lastSelectedItemName == 'nuts') {

        this.filtered = this.nuts.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });
        this.selectedItemType=this.filtered;

      }
      else if (this.lastSelectedItemName == 'seeds') {

        this.filtered = this.seeds.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });
        this.selectedItemType=this.filtered;

      }
      else if (this.lastSelectedItemName == 'others') {

        this.filtered = this.others.filter((str) => {
          if (str.name.toLowerCase().includes(PATTERN)) {
            return str;
          }
        });
        this.selectedItemType=this.filtered;
      }
    }
    this.selectedItemType1 = this.filtered;



    if(this.searchText == undefined){
      if(this.lastSelectedItemName =="vegetables"){
        this.selectedItemType=this.vegetables;
      }
      else if (this.lastSelectedItemName =="fruits"){
        this.selectedItemType=this.fruits;

      }
      else if (this.lastSelectedItemName =="seeds"){
        this.selectedItemType=this.seeds;
      }
      else if (this.lastSelectedItemName =="nuts"){
        this.selectedItemType=this.nuts;
      }
      else if (this.lastSelectedItemName =="liquids"){
        this.selectedItemType=this.liquids;
      }
      else if (this.lastSelectedItemName =="others"){
        this.selectedItemType=this.others;
      }
    }


  }


  drop(event: CdkDragDrop<string[]>,arrayName: string) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else{
      if(arrayName == 'todo') {
        if (this.done[event.previousIndex].itemType == 'vegetables') {
          this.done[event.previousIndex].click = 0;
          //  this.vegetables.push(this.done[event.previousIndex]);
          //this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done[event.previousIndex].itemType == 'fruits') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done[event.previousIndex].itemType == 'seeds') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done[event.previousIndex].itemType == 'liquids') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done[event.previousIndex].itemType == 'nuts') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }
        else if (this.done[event.previousIndex].itemType == 'others') {
          this.done[event.previousIndex].click =0;
          // this.fruites.push(this.done[event.previousIndex]);
          // this.done.splice(event.previousIndex, 1);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
          this.totalValues();
        }

      }
      else if(arrayName == 'done'){

        if(this.searchText == undefined) {
          this.selectedItemType[event.previousIndex].click =1;
          this.done.splice(event.currentIndex,0,this.selectedItemType[event.previousIndex]);
          this.selectedItemType.splice(event.previousIndex,1);
          this.totalValues();

        }
        else if(this.searchText != undefined){


          var index = this.selectedItemType[event.previousIndex].index;

          if(this.lastSelectedItemName == 'vegetables'){
            for(var i =0;i<=this.vegetables.length;i++){
              if(index == this.vegetables[i].index){
                this.vegetables[i].click =1;
                this.done.splice(event.currentIndex,0,this.vegetables[i]);
                this.vegetables.splice(i,1);
                this.selectedItemType.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'fruits'){
            for(var i =0;i<=this.fruits.length;i++){
              if(index == this.fruits[i].index){
                this.fruits[i].click =1;
                this.done.splice(event.currentIndex,0,this.fruits[i]);
                this.fruits.splice(i,1);
                this.selectedItemType.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'liquids'){
            for(var i =0;i<=this.liquids.length;i++){
              if(index == this.liquids[i].index){
                this.liquids[i].click =1;
                this.done.splice(event.currentIndex,0,this.liquids[i]);
                this.liquids.splice(i,1);
                this.selectedItemType.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'nuts'){
            for(var i =0;i<=this.nuts.length;i++){
              if(index == this.nuts[i].index){
                this.nuts[i].click =1;
                this.done.splice(event.currentIndex,0,this.nuts[i]);
                this.nuts.splice(i,1);
                this.selectedItemType.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'seeds'){
            for(var i =0;i<=this.seeds.length;i++){
              if(index == this.seeds[i].index){
                this.seeds[i].click =1;
                this.done.splice(event.currentIndex,0,this.seeds[i]);
                this.seeds.splice(i,1);
                this.selectedItemType.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
          else if(this.lastSelectedItemName == 'others'){
            for(var i =0;i<=this.others.length;i++){
              if(index == this.others[i].index){
                this.others[i].click =1;
                this.done.splice(event.currentIndex,0,this.others[i]);
                this.others.splice(i,1);
                this.selectedItemType.splice(event.previousIndex,1);
                this.totalValues();
                break;
              }
            }
          }
        }

      }
      var str = this.vegetables[event.previousIndex];

      // this.done.splice(event.currentIndex,0,str);
      this.totalValues();
    }
  }


  add(i,weight){
    var integer = parseInt(weight.value, 10);
    this.done[i].sWeight = integer;
    this.totalValues();
    this.clickRight(i);
  }
  savePlan(tag){


    var date = Date().toString().slice(0,24);

    this.httpService.onSendPlans([this.done,{nameTag:tag.value,date:date,editMode:0,editPlanName:0,recipe:"",publish:0},this.total,{username:this.dietPlanService.userCredentials.username,tot:this.dietPlanService.plansIds.length}]).subscribe(
      (response) => {
        this.dietPlanService.plansIds.push(response.id);
        this.dietPlanService.savedPlansArray.push(this.done);
        this.dietPlanService.savedPlansTotals.push(this.total);
        this.dietPlanService.savedPlansNametags.push({nameTag:tag.value,date:date,editMode:0,editPlanName:0,recipe:"",publish:0});
      },
      (error) => console.log(error)
    );


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
    for(var i=0;i<this.done.length;i++){
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
  }

  changeItems(itemType){

    if(itemType =="vegetables"){
      this.selectedItemType=this.vegetables.slice(0,10);
      this.lastIndex =10;
      this.lastSelectedItemName = itemType;
      document.getElementById('small-screen').scrollTop = 0;
    }
    else if (itemType =="fruits"){
      this.selectedItemType=this.fruits.slice(0,10);
      this.lastIndex =10;
      this.lastSelectedItemName = itemType;
      document.getElementById('small-screen').scrollTop = 0;
    }
    else if (itemType =="seeds"){
      this.selectedItemType=this.seeds.slice(0,10);
      this.lastIndex =10;
      this.lastSelectedItemName = itemType;
    }
    else if (itemType =="nuts"){
      this.selectedItemType=this.nuts.slice(0,10);
      this.lastIndex =10;
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
      if(this.searchText == undefined) {
        if (this.vegetables[index].click == 0) {
          this.vegetables[index].click = 1;
        }
        else {
          this.vegetables[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        // for(var i =0;i<this.vegetables.length;i++){
        //   if(this.selectedItemType[index].index == this.vegetables[i].index){
        if(this.selectedItemType[index].click ==0){
          this.selectedItemType[index].click = 1;
        }
        else {
          this.selectedItemType[index].click = 0;
        }
        //   }
        // }

      }
    }
    else if(this.lastSelectedItemName == 'fruits'){
      if(this.searchText == undefined) {
        if (this.fruits[index].click == 0) {
          this.fruits[index].click = 1;
        }
        else {
          this.fruits[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType[index].click ==0){
          this.selectedItemType[index].click = 1;
        }
        else {
          this.selectedItemType[index].click = 0;
        }
      }
    }
    else if(this.lastSelectedItemName == 'liquids'){
      if(this.searchText == undefined) {
        if (this.liquids[index].click == 0) {
          this.liquids[index].click = 1;
        }
        else {
          this.liquids[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType[index].click ==0){
          this.selectedItemType[index].click = 1;
        }
        else {
          this.selectedItemType[index].click = 0;
        }
      }
    }
    else if(this.lastSelectedItemName == 'nuts'){
      if(this.searchText == undefined) {
        if (this.nuts[index].click == 0) {
          this.nuts[index].click = 1;
        }
        else {
          this.nuts[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType[index].click ==0){
          this.selectedItemType[index].click = 1;
        }
        else {
          this.selectedItemType[index].click = 0;
        }
      }
    }
    else if(this.lastSelectedItemName == 'seeds'){
      if(this.searchText == undefined) {
        if (this.seeds[index].click == 0) {
          this.seeds[index].click = 1;
        }
        else {
          this.seeds[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType[index].click ==0){
          this.selectedItemType[index].click = 1;
        }
        else {
          this.selectedItemType[index].click = 0;
        }
      }
    }

    else if(this.lastSelectedItemName == 'others'){
      if(this.searchText == undefined) {
        if (this.others[index].click == 0) {
          this.others[index].click = 1;
        }
        else {
          this.others[index].click = 0;
        }
      }
      else if(this.searchText != undefined){
        if(this.selectedItemType[index].click ==0){
          this.selectedItemType[index].click = 1;
        }
        else {
          this.selectedItemType[index].click = 0;
        }
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
      for (var i = this.vegetables.length - 1; i >= 0; i--) {
        if (this.vegetables[i].click == 1) {
          this.done.push(this.vegetables[i]);
          this.vegetables.splice(i, 1);
          this.totalValues();

        }
      }
      this.selectedItemType =this.vegetables;
      this.searchText = undefined;

    }
    else if(this.lastSelectedItemName == 'fruits'){
      for(var i=this.fruits.length-1 ;i>=0;i--){
        if(this.fruits[i].click ==1){
          this.done.push(this.fruits[i]);
          this.fruits.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType =this.fruits;
      this.searchText = undefined;
    }
    else if(this.lastSelectedItemName == 'nuts'){
      for(var i=this.nuts.length-1 ;i>=0;i--){
        if(this.nuts[i].click ==1){
          this.done.push(this.nuts[i]);
          this.nuts.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType =this.nuts;
      this.searchText = undefined;
    }
    else if(this.lastSelectedItemName == 'seeds'){
      for(var i=this.seeds.length-1 ;i>=0;i--){
        if(this.seeds[i].click ==1){
          this.done.push(this.seeds[i]);
          this.seeds.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType =this.seeds;
      this.searchText = undefined;
    }
    else if(this.lastSelectedItemName == 'liquids'){
      for(var i=this.liquids.length-1 ;i>=0;i--){
        if(this.liquids[i].click ==1){
          this.done.push(this.liquids[i]);
          this.liquids.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType =this.liquids;
      this.searchText = undefined;
    }
    else if(this.lastSelectedItemName == 'others'){
      for(var i=this.others.length-1 ;i>=0;i--){
        if(this.others[i].click ==1){
          this.done.push(this.others[i]);
          this.others.splice(i,1);
          this.totalValues();

        }
      }
      this.selectedItemType =this.others;
      this.searchText = undefined;
    }
  }
  leftMove(){

    for(var i =this.done.length-1 ;i>=0;i--){
      if(this.done[i].click == 0) {
        if (this.done[i].itemType == 'vegetables') {
          this.vegetables.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'fruits')
        {
          this.fruits.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'liquids')
        {
          this.liquids.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'nuts')
        {
          this.nuts.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'seeds')
        {
          this.seeds.push(this.done[i]);
          this.done.splice(i,1);
          this.totalValues();
        }
        else if(this.done[i].itemType == 'others')
        {
          this.others.push(this.done[i]);
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
    this.searchText= undefined;
    this.changeItems(this.currentSelectedbutton);

  }
  scrollRight(){
    document.getElementById("item-types-container").scrollBy (100,0);


  }
  scrollLeft(){
    document.getElementById("item-types-container").scrollBy (-100,0);
  }
  scrollRight1(index){
    document.getElementsByClassName("actual-items")[index].scrollBy (200,0);
    document.getElementsByClassName("actual-items1")[index].scrollBy (200,0);
    this.clickLeft(index);
  }

  scrollLeft1(index){
    document.getElementsByClassName("actual-items")[index].scrollBy (-200,0);
    document.getElementsByClassName("actual-items1")[index].scrollBy (-200,0);
    this.clickLeft(index);
  }


  publishPlan() {
    this.publishPlanTextArea = true;
  }


  moveToChoosen(index){

    if(this.lastSelectedItemName == 'vegetables'){
      if(this.searchText == undefined){
        this.vegetables[index].click=1;
        this.done.push(this.vegetables[index]);
        this.vegetables.splice(index,1);
        this.selectedItemType.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType[index].index;
        for(var i =0;i<=this.vegetables.length;i++){
          if(index1 == this.vegetables[i].index){
            this.vegetables[i].click =1;
            this.done.push(this.vegetables[i]);
            this.vegetables.splice(i,1);
            this.selectedItemType.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'fruits'){
      if(this.searchText == undefined){
        this.fruits[index].click=1;
        this.done.push(this.fruits[index]);
        this.fruits.splice(index,1);
        this.selectedItemType.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType[index].index;
        for(var i =0;i<=this.fruits.length;i++){
          if(index1 == this.fruits[i].index){
            this.fruits[i].click =1;
            this.done.push(this.fruits[i]);
            this.fruits.splice(i,1);
            this.selectedItemType.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'liquids'){
      if(this.searchText == undefined){
        this.liquids[index].click=1;
        this.done.push(this.liquids[index]);
        this.liquids.splice(index,1);
        this.selectedItemType.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType[index].index;
        for(var i =0;i<=this.liquids.length;i++){
          if(index1 == this.liquids[i].index){
            this.liquids[i].click =1;
            this.done.push(this.liquids[i]);
            this.liquids.splice(i,1);
            this.selectedItemType.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'nuts'){
      if(this.searchText == undefined){
        this.nuts[index].click=1;
        this.done.push(this.nuts[index]);
        this.nuts.splice(index,1);
        this.selectedItemType.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType[index].index;
        for(var i =0;i<=this.nuts.length;i++){
          if(index1 == this.nuts[i].index){
            this.nuts[i].click =1;
            this.done.push(this.nuts[i]);
            this.nuts.splice(i,1);
            this.selectedItemType.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'seeds'){
      if(this.searchText == undefined){
        this.seeds[index].click=1;
        this.done.push(this.seeds[index]);
        this.seeds.splice(index,1);
        this.selectedItemType.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType[index].index;
        for(var i =0;i<=this.seeds.length;i++){
          if(index1 == this.seeds[i].index){
            this.seeds[i].click =1;
            this.done.push(this.seeds[i]);
            this.seeds.splice(i,1);
            this.selectedItemType.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'others'){
      if(this.searchText == undefined){
        this.others[index].click=1;
        this.done.push(this.others[index]);
        this.others.splice(index,1);
        this.selectedItemType.splice(index,1);
        this.totalValues();
      }
      else if(this.searchText != undefined){
        var index1 = this.selectedItemType[index].index;
        for(var i =0;i<=this.others.length;i++){
          if(index1 == this.others[i].index){
            this.others[i].click =1;
            this.done.push(this.others[i]);
            this.others.splice(i,1);
            this.selectedItemType.splice(index,1);
            this.totalValues();
            break;
          }
        }
      }
    }
  }

  moveToItemslist(index){
    if (this.done[index].itemType == 'vegetables') {
      this.done[index].click=0;
      this.vegetables.push(this.done[index]);
      this.selectedItemType.push(this.done[index]);
      this.done.splice(index,1);
      this.totalValues();
    }
    else if(this.done[index].itemType == 'fruits')
    {
      this.done[index].click=0;
      this.fruits.push(this.done[index]);
      this.selectedItemType.push(this.done[index]);
      this.done.splice(index,1);
      this.totalValues();
    }
    else if(this.done[index].itemType == 'liquids')
    {
      this.done[index].click=0;
      this.liquids.push(this.done[index]);
      this.selectedItemType.push(this.done[index]);
      this.done.splice(index,1);
      this.totalValues();
    }
    else if(this.done[index].itemType == 'nuts')
    {
      this.done[index].click=0;
      this.nuts.push(this.done[index]);
      this.selectedItemType.push(this.done[index]);
      this.done.splice(index,1);
      this.totalValues();
    }
    else if(this.done[index].itemType == 'seeds')
    {
      this.done[index].click=0;
      this.seeds.push(this.done[index]);
      this.selectedItemType.push(this.done[index]);
      this.done.splice(index,1);
      this.totalValues();
    }
    else if(this.done[index].itemType == 'others')
    {
      this.done[index].click=0;
      this.others.push(this.done[index]);
      this.selectedItemType.push(this.done[index]);
      this.done.splice(index,1);
      this.totalValues();
    }

  }
  // onScrollDown() {
  //   if (this.lastSelectedItemName == 'vegetables') {
  //
  //   if (this.lastIndex < this.vegetables.length) {
  //     for (var i = this.lastIndex; i < this.lastIndex + 5; i++) {
  //       if (this.selectedItemType.length == this.vegetables.length) {
  //         this.lastIndex = 99999;
  //         this.scrollvalue = true;
  //         break;
  //       }
  //       else {
  //         this.selectedItemType.push(this.vegetables[i]);
  //       }
  //     }
  //     this.lastIndex += 5;
  //    }
  //   }
  //
  //  else if (this.lastSelectedItemName == 'fruits') {
  //
  //     if (this.lastIndex < this.fruits.length) {
  //       for (var i = this.lastIndex; i < this.lastIndex + 5; i++) {
  //         if (this.selectedItemType.length == this.fruits.length) {
  //           this.lastIndex = 99999;
  //           this.scrollvalue = true;
  //           break;
  //         }
  //         else {
  //           this.selectedItemType.push(this.fruits[i]);
  //         }
  //       }
  //       this.lastIndex += 5;
  //     }
  //   }
  //   else if (this.lastSelectedItemName == 'liquids') {
  //
  //     if (this.lastIndex < this.liquids.length) {
  //       for (var i = this.lastIndex; i < this.lastIndex + 5; i++) {
  //         if (this.selectedItemType.length == this.liquids.length) {
  //           this.lastIndex = 99999;
  //           this.scrollvalue = true;
  //           break;
  //         }
  //         else {
  //           this.selectedItemType.push(this.liquids[i]);
  //         }
  //       }
  //       this.lastIndex += 5;
  //     }
  //   }
  //   else if (this.lastSelectedItemName == 'nuts') {
  //
  //     if (this.lastIndex < this.nuts.length) {
  //       for (var i = this.lastIndex; i < this.lastIndex + 5; i++) {
  //         if (this.selectedItemType.length == this.nuts.length) {
  //           this.lastIndex = 99999;
  //           this.scrollvalue = true;
  //           break;
  //         }
  //         else {
  //           this.selectedItemType.push(this.nuts[i]);
  //         }
  //       }
  //       this.lastIndex += 5;
  //     }
  //   }
  //   else if (this.lastSelectedItemName == 'seeds') {
  //
  //     if (this.lastIndex < this.seeds.length) {
  //       for (var i = this.lastIndex; i < this.lastIndex + 5; i++) {
  //         if (this.selectedItemType.length == this.seeds.length) {
  //           this.lastIndex = 99999;
  //           this.scrollvalue = true;
  //           break;
  //         }
  //         else {
  //           this.selectedItemType.push(this.seeds[i]);
  //         }
  //       }
  //       this.lastIndex += 5;
  //     }
  //   }
  //   else if (this.lastSelectedItemName == 'others') {
  //
  //     if (this.lastIndex < this.others.length) {
  //       for (var i = this.lastIndex; i < this.lastIndex + 5; i++) {
  //         if (this.selectedItemType.length == this.others.length) {
  //           this.lastIndex = 99999;
  //           this.scrollvalue = true;
  //           break;
  //         }
  //         else {
  //           this.selectedItemType.push(this.others[i]);
  //         }
  //       }
  //       this.lastIndex += 5;
  //     }
  //   }
  //
  //
  //
  // }
  //
  // onScrollUp() {
  //   console.log('scrolled up!!');
  // }

  scrolled(){
    let divHeight = document.getElementById('large-screen');
      if(divHeight.offsetHeight + divHeight.scrollTop >= divHeight.scrollHeight){
        console.log('end reached');
      }
  }
  scrolled1(){
    let divHeight = document.getElementById('small-screen');
    let count = 0;
    if(this.lastSelectedItemName == 'vegetables') {
      if (divHeight.offsetHeight + divHeight.scrollTop >= divHeight.scrollHeight) {
        if(this.vegetables.length >10) {
          if (this.lastIndex != 99999) {
            for (let i = this.lastIndex; i < this.lastIndex + 5; i++) {
              this.selectedItemType.push(this.vegetables[i]);
              if (i + 1 == this.vegetables.length) {
                this.lastIndex = 99999;
                break;
              }
              else if (count == 4) {
                this.lastIndex = this.lastIndex + 5;
                break;
              }
              else {
                count++;
              }
            }
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'fruits') {
      if (divHeight.offsetHeight + divHeight.scrollTop >= divHeight.scrollHeight) {
        if(this.fruits.length > 10) {
          if (this.lastIndex != 99999) {
            for (let i = this.lastIndex; i < this.lastIndex + 5; i++) {
              this.selectedItemType.push(this.fruits[i]);
              if (i + 1 == this.fruits.length) {
                this.lastIndex = 99999;
                break;
              }
              else if (count == 4) {
                this.lastIndex = this.lastIndex + 5;
                break;
              }
              else {
                count++;
              }
            }
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'seeds') {
      if (divHeight.offsetHeight + divHeight.scrollTop >= divHeight.scrollHeight) {
        if(this.seeds.length > 10) {
          if (this.lastIndex != 99999) {
            for (let i = this.lastIndex; i < this.lastIndex + 5; i++) {
              this.selectedItemType.push(this.seeds[i]);
              if (i + 1 == this.seeds.length) {
                this.lastIndex = 99999;
                break;
              }
              else if (count == 4) {
                this.lastIndex = this.lastIndex + 5;
                break;
              }
              else {
                count++;
              }
            }
          }
        }
      }
    }
    else if(this.lastSelectedItemName == 'nuts') {
      if (divHeight.offsetHeight + divHeight.scrollTop >= divHeight.scrollHeight) {
        if(this.nuts.length > 10) {
          if (this.lastIndex != 99999) {
            for (let i = this.lastIndex; i < this.lastIndex + 5; i++) {
              this.selectedItemType.push(this.nuts[i]);
              if (i + 1 == this.nuts.length) {
                this.lastIndex = 99999;
                break;
              }
              else if (count == 4) {
                this.lastIndex = this.lastIndex + 5;
                break;
              }
              else {
                count++;
              }
            }
          }
        }
      }
    }
  }
}
