import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import {PatientDetailsComponent} from './patient-details/patient-details.component'
import {PatientProfileComponent} from '../patient-profile/patient-profile.component'
import {UpdatePatientComponent} from './update-patient/update-patient.component'
import{PatientAddComponent} from './patient-add/patient-add.component'
const routes: Routes = [
  {path:'', component: PatientListComponent },
  {path:'profile',component:PatientProfileComponent},
  {path:'details/:id', component: PatientDetailsComponent },
  {path:'update/:id', component: UpdatePatientComponent },
  {path:"add", component:PatientAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }

