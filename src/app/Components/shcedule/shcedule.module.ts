import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShceduleRoutingModule } from './shcedule-routing.module';
import { ShceduleListComponent } from './shcedule-list/shcedule-list.component';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';


@NgModule({
  declarations: [
    ShceduleListComponent,
    ScheduleAddComponent,
    ScheduleUpdateComponent
  ],
  imports: [
    CommonModule,
    ShceduleRoutingModule
  ]
})
export class ShceduleModule { }
