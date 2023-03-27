import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Patients } from 'src/app/Models/patients';
import { User } from 'src/app/Models/user';
import { PatientsService } from 'src/app/Services/patients.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  patientId?: number;
  user!: User;
  updatedPatientform!: FormGroup;
  patientbeforUpdate!: Patients;
  pateientAfterUpdate !:Patients;

  constructor (private route : ActivatedRoute,
                private patientService: PatientsService, 
                private userService: UserService)
                {
    this.route.params.subscribe((params: Params) => {
      this.patientId = params['id'];
    });
    this.updatedPatientform = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      status: new FormControl('', [Validators.required]),
      history: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required , Validators.min(20),Validators.max(200)]),
      weight: new FormControl('', [Validators.required , Validators.min(0), Validators.max(150)]),
      hasInsurance: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)])
    });
    this.patientService.getPatientByID(this.patientId).subscribe(patient =>{
      this.patientbeforUpdate = patient;
      console.log(this.patientbeforUpdate);
      this.updatedPatientform.patchValue({
        status :this.patientbeforUpdate.status,
        history :this.patientbeforUpdate.history,
        height :this.patientbeforUpdate.height,
        weight :this.patientbeforUpdate.weight,
        hasInsurance :this.patientbeforUpdate.hasInsurance,
        phone:this.patientbeforUpdate.phone,
        email: this.patientbeforUpdate.patientData.email
      })
    })
    }
  ngOnInit(): void {}

  Update(){
    this.userService.getUserByEmail(this.updatedPatientform.get('email')?.value).subscribe(user =>{
      this.user= user[0];
      if(user[0] != null &&user[0].role == 'patient' && this.patientId != undefined )
       {
         console.log(this.user._id);
         this.pateientAfterUpdate = new Patients(
           this.updatedPatientform.get('status')?.value,
           this.updatedPatientform.get('history')?.value,
           this.updatedPatientform.get('height')?.value,
           this.updatedPatientform.get('weight')?.value,
           this.updatedPatientform.get('hasInsurance')?.value,
           this.updatedPatientform.get('phone')?.value,
           this.user,
           this.updatedPatientform.get('email')?.value);
           console.log(this.pateientAfterUpdate);
           this.patientService.updatePatient(this.patientId, this.pateientAfterUpdate).subscribe(x=>
            console.log(x)
           )
      }
      else{
        alert("this is not Patient ")
      }
      })

  }


}
