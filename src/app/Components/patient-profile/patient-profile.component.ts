import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Patients } from 'src/app/Models/patients';
import { PatientsService } from 'src/app/Services/patients.service';
import { PrescriptionService } from 'src/app/Services/prescription.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  public PatientId!: number;
  patientFullData!: Patients;
  constructor(public patientServices : PatientsService,
              public prescriptionservices : PrescriptionService,
              private route: ActivatedRoute){
                this.route.params.subscribe((params: Params) => {
                  this.PatientId = params['id'];
               });
   }
  ngOnInit(): void {

    this.patientServices.getPatientByID(this.PatientId).subscribe(patient =>{
      {
        if(patient.patientData != null){
          this.patientFullData = patient;
          console.log(patient);
        }
      }
    })
  }
   
   
}
