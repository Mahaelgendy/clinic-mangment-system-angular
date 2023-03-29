import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicines } from 'src/app/Models/medicines';
import { MedicinesService } from 'src/app/Services/medicines.service';

@Component({
  selector: 'app-medicin-update',
  templateUrl: './medicin-update.component.html',
  styleUrls: ['./medicin-update.component.css']
})
export class MedicinUpdateComponent {
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
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      speciality: ['', Validators.required],
      description: ['', ],
    });
  }
  get f() { return this.medicineForm.controls; }
  ngOnInit(){
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
  onSubmit() {
    if (this.medicineForm.invalid) {
      return;
    }
    else{
      const medicin =  Medicines.fromFormValues(this.medicineForm.value);
      console.log(medicin);
      this.medicineService.updateMedicines(this.medicineId,medicin).subscribe(
        (response) => {
          console.log('updated medicine:', response);
        },
        (error) => {
          console.error('Error updating medicine:', error);
        }
        );
        console.log('Form submitted successfully!');
        this.router.navigate(['/']);
        
      }
    }
}
