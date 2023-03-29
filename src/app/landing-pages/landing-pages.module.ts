import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPagesRoutingModule } from './landing-pages-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { EmployeeComponent } from './employee/employee.component';
import { PatientComponent } from './patient/patient.component';


@NgModule({
  declarations: [
    AdminComponent,
    DoctorComponent,
    EmployeeComponent,
    PatientComponent
  ],
  imports: [
    CommonModule,
    LandingPagesRoutingModule
  ]
})
export class LandingPagesModule { }
