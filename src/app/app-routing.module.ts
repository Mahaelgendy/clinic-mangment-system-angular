import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogOutComponent } from './Components/log-out/log-out.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { HomeComponent } from './Core/home/home.component';
import {PatientModule} from './Components/patient/patient.module';
import { AuthGuard } from './Guards/auth.guard';
import { MatCardModule } from '@angular/material/card';
import { AdminComponent } from './landing-pages/admin/admin.component';
import { EmployeeComponent } from './landing-pages/employee/employee.component';
import { PatientComponent } from './landing-pages/patient/patient.component';
import { DoctorComponent } from './landing-pages/doctor/doctor.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full", },
  { path: 'adminPage', component: AdminComponent, pathMatch: "full", },
  { path: 'employeePage', component: EmployeeComponent, pathMatch: "full", },
  { path: 'patientPage', component: PatientComponent, pathMatch: "full", },
  { path: 'doctorPage', component: DoctorComponent, pathMatch: "full", },
  { path: "appointment", loadChildren: () => import("./Components/appointment/appointment.module").then(m => m.AppointmentModule),canActivate:[AuthGuard] },
  { path: "medicine", loadChildren: () => import("./Components/medicin/medicin.module").then(m => m.MedicinModule),canActivate:[AuthGuard] },
  { path:'doctors', loadChildren:()=>import("./Components/doctor/doctor.module").then(a=>a.DoctorModule),canActivate:[AuthGuard]},
  { path:'invoice', loadChildren:()=>import("./Components/invoice/invoice.module").then(a=>a.InvoiceModule),canActivate:[AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'logout', component: LogOutComponent },
  { path: "clinics", loadChildren: () => import("./Components/Clinic/clinic.module").then(m => m.ClinicModule),canActivate:[AuthGuard] },
   {path:"services",loadChildren: () => import("./Components/service/service.module").then(m => m.ServiceModule),canActivate:[AuthGuard]},

  {path :"patients", loadChildren:() => import("./Components/patient/patient.module").then(m => m.PatientModule),canActivate:[AuthGuard]},

  { path:"employees",loadChildren:()=> import("./Components/employee/employee.module").then(m=>m.EmployeeModule),canActivate:[AuthGuard]},
  {path : "prescriptions", loadChildren:() => import("./Components/prescription/prescription.module").then(m =>m.PrescriptionModule),canActivate:[AuthGuard]},
  {path:'schedules',loadChildren:()=>import("./Components/schedule/schedule.module").then(m=>m.ScheduleModule),canActivate:[AuthGuard]},
  {path : "prescriptions", loadChildren:() => import("./Components/prescription/prescription.module").then(m =>m.PrescriptionModule),canActivate:[AuthGuard]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
