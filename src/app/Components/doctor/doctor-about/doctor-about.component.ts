import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(public doctorService:DoctorsService, public userServices:UserService, public activatedRoute:ActivatedRoute , public router:Router){}
  ngOnInit(): void {

    if(sessionStorage.getItem('role')== 'doctor'){
      this.activatedRoute.params.subscribe(a=>{
        this.doctorService.getDoctorByID(a['id']).subscribe(data=>{
          console.log(this.doctor);
          this.doctor = data;
        });
      });
      
    }else{
      this.router.navigate(['notFound']);
    }

  }

}
