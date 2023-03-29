import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/Models/invoice';
import { InvoiceService } from 'src/app/Services/invoice.service';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {
  invoice!:Invoice[];

  constructor(
    public invoiceService:InvoiceService,
    public activatedRoute:ActivatedRoute,
    public router:Router,
    public dialog: MatDialog
    ){}

  ngOnInit(){
    this.invoiceService.getAllInvoices().subscribe(data=>{
      console.log(data[0]);
      this.invoice = data;
    })
  }

  alertToDelte(id:number|undefined){
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this Invoice?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activatedRoute.params.subscribe(data=>{
          this.invoiceService.deleteInvoiceById(id??-1).subscribe(res=>{
            this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
              this.router.navigate(['/invoice']);
            })
          })
        })
      }
    });
  }


}
