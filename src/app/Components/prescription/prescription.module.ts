import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrescriptionRoutingModule } from './prescription-routing.module';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import {MaterialModule } from 'src/material.module';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details.component';
import { PrescriptionAddComponent } from './prescription-add/prescription-add.component';
import { PrescriptionUpdateComponent } from './prescription-update/prescription-update.component'

@NgModule({
  declarations: [
    PrescriptionListComponent,
    PrescriptionDetailsComponent,
    PrescriptionAddComponent,
    PrescriptionUpdateComponent, 
  ],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PrescriptionModule { }
