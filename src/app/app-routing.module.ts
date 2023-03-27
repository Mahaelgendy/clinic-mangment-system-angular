import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogOutComponent } from './Components/log-out/log-out.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { HomeComponent } from './Core/home/home.component';
import { AuthGuard } from './Guards/auth.guard';
import { MatCardModule } from '@angular/material/card';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "appointment", loadChildren: () => import("./appointment/appointment.module").then(m => m.AppointmentModule) },
  { path:'doctors', loadChildren:()=>import("./Components/doctor/doctor.module").then(a=>a.DoctorModule)},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'logout', component: LogOutComponent },
  { path: '**', component: NotFoundComponent },
  // { path: "clinics", loadChildren: () => import("./Clinic/clinic.module").then(m => m.ClinicModule) },
  // {path:"services",loadChildren: () => import("./service/service.module").then(m => m.ServiceModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
