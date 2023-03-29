import { Component } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicModels } from 'src/app/Models/clinic-models';
import { Doctors } from 'src/app/Models/doctors';
import { Service } from 'src/app/Models/service';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {
  services: Service[] = [];
  clinics: ClinicModels[] =[];
  doctors: Doctors[] = [];
  
  showModal = false;
  deleteModal = false;
  deletedId = 0;  

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

  editedService: Service = new Service(0, '', 0, this.defaultDoctor, this.defaultClinic);

  constructor(public serviceService: ServiceService,public clinicService:ClinicService ,
    public doctorService: DoctorsService, public router: Router, public builder: FormBuilder) { }
  
  ngOnInit() {
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

  //edit functions
  serviceForm = this.builder.group({
    _id:this.editedService._id,
    name:this.builder.control(this.editedService.name,[Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
    salary:this.builder.control(this.editedService.salary,[Validators.required]),
    doctor_id:this.builder.control(this.editedService.doctor_id,[Validators.required]),
    clinic_id:this.builder.control(this.editedService.clinic_id,[Validators.required]),

  });
  
  show(service : Service) {
    this.showModal=true
    console.log(this.editedService)
    this.editedService = service;
    console.log(service)
    console.log(this.editedService)

    this.serviceForm = this.builder.group({
      _id: [this.editedService._id],
      name: [this.editedService.name, [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      salary:[this.editedService.salary, [Validators.required]],
      doctor_id:[this.editedService.doctor_id, [Validators.required]],
      clinic_id:[this.editedService.clinic_id, [Validators.required]],
      })
  }

  save(formData:any) {

    if (this.serviceForm.errors) {
      return;
    }

   if (this.serviceForm.valid) {
      // console.log("**")
      // console.log(this.editedClinic)
      // console.log(RegisterForm.value)

      this.serviceService.edit(formData.value).subscribe(data => {
        //console.log(data);
        this.showModal = false;
        location.reload();

      });

    }
  }

  deleteDialog(id:number) {
    this.deletedId = id;
    this.deleteModal = true;
  }

  delete(id: number) {
      this.serviceService.deleteById(id).subscribe(data => {
        console.log(data);
        this.deleteModal = false;
        location.reload();

      })
   
  }



//   delete(id: number) {
//     if (confirm("Are you sure?")) {
//       this.serviceService.deleteById(id).subscribe(data => {
//         console.log(data);
//         this.router.navigateByUrl("/services")
//       })
//     }
//   }

  // save(service : Service) {
  //   this.serviceService.edit(service).subscribe(service => {
  //     console.log(service)
  //   })
  // }
  // show(service: Service) {
  //   console.log(service)
  //   this.editFlag = true;
  //   this.editedService = service;
  // }

}
