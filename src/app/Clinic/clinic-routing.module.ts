import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';
import { ClinicListComponent } from './clinic-list/clinic-list.component';

const routes: Routes = [
  { path: "", component: ClinicListComponent },
  { path: "add", component: AddClinicComponent },
  { path: "details/:id", component: ClinicDetailsComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
