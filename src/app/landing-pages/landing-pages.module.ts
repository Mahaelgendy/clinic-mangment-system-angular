import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPagesRoutingModule } from './landing-pages-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { EmployeeComponent } from './employee/employee.component';
import { PatientComponent } from './patient/patient.component';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [
    AdminComponent,
    DoctorComponent,
    EmployeeComponent,
    PatientComponent
  ],
  imports: [
    CommonModule,
    LandingPagesRoutingModule,
    RouterModule
  ]
})
export class LandingPagesModule { }
