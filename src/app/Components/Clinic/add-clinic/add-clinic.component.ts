import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators} from '@angular/forms'

import { ClinicModels } from 'src/app/Models/clinic-models';
import { ClinicService } from 'src/app/Services/clinic.service';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css']
})
export class AddClinicComponent {


  
  constructor(public builder:FormBuilder, public clinicService:ClinicService,public router:Router) {}
  
  registerForm = this.builder.group({
    _id:0,
      clinicName:this.builder.control('',[Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
      clinic_location:this.builder.group({
        city:['',Validators.required],
        street:['',Validators.required ],
        building:[0, [Validators.required, Validators.min(1), Validators.max(100)]]
      })
  });
    
  save(RegisterForm:any) {
    
    if (this.registerForm.errors) {
      return;
    }
  
    if (this.registerForm.valid) {
      if(sessionStorage.getItem('role')== 'admin'){
        this.clinicService.add(RegisterForm.value).subscribe(data => {
          console.log(data);
          this.router.navigateByUrl("/clinics");
        });
      }
      else{
        this.router.navigate(['notFound']);
      }

    
    } 
  }
    //  defaultLocation = { 
  //   city:'', 
  //    street:'',
  //    building:0
  //  };
  
  // clinic: ClinicModels = new ClinicModels(0,'', this.defaultLocation)
    
  //   save() {
  //       console.log(this.clinic);

  //     this.clinicService.add(this.clinic).subscribe(data => {

  //     console.log(data);
  //     this.router.navigateByUrl("/clinics")
  //   })
  // }
}
