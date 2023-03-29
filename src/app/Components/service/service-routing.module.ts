import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceAddComponent } from './service-add/service-add.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { EditServiceComponent } from './edit-service/edit-service.component';


const routes: Routes = [
  { path: "", component: ServiceListComponent },
   { path: "add", component: ServiceAddComponent },
  { path: "details/:id", component: ServiceDetailsComponent },
  {path:"edit/:id",component:EditServiceComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
