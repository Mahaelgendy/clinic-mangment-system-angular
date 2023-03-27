import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Patients } from 'src/app/Models/patients';
import { PatientStatus } from "src/app/Models/PatientStatus";
import { User } from 'src/app/Models/user';
import { PatientsService } from 'src/app/Services/patients.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {
  public newPatientform!: FormGroup;
  patientEmail: string = "salawaa@gmail.com";
  public user!: User[];
  public patient!: Patients;
  public patientid! :any;
  patientStatus! :PatientStatus;
  constructor(public route: ActivatedRoute,
    private patientservice: PatientsService,
    private userService: UserService) {
    //   this.route.params.subscribe((params: Params) => {
    //     this.patientEmail = params['email'];
    //  })
    this.newPatientform = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      status: new FormControl('', [Validators.required]),
      history: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required , Validators.min(20),Validators.max(200)]),
      weight: new FormControl('', [Validators.required , Validators.min(0), Validators.max(150)]),
      hasInsurance: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)])
    });
  }
  ngOnInit(): void {
  }
    onSubmit() {
      this.userService.getUserByEmail(this.newPatientform.get('email')?.value).subscribe(user =>{
        this.user = user;
        if(user[0] != null &&user[0].role == 'patient' )
         {
           console.log(this.user[0]._id);
           this.patient = new Patients(
             this.newPatientform.get('status')?.value,
             this.newPatientform.get('history')?.value,
             this.newPatientform.get('height')?.value,
             this.newPatientform.get('weight')?.value,
             this.newPatientform.get('hasInsurance')?.value,
             this.newPatientform.get('phone')?.value,
             this.user[0],
             this.newPatientform.get('email')?.value);
             console.log(this.patient);
             this.patientservice.addPatient(this.patient).subscribe(x=>
              console.log(x)
             )
        }
        else{
          alert("this is not Patient ")
        }
        })

    }
}
