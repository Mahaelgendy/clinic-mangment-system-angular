import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Patients } from 'src/app/Models/patients';
import { PatientStatus } from "src/app/Models/PatientStatus";
import { User } from 'src/app/Models/user';
import { PatientsService } from 'src/app/Services/patients.service';
import { UserService } from 'src/app/Services/user.service';
import { AlertComponent } from '../alert/alert.component';

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
  public patientStaus =["First Time" , "follow Up"];
  public hasInsuranceValues =["true", "false"];
  selectedStatus!:string;
  patientStatus! :PatientStatus;
  added:boolean=false;
  
  constructor(public route: ActivatedRoute,
    private patientservice: PatientsService,
    private userService: UserService,
    public dialog: MatDialog) {
    this.newPatientform = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      status: new FormControl('', [Validators.required]),
      history: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required ,Validators.pattern(/[0-9]*/), Validators.min(20),Validators.max(250)]),
      weight: new FormControl('', [Validators.required ,Validators.pattern(/[0-9]*/), Validators.min(0), Validators.max(250)]),
      hasInsurance: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.pattern(/^01[0-2,5]\d{8}$/)])
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
             parseInt(this.newPatientform.get('height')?.value),
             parseInt(this.newPatientform.get('weight')?.value),
             this.newPatientform.get('hasInsurance')?.value,
             this.newPatientform.get('phone')?.value,
             this.user[0],
             this.newPatientform.get('email')?.value);
             console.log(this.newPatientform.get('hasInsurance')?.value);
             this.patientservice.addPatient(this.patient).subscribe(x=>
              this.added=true
             )
        }
        else{
          this.dialog.open(AlertComponent);
        }
        })
      }
      getControl(fullName:any): AbstractControl |null
      {
        return this.newPatientform.get(fullName);
      }
}
