import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Address } from 'src/app/Models/address';
import { Doctors } from 'src/app/Models/doctors';
import { Role } from 'src/app/Models/Enums';
import { User } from 'src/app/Models/user';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { AlertComponent } from '../alert/alert.component';


@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent {

  role!:string | null;
  doctorForm:FormGroup;
  count:number;
  GenderObtion = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];


  constructor(
    public doctorService:DoctorsService,
    public router: Router,
    public dialog: MatDialog){

    this.count = 0;
    this.doctorForm = new FormGroup({
      fullName: new FormControl('',[Validators.required, Validators.pattern(`${/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/}`)]  ),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(`${/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}`)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      age: new FormControl(null, Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      building: new FormControl(null, Validators.required),
      specialization: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      role: new FormControl(Role.doctor),
      // image:new FormControl("assets/profile-img.jpg")
    });

  }


  genders =["Female" , "Male"];

  onSubmit(){

    if(sessionStorage.getItem('role')== 'admin'){
      this.doctorForm.markAllAsTouched();
      if(this.doctorForm.errors){
        return;
      }
        const user = new User(
          this.doctorForm.value.fullName,
          this.doctorForm.value.password,
          this.doctorForm.value.email,
          this.doctorForm.value.age,
          new Address(this.doctorForm.value.city, this.doctorForm.value.street, this.doctorForm.value.building),
          this.doctorForm.value.gender,
          Role.doctor,
          // this.doctorForm.value.image
        );

        const doctor = new Doctors(user, this.doctorForm.value.specialization, this.doctorForm.value.price);

        this.doctorService.addDoctor(doctor).subscribe(result => {


            this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
            this.router.navigate(['/doctors']);

            this.dialog.open(AlertComponent, {
              width: '300px',
              data: 'Doctor Added Successfully'
            });

          })
      });

    }else{
      this.router.navigate(['notFound']);
    }

  }


}
