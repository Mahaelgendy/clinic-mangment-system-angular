import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { EmployeeComponent } from './employee/employee.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {path:"/adminPage",component:AdminComponent},
  {path:"/doctorPage",component:DoctorComponent},
  {path:"/patientPage",component:PatientComponent},
  {path:"/employeePage",component:EmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPagesRoutingModule { }
