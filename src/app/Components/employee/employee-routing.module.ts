import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';

const routes: Routes = [
  {path:'',component:EmployeeListComponent},
  {path:':id',component:EmployeeDetailsComponent},
  {path:'update/:id',component:EmployeeUpdateComponent},
  {path:'addEmployee',component:EmployeeAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }