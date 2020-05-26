import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-add-new-items',
  templateUrl: './add-new-items.component.html',
  styleUrls: ['./add-new-items.component.css']
})
export class AddNewItemsComponent implements OnInit {
  selectedValue:any = null;
  addItemForm:FormGroup;
  message = false;
  constructor( private httpService:HttpService) { }

  ngOnInit(): void {
    this.addItemForm = new FormGroup({
      name: new FormControl(null),
      telName: new FormControl(null),
      hinName : new FormControl(null),
      kcal : new FormControl(null),
      carbs : new FormControl(null),
      protein: new FormControl(null),
      fat: new FormControl(null),
      sfat : new FormControl(null),
      pfat : new FormControl(null),
      mfat : new FormControl(null),
      cholesterol : new FormControl(null),
      sodium : new FormControl(null),
      potassium : new FormControl(null),
      dfib : new FormControl(null),
      sugar : new FormControl(null),
      vitA : new FormControl(null),
      vitC : new FormControl(null),
      calcium : new FormControl(null),
      iron : new FormControl(null),
      vitD: new FormControl(null),
      zinc : new FormControl(null),
      vitB12 : new FormControl(null),
      mag : new FormControl(null),
      imgUrl : new FormControl(null),
    });
  }

  onSubmitAddItem(){
    var name = this.addItemForm.value.name;
    var telName = this.addItemForm.value.telName;
    var hinName = this.addItemForm.value.hinName;
    var kcal = this.addItemForm.value.kcal;
    var carbs =  this.addItemForm.value.carbs;
    var protein = this.addItemForm.value.protein;
    var fat  = this.addItemForm.value.fat;
    var sfat = this.addItemForm.value.sfat;
    var pfat = this.addItemForm.value.pfat;
    var mfat = this.addItemForm.value.mfat;
    var cholesterol = this.addItemForm.value.cholesterol;
    var sodium = this.addItemForm.value.sodium;
    var potassium  = this.addItemForm.value.potassium;
    var dfib = this.addItemForm.value.dfib;
    var sugar = this.addItemForm.value.sugar;
    var vitA = this.addItemForm.value.vitA;
    var vitC  = this.addItemForm.value.vitC;
    var calcium  = this.addItemForm.value.calcium;
    var iron = this.addItemForm.value.iron;
    var vitD = this.addItemForm.value.vitD;
    var zinc = this.addItemForm.value.zinc;
    var vitB12 = this.addItemForm.value.vitB12;
    var mag = this.addItemForm.value.mag;
    var itemType = this.selectedValue;
    var imgUrl = this.addItemForm.value.imgUrl;

    this.httpService.onAddItem({
      name:name,telName:telName,hinName:hinName,kcal:kcal,carbs:carbs,protein:protein,fat:fat,sfat:sfat,pfat:pfat,mfat:mfat,
      cholesterol:cholesterol,sodium:sodium,potassium:potassium,dfib:dfib,sugar:sugar,vitA:vitA,vitC:vitC,calcium:calcium,
      iron:iron,vitD:vitD,zinc:zinc,vitB12:vitB12,mag:mag,sWeight:100,click:0,itemType:itemType,weight:100,imgUrl:imgUrl
    }).subscribe(
      (response) => {
        if(response.success == true){
          this.message = true;
        }
      },
      (error) => console.log(error)
    );
  }
}
