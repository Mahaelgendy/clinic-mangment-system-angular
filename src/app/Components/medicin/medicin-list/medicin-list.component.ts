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
  role : string| null;
  isDoctorOrAdmin: boolean=false;

  constructor(public medicinService:MedicinesService, private router : Router){
    this.role = sessionStorage.getItem('role');
  }
  ngOnInit(){
    if(sessionStorage.getItem('role')== 'admin' || sessionStorage.getItem('role')== 'doctor'){
      this.isDoctorOrAdmin=true;
      this.medicinService.getAllMedicines().subscribe(data=>{
        this.medicines = data;
      })
    }
    else{
      this.router.navigate(['notFound']);
    }
  }
}
