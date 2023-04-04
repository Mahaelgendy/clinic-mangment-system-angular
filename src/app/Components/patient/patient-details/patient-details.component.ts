import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/Services/patients.service';
import { ActivatedRoute, Params,Router } from '@angular/router';
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
  constructor(public patientServices: PatientsService,private route: ActivatedRoute,private router: Router){

    this.route.params.subscribe((params: Params) => {
       this.patientId = params['id'];
    });
  }
  ngOnInit(): void {
    if(sessionStorage.getItem('role')== 'admin' || sessionStorage.getItem('role')== 'doctor'|| sessionStorage.getItem('role')== 'patient'){
      this.patientServices.getPatientByID(this.patientId).subscribe(data =>
        {
          console.log(data);
          this.patient = data;
        }
        )
    }
    else{
      this.router.navigate(['notFound']);
    }
  }

}
