import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: "clinics", loadChildren: () => import("./Clinic/clinic.module").then(m => m.ClinicModule) },
  // {path:"services",loadChildren: () => import("./service/service.module").then(m => m.ServiceModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
