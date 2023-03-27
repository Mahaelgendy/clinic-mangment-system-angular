import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/Services/patients.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Patients } from 'src/app/Models/patients';



@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  private patientId: number =0;
  patient? :Patients ;
  cardTitle:string ='patient data';
  constructor(public patientServices: PatientsService,private route: ActivatedRoute){

    this.route.params.subscribe((params: Params) => {
       this.patientId = params['id'];
    });
  }
  ngOnInit(): void {
    this.patientServices.getPatientByID(this.patientId).subscribe(data =>
    {
      this.patient = data;
      console.log(this.patient);
    }
    )
  }

}
