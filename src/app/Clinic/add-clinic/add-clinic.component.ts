import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicModels } from 'src/app/Models/clinic-models';
import { ClinicService } from 'src/app/Services/clinic.service';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css']
})
export class AddClinicComponent {

   defaultLocation = { 
    city: 'Unknown City', 
     street: 'Unknown street',
     building:0
   };
  
  clinic: ClinicModels = new ClinicModels(0, '', this.defaultLocation)
  
  constructor(public clinicService:ClinicService,public router:Router) {}
  
  save() {
    this.clinicService.add(this.clinic).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl("/clinics")
    })
  }
}
