import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';
import { ShceduleListComponent } from './shcedule-list/shcedule-list.component';

const routes: Routes = [
  {path:"", component: ShceduleListComponent},
  {path:"add", component:ScheduleAddComponent},
  {path:"update/:id" , component:ScheduleUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShceduleRoutingModule { }
