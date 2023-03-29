import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/Models/service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent {
  service: Service = new Service(0, '', 0, 0, 0);
  constructor(public serviceService: ServiceService,public activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.serviceService.getById(param['id']).subscribe(data => {
        console.log(data)
        this.service = data;
      })
    })
  }
  
}
