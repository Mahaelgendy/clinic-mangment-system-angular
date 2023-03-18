import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicModels } from 'src/app/Models/clinic-models';
import {ClinicService } from 'src/app/Services/clinic.service';
@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent {

  clinics: ClinicModels[] = [];
  defaultLocation = { 
    city: 'Unknown City', 
     street: 'Unknown street',
     building:0
  };
  
  editedClinic: ClinicModels = new ClinicModels(0, '', this.defaultLocation);
  editFlag = false;

  constructor(public clinicService: ClinicService,public router:Router) {
    
  }

  ngOnInit() {
    this.clinicService.getAll().subscribe(data => {
      this.clinics = data;
    })
  }

  delete(id: number) {
    if (confirm("Are you sure?")) {
      this.clinicService.deleteById(id).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl("/clinics")
      })
    }
  }

  save(clinic : ClinicModels) {
    this.clinicService.edit(clinic).subscribe(clinic => {
      console.log(clinic)
    })
  }
  show(clinic : ClinicModels) {
    this.editFlag = true;
    this.editedClinic = clinic;
  }
}
