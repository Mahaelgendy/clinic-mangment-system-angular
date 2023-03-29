import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Patients } from 'src/app/Models/patients';
import { PatientsService } from 'src/app/Services/patients.service';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent  {
  public Allpatients!:Patients[];
  displayedColumns: string[] = [ "Name" , "Status", "History","Phone","Details","Update" , "Delete"];
  clickedRows = new Set<Patients>();
  constructor(public patientService:PatientsService ,
    private router: Router , 
    public activatedRoute:ActivatedRoute,
    public dialog: MatDialog ){
  }
  ngOnChanges(): void {

  }
  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(patient =>
      {
        this.Allpatients = patient;
      });
  }
  showPatientDetails(patientId: number |undefined) {
    this.router.navigate(['/patients/details', patientId]);
  }

  UpdatePatientData(patientId : number |undefined){
    if(patientId != undefined){
      this.router.navigate(['/patients/update', patientId]);
    }else{
      this.router.navigate(['/']);
    }
  }

  DeletePatient(id:number|undefined){
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this patoent?'
    });
    dialogRef.afterClosed().subscribe (result => {
      if(result){
        this.activatedRoute.params.subscribe(data=>{
          this.patientService.deletePatientByID(id).subscribe(res=>{
            this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
              this.router.navigate(['/patients']);
            })
          })
        })
      }

    })
  }
  
}
