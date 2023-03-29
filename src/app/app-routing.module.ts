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


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full", },
  { path: "appointment", loadChildren: () => import("./Components/appointment/appointment.module").then(m => m.AppointmentModule) },
  { path: "medicine", loadChildren: () => import("./Components/medicin/medicin.module").then(m => m.MedicinModule) },
  { path:'doctors', loadChildren:()=>import("./Components/doctor/doctor.module").then(a=>a.DoctorModule),canActivate:[AuthGuard]},
  { path:'invoice', loadChildren:()=>import("./Components/invoice/invoice.module").then(a=>a.InvoiceModule)},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'logout', component: LogOutComponent },
  { path: "clinics", loadChildren: () => import("./Components/Clinic/clinic.module").then(m => m.ClinicModule) },
   {path:"services",loadChildren: () => import("./Components/service/service.module").then(m => m.ServiceModule)},

  {path :"patients", loadChildren:() => import("./Components/patient/patient.module").then(m => m.PatientModule)},
  //{ path: "appointment", loadChildren: () => import("./Components/appointment/appointment.module").then(m => m.AppointmentModule) },
  //{ path:"employees",loadChildren:()=> import("./Components/employee/employee.module").then(m=>m.EmployeeModule)},
  //{path : "prescriptions", loadChildren:() => import("./Components/prescription/prescription.module").then(m =>m.PrescriptionModule)},
  {path:'schedule', loadChildren:() => import("./Components/shcedule/shcedule-routing.module").then(c => c.ShceduleRoutingModule)},
  { path:"employees",loadChildren:()=> import("./Components/employee/employee.module").then(m=>m.EmployeeModule),canActivate:[AuthGuard]},
  {path : "prescriptions", loadChildren:() => import("./Components/prescription/prescription.module").then(m =>m.PrescriptionModule)},
  //{path:'schedule', loadChildren:() => import("./Components/shcedule/shcedule-routing.module").then(c => c.ShceduleRoutingModule)},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
