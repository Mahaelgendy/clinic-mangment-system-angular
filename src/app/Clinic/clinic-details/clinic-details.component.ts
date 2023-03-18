// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ClinicModels } from 'src/app/Models/clinic-models';
// import { ClinicService } from 'src/app/Services/clinic.service';

// @Component({
//   selector: 'app-clinic-details',
//   templateUrl: './clinic-details.component.html',
//   styleUrls: ['./clinic-details.component.css']
// })
// export class ClinicDetailsComponent {
//   defaultLocation = { 
//     city: '', 
//     street: '',
//     building:0
//    };
  
//   clinic: ClinicModels = new ClinicModels(0, '', this.defaultLocation);
//   constructor(public clinicService: ClinicService , public activatedRoute:ActivatedRoute) {
     
//   }
//    ngOnInit() {
//     this.activatedRoute.params.subscribe(param => {
//       console.log(param)
//       this.clinicService.getById(param['id']).subscribe(data => {
//         console.log(data);
//         this.clinic = data;
//         console.log(this.clinic);
//       })
//     })
//   }
// }
