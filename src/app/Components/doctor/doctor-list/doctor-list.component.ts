import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctors } from 'src/app/Models/doctors';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { UserService } from 'src/app/Services/user.service';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';


@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {

  displayedColumns: string[] = ['FullName', 'Email', 'Age', 'Address','Specialization','Price','action'];
  doctors:Doctors[]=[];


  constructor(
    public userService:UserService,
    public doctorService:DoctorsService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public dialog: MatDialog){
    }

  ngOnInit(){
    
    if(sessionStorage.getItem('role')== 'admin'){
      this.doctorService.getAllDoctors().subscribe(
        (response) => {
          this.doctors = response;
          console.log('Added appointment:', response);
        },
        (error) => {
          console.error('Error adding appointment:', error);
        }
      );
    }
    else{
      this.router.navigate(['notFound']);
    }
  }



  alertToDelte(id:number|undefined){
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this doctor?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activatedRoute.params.subscribe(data=>{
          this.doctorService.deleteDoctorByID(id??-1).subscribe(res=>{
            this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
              this.router.navigate(['/doctors']);
            })
          })
        })
      }
    });
  }

}
