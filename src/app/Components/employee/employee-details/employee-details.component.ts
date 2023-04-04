import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import {Location} from '@angular/common'
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {

  currentId:number;
  emp:Employee|null=null;

  constructor(private activatedRoute:ActivatedRoute,
  private location:Location,
  private employeeService:EmployeeService,
  private router:Router){ 
    this.currentId=0;
    this.activatedRoute.params.subscribe((params:Params)=>
    {
      this.currentId=params['id'];
    })
    
  }
  ngOnInit()
  {
    this.activatedRoute.params.subscribe((params:Params)=>
    {
      this.currentId=params['id'];
    })
    if(sessionStorage.getItem('role')== 'admin' || sessionStorage.getItem('role')== 'employee'){
      this.employeeService.getEmployeeById(this.currentId).subscribe(employeeData=>{
        this.emp = employeeData;
        console.log(this.emp);
      })
    }
    else{
      this.router.navigate(['notFound']);
    }
  }
  PreviousEmp()
  {

  }
  goBack()
  {
    this.location.back();
  }
  nextEmp()
  {

  }
}
