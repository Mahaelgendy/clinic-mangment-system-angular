import { Dialog } from '@angular/cdk/dialog';
import { Component ,OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctors } from 'src/app/Models/doctors';
import { Medicines } from 'src/app/Models/medicines';
import { Patients } from 'src/app/Models/patients';
import { Prescription } from 'src/app/Models/prescription';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { MedicinesService } from 'src/app/Services/medicines.service';
import { PatientsService } from 'src/app/Services/patients.service';
import { PrescriptionService } from 'src/app/Services/prescription.service';

@Component({
  selector: 'app-prescription-add',
  templateUrl: './prescription-add.component.html',
  styleUrls: ['./prescription-add.component.css']
})

export class PrescriptionAddComponent  implements OnInit {
  public newPrescriptionForm! : FormGroup;
  public doctors!: Doctors;
  public patients: Patients[]=[];
  doctorId : number =2;
  current !:string ;
  medicines:Medicines[] =[];
  doctorName ?: string;
  newpPescription!: Prescription;
  SelcetedMedicine = new FormControl();
  medicinesIds : number[]=[];

  constructor(private route : ActivatedRoute,
      private router : Router,
      private prescriptionService : PrescriptionService,
      public dialog : Dialog,
      private docttorService : DoctorsService,
      private patientservice : PatientsService,
      private medicineService :MedicinesService,private formBuilder: FormBuilder){
        const currentDate = new Date();
        this.current = this.formatDate(currentDate);
        this.newPrescriptionForm= new FormGroup({
          diagnosis: new FormControl('', [Validators.required]),
          nextExamination : new FormControl('',[Validators.required]),
          patient_id : new FormControl('',[Validators.required]),
      });
  }
  ngOnInit(){
    this.patientservice.getAllPatients().subscribe((patient)=>
    {
      for(let i =0 ; i < patient.length ;i++){
        this.patients.push(patient[i]);
      }
    })
    this.docttorService.getDoctorByID(this.doctorId).subscribe((data)=>
    {
      this.doctorName = data.userData?.fullName;
      this.medicineService.getMedicineByspeciality(data.specialization).subscribe((med)=>{
        for(let i =0 ;i< med.length;i++){
          this.medicines.push(med[i]);
        }
      })
      //to get selected medicine
      this.SelcetedMedicine.valueChanges.subscribe(x =>{
        for(let i = 0; i < x.length;i++){
          this.medicinesIds.push(x[i])
        }
      })
    })

  }
  onDatetimeSelected(event: MatDatepickerInputEvent<Date>) {
    const selectedDatetime = event.value;
  }
  onSubmit(){
    this.newPrescriptionForm.markAsTouched();
    this.SelcetedMedicine.markAllAsTouched();
    if(this.newPrescriptionForm.errors || this.SelcetedMedicine.errors) return ;
    if(this.newPrescriptionForm.errors )
    this.newpPescription  =new Prescription(
      this.newPrescriptionForm.get('diagnosis')?.value,
      this.current,
      this.formatDate(this.newPrescriptionForm.get('nextExamination')?.value),
      this.doctorId,
      this.newPrescriptionForm.get('patient_id')?.value,
      this.medicinesIds
      );
      this.prescriptionService.addPrescription(this.newpPescription).subscribe((res)=>{
        this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
          this.router.navigate(['/patients'])})
        })
      } 
      get medicine_id(): FormArray {
        return this.newPrescriptionForm.get('medicine_id') as FormArray;
      }
  formatDate(date : Date ){
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2);
    const day = date.getDate().toString().padStart(2); 
    return `${year}-${month}-${day}`;
  }
  getControl(fullName:any |undefined): AbstractControl |null
  {
    return this.newPrescriptionForm.get(fullName);
  }
}