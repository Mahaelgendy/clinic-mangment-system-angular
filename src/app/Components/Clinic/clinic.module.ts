import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router'

import { ClinicRoutingModule } from './clinic-routing.module';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import {ClinicListComponent } from './clinic-list/clinic-list.component';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';


@NgModule({
  declarations: [
    ClinicDetailsComponent,
     AddClinicComponent,
    ClinicListComponent,
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ClinicModule { }
