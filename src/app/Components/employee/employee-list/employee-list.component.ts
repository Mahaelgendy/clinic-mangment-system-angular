import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees:Employee []=[];
  deleteId:Number=0;
  deleteModel:boolean=false;
  role : string| null;
  isEmployeeOrAdmin: boolean=false;
  constructor(public employeeService:EmployeeService,private router:Router, public activatedRouter:ActivatedRoute,public dialog:MatDialog)
  {
    this.role = sessionStorage.getItem('role');
  }
  ngOnInit()
  {
    if(sessionStorage.getItem('role')== 'admin' || sessionStorage.getItem('role')== 'employee'){
      this.isEmployeeOrAdmin=true;
      this.employeeService.getAllEmployees().subscribe(employeesData=>{
        this.employees= employeesData;
      })
    }
    else{
      this.router.navigate(['notFound']);
    }
  }
  deleteDialog(id:any)
  {
     const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent,{
      width:'400px',
      data:'Are you sure?'
     });
     dialogRef.afterClosed().subscribe(result=>{
      if(result)
      {
        this.activatedRouter.params.subscribe(data=>{

          if(sessionStorage.getItem('role')== 'admin' || sessionStorage.getItem('role')== 'employee'){
            this.employeeService.deleteById(id).subscribe(res=>{
              this.router.navigate(['./'],{skipLocationChange:true}).then(()=>{
                this.router.navigate(['/employees']);
              })
            })
          }
          else{
            this.router.navigate(['notFound']);
          }
        })
      }
     })
  }


}
