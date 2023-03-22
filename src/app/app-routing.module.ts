import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: "clinics", loadChildren: () => import("./Clinic/clinic.module").then(m => m.ClinicModule) },
  // {path:"services",loadChildren: () => import("./service/service.module").then(m => m.ServiceModule)}




  {path:"appointment",loadChildren: () => import("./appointment/appointment.module").then(m => m.AppointmentModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
