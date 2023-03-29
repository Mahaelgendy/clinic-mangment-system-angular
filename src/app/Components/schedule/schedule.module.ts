import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';


@NgModule({
  declarations: [
    ScheduleListComponent,
    ScheduleUpdateComponent,
    ScheduleAddComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ScheduleModule { }
