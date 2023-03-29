import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicinAddComponent } from './medicin-add/medicin-add.component';
import { MedicinDetailsComponent } from './medicin-details/medicin-details.component';
import { MedicinListComponent } from './medicin-list/medicin-list.component';
import { MedicinUpdateComponent } from './medicin-update/medicin-update.component';

const routes: Routes = [
  {path:"",component:MedicinListComponent},
  {path:"add",component:MedicinAddComponent},
  {path:"edit/:id",component:MedicinUpdateComponent},
  {path:"details/:id",component:MedicinDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinRoutingModule { }
