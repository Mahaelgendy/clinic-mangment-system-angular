import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {

  public employeeId: number =-1;
  employeeFullData? : Employee;
  employeeData?: Employee;
  constructor (public employeeService:EmployeeService,
              public activatedRoute:ActivatedRoute){
                // this.activatedRoute.params.subscribe((params:Params)=>{
                //   this.employeeId= params ['id'];
                // });
                
              }

  ngOnInit(){
    this.employeeService.getEmployeeByUserId(Object(sessionStorage.getItem('id'))).subscribe(employee=>{
      if(employee !=null && employee.employeeData!=null){
        this.employeeFullData= employee;
      }
    })
  }
}