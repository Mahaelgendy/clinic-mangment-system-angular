import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  public user!: User[];
  public patient!: Patients;
  public patientid! :any;
  selectedStatus!:string;
  patientStatus! :PatientStatus;
  added:boolean=false;
  isDoctorOrAdmin : boolean = false;

  
  constructor(public route: ActivatedRoute,
    public router : Router,
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
           this.patient = new Patients(
             this.newPatientform.get('status')?.value,
             this.newPatientform.get('history')?.value,
             parseInt(this.newPatientform.get('height')?.value),
             parseInt(this.newPatientform.get('weight')?.value),
             this.newPatientform.get('hasInsurance')?.value,
             this.newPatientform.get('phone')?.value,
             this.user[0],
             this.newPatientform.get('email')?.value);

            if(sessionStorage.getItem('role')== 'doctor'|| sessionStorage.getItem('role')== 'admin'){
              this.patientservice.addPatient(this.patient).subscribe(x=>
                this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
                 this.router.navigate(['/patients'])})
               )
            }
            else{
              this.router.navigate(['notFound']);
            }


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
