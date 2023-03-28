import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientProfileComponent } from '../patient-profile/patient-profile.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { PatientAddComponent } from './patient-add/patient-add.component'
import {MaterialModule} from 'src/material.module';
import { AlertComponent } from './alert/alert.component';
import { PaienttSidebarComponent } from './paientt-sidebar/paientt-sidebar.component'
@NgModule({
  declarations: [
    PatientDetailsComponent,
    PatientProfileComponent,
    UpdatePatientComponent,
    PatientAddComponent,
    AlertComponent,
    PaienttSidebarComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PatientModule { }
