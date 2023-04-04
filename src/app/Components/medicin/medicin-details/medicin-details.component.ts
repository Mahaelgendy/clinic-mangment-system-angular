import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicines } from 'src/app/Models/medicines';
import { MedicinesService } from 'src/app/Services/medicines.service';

@Component({
  selector: 'app-medicin-details',
  templateUrl: './medicin-details.component.html',
  styleUrls: ['./medicin-details.component.css']
})
export class MedicinDetailsComponent {
  medicine!:Medicines;
  medicineId:number =0;

  name:string="";
  companyName:string="";
  speciality:string="";
  description:string="";
  
  medicineForm = new FormGroup({
    name: new FormControl(''),
    companyName: new FormControl(''),
    speciality: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(public medicineService:MedicinesService,private fb: FormBuilder,private router: Router,private activatedRoute:ActivatedRoute)
  {
    this.medicineForm = this.fb.group({
      name: [{value: '', disabled: true}, Validators.required],
      companyName: [{value: '', disabled: true}, Validators.required],
      speciality: [{value: '', disabled: true}, Validators.required],
      description: [{value: '', disabled: true}, ],
    });
  }

  get f() { return this.medicineForm.controls; }

  ngOnInit(){
    if(sessionStorage.getItem('role')== 'admin' || sessionStorage.getItem('role')== 'doctor'){
      this.activatedRoute.params.subscribe((a)=>{
        this.medicineId = a['id'];
        this.medicineService.getMedicinesById(a['id']).subscribe(data=>{
          this.medicine = data;
          console.log(this.medicine)          
  
          this.medicineForm.setValue({
            name: data.medicineName || '',
            companyName: data.companyName || '',
            speciality: data.speciality || '',
            description :data.description || ''
          });
  
        })
      })
    }
    else{
      this.router.navigate(['notFound']);
    }
  }
}
