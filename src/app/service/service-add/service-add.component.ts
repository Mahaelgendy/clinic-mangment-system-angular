// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Service } from 'src/app/Models/service';
// import { ServiceService } from 'src/app/Services/service.service';

// @Component({
//   selector: 'app-service-add',
//   templateUrl: './service-add.component.html',
//   styleUrls: ['./service-add.component.css']
// })
// export class ServiceAddComponent {
//   defaultDoctor = {
//     _id: 0,
//     userData: {
//       fullName:""
//     }
//   }

//   defaultClinic = {
//     _id: 0,
//     clinicName:''
//   }

//   service: Service = new Service(0, '', 0, 0, 0);
//   constructor(public serviceService: ServiceService,public router:Router) {
//   }
//   save() {
//     this.serviceService.add(this.service).subscribe(data => {
//       console.log(data);
//       this.router.navigateByUrl("/services");
//     })
//   }
// }
