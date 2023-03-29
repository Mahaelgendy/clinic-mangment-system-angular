import { Component } from '@angular/core';
import { Medicines } from 'src/app/Models/medicines';
import { MedicinesService } from 'src/app/Services/medicines.service';

@Component({
  selector: 'app-medicin-list',
  templateUrl: './medicin-list.component.html',
  styleUrls: ['./medicin-list.component.css']
})
export class MedicinListComponent {
  medicines:Medicines[]=[];

  constructor(public medicinService:MedicinesService){
  }
  ngOnInit(){
    this.medicinService.getAllMedicines().subscribe(data=>{
      console.log(data);
      this.medicines = data;
    })
  }
}
