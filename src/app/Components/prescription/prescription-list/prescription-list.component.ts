import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Prescription } from 'src/app/Models/prescription';
import { PrescriptionService } from 'src/app/Services/prescription.service';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';
import { PrescriptionDetailsComponent } from '../prescription-details/prescription-details.component';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent 
{
  title:string ="All Prescriptions";
  displayedColumns: string[] = ['doctorName', 'patientName', 'ExaminationDate', 'prescription'];
  public allPescriptions: Prescription[] =[];
  clickedRows = new Set<Prescription>();
  prescriptionId?:number;
  constructor(private prescriptionService : PrescriptionService,
      public dialog: MatDialog,
      private router: Router,
      private activatedRoute:ActivatedRoute){

  }
  ngOnInit(){
   this.prescriptionService.getAllPrescription().subscribe((item)=>{
      for(let i =0 ;i < item.length;i++){
          this.allPescriptions.push(item[i])
      }

      }) 
  }
  ShowPrescription(presId: number |undefined){
    if(presId != undefined){
      this.router.navigate(['/prescriptions/details', presId]);
    }
  }
  updatePrescription(presId: number |undefined){
    if(presId != undefined){
      this.router.navigate(['/prescriptions/update', presId]);
    }
  }

  deletePrescription(presId:number ){
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this prescription?'
    });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.activatedRoute.params.subscribe(data=>{
            this.prescriptionService.deletePrescriptionByID(presId).subscribe(res=>{
              this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
                this.router.navigate(['/prescriptions']);
              })
            })
          })
        }
        
      })
  }
  AddPrescription(){
    
  }

}
