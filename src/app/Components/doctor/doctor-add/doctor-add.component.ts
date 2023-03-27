import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/Models/address';
import { Doctors } from 'src/app/Models/doctors';
import { Role } from 'src/app/Models/Enums';
import { User } from 'src/app/Models/user';
import { DoctorsService } from 'src/app/Services/doctors.service';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent {

  doctorForm:FormGroup;
  count:number;
  GenderObtion = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];


  constructor(public doctorService:DoctorsService, public router: Router){

    this.count = 0;
    this.doctorForm = new FormGroup({
      fullName: new FormControl('',[Validators.required, Validators.pattern(`${/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/}`)]  ),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(`${/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}`)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      age: new FormControl(null, Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]),
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

    if(this.doctorForm.valid){

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

      const doctor = new Doctors(user, this.doctorForm.value.specialization, this.doctorForm.value.price,this.doctorForm.value.phone,);
      this.doctorService.addDoctor(doctor).subscribe(result => {
          console.log("From subscribe");


          this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
          this.router.navigate(['/doctors']);
        })
      });

    }else{
      alert("Please check that all data is valid");
    }
  }

  // onFileSelected(event: any) {
  //   if (event.target.files && event.target.files.length) {
  //     const file = event.target.files[0].name;
  //     console.log(event.target.files[0]);
  //     if (file!=null) {
  //       console.log(event.target.files[0]);

  //       this.doctorForm.get('image')?.setValue(file);
  //       console.log(file);
  //     }
  //   }
  // }

}
