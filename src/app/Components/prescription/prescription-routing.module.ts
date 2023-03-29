import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionAddComponent } from './prescription-add/prescription-add.component';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionUpdateComponent } from './prescription-update/prescription-update.component';

const routes: Routes = [
  {path :"" , component: PrescriptionListComponent},
  {path:"details/:id", component:PrescriptionDetailsComponent},
  {path:"add" , component:PrescriptionAddComponent},
  {path:"update/:id", component:PrescriptionUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule { }
