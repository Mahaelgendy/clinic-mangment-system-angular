import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctors } from 'src/app/Models/doctors';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-doctor-about',
  templateUrl: './doctor-about.component.html',
  styleUrls: ['./doctor-about.component.css']
})
export class DoctorAboutComponent {

  doctor!:Doctors;

  id = 60;
  constructor(public doctorService:DoctorsService, public userServices:UserService, public activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(a=>{
      this.doctorService.getDoctorByID(a['id']).subscribe(data=>{
        console.log(this.doctor);
        this.doctor = data;
      });

    })
  }

}
