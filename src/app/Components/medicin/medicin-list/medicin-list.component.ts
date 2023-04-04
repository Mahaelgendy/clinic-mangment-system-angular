import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Medicines } from 'src/app/Models/medicines';
import { MedicinesService } from 'src/app/Services/medicines.service';

@Component({
  selector: 'app-medicin-list',
  templateUrl: './medicin-list.component.html',
  styleUrls: ['./medicin-list.component.css']
})
export class MedicinListComponent {
  medicines:Medicines[]=[];

  constructor(public medicinService:MedicinesService, private router : Router){
  }
  ngOnInit(){
    if(sessionStorage.getItem('role')== 'admin' || sessionStorage.getItem('role')== 'doctor'){
      this.medicinService.getAllMedicines().subscribe(data=>{
        this.medicines = data;
      })
    }
    else{
      this.router.navigate(['notFound']);
    }
  }
}
