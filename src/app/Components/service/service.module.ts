import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceAddComponent } from './service-add/service-add.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { EditServiceComponent } from './edit-service/edit-service.component';


@NgModule({
  declarations: [
    ServiceListComponent,
     ServiceAddComponent,
     ServiceDetailsComponent,
     EditServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ServiceModule { }
