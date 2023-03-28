import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeAddComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    EmployeeUpdateComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
