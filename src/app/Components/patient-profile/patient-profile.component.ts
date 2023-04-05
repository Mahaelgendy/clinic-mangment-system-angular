import { ConstantPool, leadingComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { Patients } from 'src/app/Models/patients';
import { PatientsService } from 'src/app/Services/patients.service';
import { PrescriptionService } from 'src/app/Services/prescription.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent {
  email!:any
  public PatientId?: number = -1;
  patientFullData?: Patients;
  constructor(public patientServices : PatientsService,
              public prescriptionservices : PrescriptionService,
               private route: ActivatedRoute){
               this.email= sessionStorage.getItem('email')
               console.log(this.email);
              // this.route.params.subscribe((params: Params) => {
              //   this.PatientId = params['id'];
              //  });
          
              // this.patientServices.getPatientByID(this.PatientId).subscribe(patient =>{
              //   {
              //     if(patient != null && patient.patientData != null ){
              //       this.patientFullData = patient;
              //     }
              //     else{
              //       alert("lmdm")
              //     }
              //   }
              // })
   }
   ngOnInit()
   {
      this.patientServices.getPatientByEmail(this.email).subscribe(patient=>{
        if(patient!=null)
        {
          console.log(patient);
          this.patientFullData=patient
        }
        else
        {
          console.log("not found");
        }
      })
   }

   
}
