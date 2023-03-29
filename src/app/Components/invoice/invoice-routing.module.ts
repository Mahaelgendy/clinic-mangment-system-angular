import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

const routes: Routes = [
  // {path:'', component:InvoiceListComponent},
  {path:'' , component:InvoiceAddComponent},
  // {path:'' , component:InvoiceEditComponent},
  // {path:'edit/:id' , component:InvoiceEditComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
