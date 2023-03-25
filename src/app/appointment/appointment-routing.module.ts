import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentDeleteComponent } from './appointment-delete/appointment-delete.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';

const routes: Routes = 
[
  {path:"",component:AppointmentListComponent,children:[
    {path:"deleteAppointment/:id", component:AppointmentDeleteComponent},
  ]},
  {path:"addAppointment",component:AppointmentAddComponent},
  {path:"edit/:id",component:AppointmentUpdateComponent},
  {path:"detailsAppointment/:id",component:AppointmentDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
