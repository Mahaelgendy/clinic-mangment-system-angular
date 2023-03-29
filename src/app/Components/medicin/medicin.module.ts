import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicinRoutingModule } from './medicin-routing.module';
import { MedicinListComponent } from './medicin-list/medicin-list.component';
import { MedicinAddComponent } from './medicin-add/medicin-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicinUpdateComponent } from './medicin-update/medicin-update.component';


@NgModule({
  declarations: [
    MedicinListComponent,
    MedicinAddComponent,
    MedicinUpdateComponent
  ],
  imports: [
    CommonModule,
    MedicinRoutingModule,
    ReactiveFormsModule
  ]
})
export class MedicinModule { }
