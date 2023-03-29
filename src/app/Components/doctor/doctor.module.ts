import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorAboutComponent } from './doctor-about/doctor-about.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorSidebarComponent } from './doctor-sidebar/doctor-sidebar.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    DoctorAboutComponent,
    DoctorAddComponent,
    DoctorListComponent,
    DoctorHomeComponent,
    DoctorEditComponent,
    DoctorSidebarComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorRoutingModule
  ],
  exports:[
    DoctorAboutComponent,
    DoctorAddComponent,
    DoctorListComponent,
    DoctorHomeComponent,
    DoctorEditComponent
  ]
})
export class DoctorModule { }
