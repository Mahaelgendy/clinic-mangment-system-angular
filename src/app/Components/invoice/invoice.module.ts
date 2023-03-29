import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    InvoiceAddComponent,
    InvoiceListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InvoiceAddComponent,
    InvoiceListComponent,
  ]
})
export class InvoiceModule { }
