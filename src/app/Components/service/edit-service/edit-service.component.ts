import { Component } from '@angular/core';
import { Validators,FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicModels } from 'src/app/Models/clinic-models';
import { Doctors } from 'src/app/Models/doctors';
import { Service } from 'src/app/Models/service';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { ServiceService } from 'src/app/Services/service.service';


@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent {

  serviceData: any;
  editForm: FormGroup = new FormGroup({});

  services: Service[] = [];
  clinics: ClinicModels[] =[];
  doctors: Doctors[] = [];
  
  constructor(public serviceService: ServiceService,public clinicService:ClinicService ,
    public doctorService: DoctorsService, public router: Router, public builder: FormBuilder, public activatedRoute: ActivatedRoute) { 
      this.editForm = this.builder.group({
        _id:0,
        name:this.builder.control('',[Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
        salary:this.builder.control(0,[Validators.required]),
        doctor_id:this.builder.control(0,[Validators.required]),
        clinic_id:this.builder.control(0,[Validators.required])
    
      });
    }
  
  ngOnInit() {
      
    this.activatedRoute.params.subscribe(param => {
      this.serviceService.getById(param['id']).subscribe(data => {
        console.log(data)
        this.serviceData = data;
        console.log(this.serviceData)

        this.editForm.patchValue({
          _id: this.serviceData?._id,
          name: this.serviceData?.name,
          salary: this.serviceData?.salary,
          doctor_id: this.serviceData?.doctor_id,
          clinic_id: this.serviceData?.clinic_id
        });
      

      })
    })

    
      this.serviceService.getAll().subscribe(data => {
        this.services = data;
      })
  
      this.clinicService.getAll().subscribe(data=>{
        this.clinics = data;
      });
      
      this.doctorService.getAllDoctors().subscribe(data=>{
        this.doctors = data;
      })
      
    }

  
  save(formData: any) {
     
    if (this.editForm.errors) {
      return;
    }

   if (this.editForm.valid) {
  
      this.serviceService.edit(formData.value).subscribe(data => {
        
        this.router.navigateByUrl("/services");

      });

    }
  }

}
