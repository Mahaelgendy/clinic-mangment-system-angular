import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Address } from 'src/app/Models/address';
import { Employee } from 'src/app/Models/employee';
import { Role } from 'src/app/Models/Enums';
import { User } from 'src/app/Models/user';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent {

  imagePath = 'C:\Users\RadwaElgammal\Desktop\Screenshot 2023-03-10 145725.png';
  EmployeeForm!:FormGroup;
  employee?:Employee;
  employeeId?:any;
  user!:User;
  updatedEmployeeform!: FormGroup;
  EmployeeforUpdate!: Employee;
  EmployeeAfterUpdate !:Employee;
 
  Employeeform: any;

  constructor(public employeeService:EmployeeService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public userService:UserService,
    private builder:FormBuilder){



      this.EmployeeForm = new FormGroup({
        fullName: new FormControl('',[Validators.required, Validators.pattern(`${/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/}`)]  ),
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(`${/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}`)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        age: new FormControl(null, Validators.required),
        city: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        building: new FormControl(null, Validators.required),
        clinicId: new FormControl(null, Validators.required),
        salary: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        position: new FormControl('', Validators.required),
        gender: new FormControl(null, Validators.required),
        role: new FormControl(Role.employee),
        _id:new FormControl(0)
      });

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: { [x: string]: number; })=>{
      this.employeeId = data['id'];
      this.employeeService.getEmployeeById(data['id']).subscribe(data=>{
        this.employee = data;

        this.EmployeeForm.patchValue({
          fullName: data.employeeData.fullName,
          email: data.employeeData.email,
          password: data.employeeData.password,
          age: data.employeeData.age ,
          city: data.employeeData.address?.city ,
          street: data.employeeData.address?.street || '',
          building: data.employeeData.address?.building,
          gender: data.employeeData?.gender || '',
          role: Role.employee,
          clinicId:data.clinicId,
          salary:data.salary,
          position:data.position,
          phone:data.phone,
          _id:data.employeeData._id,
        });

      })
    })
  }

  onSubmit(){


    if(this.employeeId!=undefined){

      this.EmployeeForm.markAllAsTouched();
      if(this.EmployeeForm.errors){
        return;
      }

      const user = new User(
        this.EmployeeForm.value.fullName,
        this.EmployeeForm.value.password,
        this.EmployeeForm.value.email,
        this.EmployeeForm.value.age,
        new Address(this.EmployeeForm.value.city, this.EmployeeForm.value.street, this.EmployeeForm.value.building),
        this.EmployeeForm.value.gender,
        Role.employee,
      );

      const employee = new Employee(
        user,
        this.EmployeeForm.value.clinicId,
        this.EmployeeForm.value.salary,
        this.EmployeeForm.value.phone,
        this.EmployeeForm.value.position,
        this.EmployeeForm.value._id,
      )
      console.log(this.employee);
      this.employeeService.edit(this.employeeId,employee).subscribe(result => {
          console.log(result);
          this.router.navigate(['./'], {skipLocationChange:true}).then(()=>{
          this.router.navigate(['/employees']);
        })
      });
    }
  }

}
