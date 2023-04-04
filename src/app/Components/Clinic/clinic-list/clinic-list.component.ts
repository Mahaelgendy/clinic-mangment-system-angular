import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicModels } from 'src/app/Models/clinic-models';
import { ClinicService } from 'src/app/Services/clinic.service';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent {
  showModal= false;
  clinics: ClinicModels[] = [];
  defaultLocation = {
    city: '',
     street: '',
     building:0
  };

  editedClinic: ClinicModels = new ClinicModels(0, '', this.defaultLocation);
  deletedId = 0;
  deleteModal = false;
  constructor(public clinicService: ClinicService,public router:Router,public builder:FormBuilder) {

  }

  ngOnInit() {
    if(sessionStorage.getItem('role')== 'admin'){
      this.clinicService.getAll().subscribe(data => {
        this.clinics = data;
      })
    }
    else{
      this.router.navigate(['notFound']);
    }

  }

  registerForm = this.builder.group({
    _id:this.editedClinic._id,
    clinicName:this.builder.control(this.editedClinic.clinicName,[Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
      clinic_location:this.builder.group({
        city:[this.editedClinic.clinic_location.city,Validators.required],
        street:[this.editedClinic.clinic_location.street,Validators.required ],
        building:[this.editedClinic.clinic_location.building, [Validators.required, Validators.min(1), Validators.max(100)]]
      })
  });

  show(clinic : ClinicModels) {
    this.showModal=true
    console.log(this.editedClinic)
    this.editedClinic = clinic;
    console.log(clinic)
    console.log(this.editedClinic)

    this.registerForm = this.builder.group({
      _id: [this.editedClinic._id],
      clinicName: [this.editedClinic.clinicName, [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      clinic_location: this.builder.group({
          city: [this.editedClinic.clinic_location.city, Validators.required],
          street: [this.editedClinic.clinic_location.street, Validators.required],
          building: [this.editedClinic.clinic_location.building, [Validators.required, Validators.min(1), Validators.max(100)]]
      })
  })

  }

  save(RegisterForm:any) {

    if (this.registerForm.errors) {
      return;
    }

   if (this.registerForm.valid) {
      if(sessionStorage.getItem('role')== 'admin'){
        this.clinicService.edit(RegisterForm.value).subscribe(data => {
          this.showModal = false;
          location.reload();
        });
      }
      else{
        this.router.navigate(['notFound']);
      }
    }
  }

  deleteDialog(id:number) {
    this.deletedId = id;
    this.deleteModal = true;
  }

  delete(id: number) {
    if(sessionStorage.getItem('role')== 'admin'){
      this.clinicService.deleteById(id).subscribe(data => {
        console.log(data);
        this.deleteModal = false;
        location.reload();
      })
    }
    else{
      this.router.navigate(['notFound']);
    }
  }
 

}

  

// save(clinic : ClinicModels) {
  //   this.clinicService.edit(clinic).subscribe(clinic => {
  //     console.log(clinic)
  //   })
  // }