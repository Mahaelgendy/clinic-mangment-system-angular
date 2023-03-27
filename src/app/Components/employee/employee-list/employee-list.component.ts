import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees:Employee []=[];
  constructor(public employeeService:EmployeeService,private router:Router, public activatedRouter:ActivatedRoute )
  {

  }
  ngOnInit()
  {
    this.employeeService.getAllEmployees().subscribe(employeesData=>{
      this.employees= employeesData;
      console.log(employeesData);
    })
  }

}
