import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/Models/address';
import { Doctors } from 'src/app/Models/doctors';
import { Role } from 'src/app/Models/Enums';
import { User } from 'src/app/Models/user';
import { DoctorsService } from 'src/app/Services/doctors.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent {

  doctorForm!:FormGroup;

  doctor!:Doctors;
  doctorId?:number;

  GenderObtion = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];


  constructor(public doctorService:DoctorsService, public router: Router, private activatedRoute:ActivatedRoute)
  {
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
      role: new FormControl(Role.doctor)
    });
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((a)=>{
      this.doctorId = a['id'];
      this.doctorService.getDoctorByID(a['id']).subscribe(data=>{
        this.doctor = data;

        this.doctorForm.setValue({
          fullName: data.userData?.fullName || '',
          email: data.userData?.email || '',
          password: data.userData?.password || '',
          age: data.userData?.age || '',
          city: data.userData?.address?.city || '',
          street: data.userData?.address?.street || '',
          building: data.userData?.address?.building || '',
          specialization: data.specialization || '',
          price: data.price || '',
          gender: data.userData?.gender || '',
          role: Role.doctor,
        });

      })
    })
  }
  genders =["Female" , "Male"];


  onSubmit(){


    if(this.doctorId!=undefined){

      this.doctorForm.markAllAsTouched();
      if(this.doctorForm.errors){
        return;
      }

      console.log("this.doctorForm.value");
      console.log(this.doctorForm.value);

      const user = new User(
        this.doctorForm.value.fullName,
        this.doctorForm.value.password,
        this.doctorForm.value.email,
        this.doctorForm.value.age,
        new Address(this.doctorForm.value.city, this.doctorForm.value.street, this.doctorForm.value.building),
        this.doctorForm.value.gender,
        Role.doctor,
      );

      const doctor = new Doctors(user, this.doctorForm.value.specialization, this.doctorForm.value.price, this.doctorForm.value.phone);
      this.doctorService.updateDoctor(this.doctorId,doctor).subscribe(result => {
          console.log("Doctor from subscribe");
          console.log(result);
          this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
          this.router.navigate(['/doctors']);

          

        })
      });
    }


  }

}
