import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentDeleteComponent } from './appointment-delete/appointment-delete.component';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentAddComponent,
    AppointmentDeleteComponent,
    AppointmentUpdateComponent,
    AppointmentDetailsComponent,
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppointmentModule { }
