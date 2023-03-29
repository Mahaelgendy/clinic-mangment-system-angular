import { Component } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ClinicModels } from 'src/app/Models/clinic-models';
import { Doctors } from 'src/app/Models/doctors';
import { Service } from 'src/app/Models/service';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent {
  defaultDoctor = {
    _id: 0,
    userData: {
      fullName:""
    }
  }

  defaultClinic = {
    _id: 0,
    clinicName:''
    }
    
    clinics: ClinicModels[] =[];
    doctors : Doctors[] =[];

  service: Service = new Service(0, '', 0, 0, 0);
  constructor(public serviceService: ServiceService,public router:Router,public builder:FormBuilder,public clinicService:ClinicService ,
    public doctorService: DoctorsService) {
    }

    ngOnInit(){
        this.clinicService.getAll().subscribe(data=>{
          this.clinics = data;
        });
        
        this.doctorService.getAllDoctors().subscribe(data=>{
          this.doctors = data;
        })
      }


    serviceForm = this.builder.group({
        _id:0,
        name:this.builder.control('',[Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
        salary:this.builder.control('',[Validators.required]),
        doctor_id:this.builder.control('',[Validators.required]),
        clinic_id:this.builder.control('',[Validators.required]),

    });


    save(formData:any) {
        if (this.serviceForm.errors) {
            return;
          }
        
          if (this.serviceForm.valid) {
            
            this.serviceService.add(formData.value).subscribe(data => {
              console.log(data);
              this.router.navigateByUrl("/services");
            });
          
          } 
    }


 
//   save() {
//     this.serviceService.add(this.service).subscribe(data => {
//       console.log(data);
//       this.router.navigateByUrl("/services");
//     })
//     }
    


}
