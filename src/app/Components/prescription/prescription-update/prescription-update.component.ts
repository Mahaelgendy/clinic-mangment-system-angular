import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Medicines } from 'src/app/Models/medicines';
import { Prescription } from 'src/app/Models/prescription';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { MedicinesService } from 'src/app/Services/medicines.service';
import { PrescriptionService } from 'src/app/Services/prescription.service';

@Component({
  selector: 'app-prescription-update',
  templateUrl: './prescription-update.component.html',
  styleUrls: ['./prescription-update.component.css']
})
export class PrescriptionUpdateComponent {
  prescriptionId ?: number ;
  PrescriptionForm!: FormGroup;
  prescription!:Prescription;
  SelcetedMedicine! :FormControl;
  allMedicines : Medicines[]=[];
  current !:string ;

  constructor(
    private route :ActivatedRoute,
    private router :Router,
    private prescriptionService :PrescriptionService,
    private docttorService :DoctorsService,
    private medicineService :MedicinesService
  ){
    const currentDate = new Date();
    this.current = this.formatDate(currentDate);
    this.route.params.subscribe((params: Params) => {
      this.prescriptionId = params['id'];
    });
    this.PrescriptionForm = new FormGroup({
      diagnosis: new FormControl('', [Validators.required]),
      nextExamination : new FormControl('',[Validators.required]),
      patient_id : new FormControl('',[Validators.required]),
    })
    this.SelcetedMedicine = new FormControl();
  }
  ngOnInit(){
   if(sessionStorage.getItem('role')== 'doctor'){
    this.prescriptionService.getPrescriptionById(this.prescriptionId).subscribe((pres)=>{
      this.prescription = pres;
      this.medicineService.getMedicineByspeciality(pres.doctor_id.specialization).subscribe(med =>
      {
         med.forEach(element => {
          this.allMedicines.push(element);
         });
        })
        this.PrescriptionForm.patchValue({
          diagnosis:pres.diagnosis,
          nextExamination:pres.nextExamination,
          patient_id:pres.doctor_id
        })
        this.SelcetedMedicine.patchValue(pres.medicine_id);
    })
   }else{
    this.router.navigate(['notFound']);
   }

  }
  onSubmit(){
    const UpdatedPrescription = new Prescription(
      this.PrescriptionForm.get('diagnosis')?.value,
      this.current,
      this.formatDate(this.PrescriptionForm.get('nextExamination')?.value),
      this.prescription.doctor_id,
      this.PrescriptionForm.get('patient_id')?.value,
      this.SelcetedMedicine.value);

      this.prescriptionService.updatePrescription(this.prescriptionId ,UpdatedPrescription).subscribe((x)=>{
        this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
          this.router.navigate(['/prescription'])})
          })
  }

  getControl(fullName:any |undefined): AbstractControl |null
  {
    return this.PrescriptionForm.get(fullName);
  }
  get medicine_id(): FormArray {
    return this.PrescriptionForm.get('medicine_id') as FormArray;
  }
  onDatetimeSelected(event: MatDatepickerInputEvent<Date>) {
    const selectedDatetime = event.value;
  }
  formatDate(date : Date ){
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    return currentDate;
  }
}
