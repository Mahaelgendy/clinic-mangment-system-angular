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
  { path: '', component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'logout', component: LogOutComponent },
  // { path: "clinics", loadChildren: () => import("./Clinic/clinic.module").then(m => m.ClinicModule) },
  // {path:"services",loadChildren: () => import("./service/service.module").then(m => m.ServiceModule)}
  {path :"patients", loadChildren:() => import("./Components/patient/patient.module").then(m => m.PatientModule)},
  { path: "appointment", loadChildren: () => import("./appointment/appointment.module").then(m => m.AppointmentModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
