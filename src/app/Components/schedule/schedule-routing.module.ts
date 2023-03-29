import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';

const routes: Routes = [
  {path:'',component:ScheduleListComponent},
  {path:'update/:id',component:ScheduleUpdateComponent},
  {path:'add',component:ScheduleAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
