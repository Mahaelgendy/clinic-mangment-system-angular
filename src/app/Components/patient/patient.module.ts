import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientProfileComponent } from '../patient-profile/patient-profile.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { PatientAddComponent } from './patient-add/patient-add.component'

@NgModule({
  declarations: [
    PatientDetailsComponent,
    PatientProfileComponent,
    UpdatePatientComponent,
    PatientAddComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
