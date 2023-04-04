import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Medicines } from 'src/app/Models/medicines';
import { MedicinesService } from 'src/app/Services/medicines.service';

@Component({
  selector: 'app-medicin-add',
  templateUrl: './medicin-add.component.html',
  styleUrls: ['./medicin-add.component.css']
})
export class MedicinAddComponent {
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
  constructor(public medicineService:MedicinesService,private fb: FormBuilder,private router: Router)
  {
    this.medicineForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      speciality: ['', Validators.required],
      description: ['', ],
    });
  }
  get f() { return this.medicineForm.controls; }

  ngOnInit(){
    if(sessionStorage.getItem('role') != 'admin' || sessionStorage.getItem('role') != 'doctor'){
      this.router.navigate(['notFound']);
    }
  }
  
  onSubmit() {
    if (this.medicineForm.invalid) {
      return;
    }
    else{
      const medicin =  Medicines.fromFormValues(this.medicineForm.value);
      console.log(medicin);
      this.medicineService.addMedicines(medicin).subscribe(
        (response) => {
          console.log('Added medicine:', response);
        },
        (error) => {
          console.error('Error adding medicine:', error);
        }
        );
        console.log('Form submitted successfully!');
        this.router.navigate(['/medicine']);
        
      }
    }
  }
