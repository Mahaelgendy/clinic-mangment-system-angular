// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Service } from 'src/app/Models/service';
// import { ServiceService } from 'src/app/Services/service.service';

// @Component({
//   selector: 'app-service-list',
//   templateUrl: './service-list.component.html',
//   styleUrls: ['./service-list.component.css']
// })
// export class ServiceListComponent {
//   services: Service[] = [];

//   editFlag = false;
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

//   editedService: Service = new Service(0, '', 0, this.defaultDoctor, this.defaultClinic);

//   constructor(public serviceService: ServiceService,public router:Router) { }
//   ngOnInit() {
//     this.serviceService.getAll().subscribe(data => {
//       this.services = data;
//     })
//   }

//   delete(id: number) {
//     if (confirm("Are you sure?")) {
//       this.serviceService.deleteById(id).subscribe(data => {
//         console.log(data);
//         this.router.navigateByUrl("/services")
//       })
//     }
//   }

//   save(service : Service) {
//     this.serviceService.edit(service).subscribe(service => {
//       console.log(service)
//     })
//   }
//   show(service: Service) {
//     console.log(service)
//     this.editFlag = true;
//     this.editedService = service;
//   }
// }
