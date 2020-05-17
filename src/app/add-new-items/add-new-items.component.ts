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
    let name = this.addItemForm.value.name;
    let telName = this.addItemForm.value.telName;
    let hinName = this.addItemForm.value.hinName;
    let kcal = this.addItemForm.value.kcal;
    let carbs =  this.addItemForm.value.carbs;
    let protein = this.addItemForm.value.protein;
    let fat  = this.addItemForm.value.fat;
    let sfat = this.addItemForm.value.sfat;
    let pfat = this.addItemForm.value.pfat;
    let mfat = this.addItemForm.value.mfat;
    let cholesterol = this.addItemForm.value.cholesterol;
    let sodium = this.addItemForm.value.sodium;
    let potassium  = this.addItemForm.value.potassium;
    let dfib = this.addItemForm.value.dfib;
    let sugar = this.addItemForm.value.sugar;
    let vitA = this.addItemForm.value.vitA;
    let vitC  = this.addItemForm.value.vitC;
    let calcium  = this.addItemForm.value.calcium;
    let iron = this.addItemForm.value.iron;
    let vitD = this.addItemForm.value.vitD;
    let zinc = this.addItemForm.value.zinc;
    let vitB12 = this.addItemForm.value.vitB12;
    let mag = this.addItemForm.value.mag;
    let itemType = this.selectedValue;
    let imgUrl = this.addItemForm.value.imgUrl;

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
