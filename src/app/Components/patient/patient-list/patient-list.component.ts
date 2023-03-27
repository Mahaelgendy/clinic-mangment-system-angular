import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patients } from 'src/app/Models/patients';
import { PatientsService } from 'src/app/Services/patients.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  public Allpatients:Patients[]=[];
  constructor(public patientService:PatientsService ,private router: Router , public activatedRoute:ActivatedRoute ){
  }
  ngOnChanges(): void {
  }
  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(patient =>
      {
        this.Allpatients = patient;
      });
  }
  showPatientDetails(patientId: number |undefined) {
    this.router.navigate(['/patients/details', patientId]);
  }

  UpdatePatientData(patientId : number |undefined){
    if(patientId != undefined){
      this.router.navigate(['/patients/update', patientId]);
    }else{
      this.router.navigate(['/']);
    }
  }

  DeletePatient(id:number|undefined){
    if(confirm("Are You Sure?")){
      this.activatedRoute.params.subscribe(data=>{
        this.patientService.deletePatientByID(id).subscribe(res=>{
          this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
            this.router.navigate(['/patients']);
          })
        })
      })
    }
  }
  
}
