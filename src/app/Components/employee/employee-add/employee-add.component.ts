import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  emailRagex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  imagePath = 'C:\Users\RadwaElgammal\Desktop\Screenshot 2023-03-10 145725.png';


  constructor(public employeeService:EmployeeService,
   public router:Router,
   public userService:UserService,
    private builder:FormBuilder){

    }

    employeeForm = this.builder.group({
      fullName:this.builder.control('',[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
      password:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(6)])),
      email:this.builder.control(' ',Validators.compose([Validators.required,Validators.email,Validators.pattern(this.emailRagex)])),
      gender:this.builder.control(' '),
      age:this.builder.control(' ',Validators.compose([Validators.required,Validators.min(1),Validators.max(100)])),
      role:this.builder.control('employee'),
      address:this.builder.group({
        city:(''),
        street:(''),
        building:(null)
      }),
      image: this.builder.control(this.imagePath),
      clinicId:this.builder.control(' ',Validators.min(1)),
      salary:this.builder.control(' ',Validators.min(2000)),
      phone:this.builder.control(' ',[Validators.required,Validators.pattern(/^01[0-2,5]\d{8}$/)]),
      position:this.builder.control(' '),
    })

    getControl(fullName:any)
      {
        return this.employeeForm.get(fullName);
      }

      onFileSelected(event: any) {
        if (event.target.files && event.target.files.length) {
          const file = event.target.files[0].name;
          console.log(event.target.files[0]);
          if (file!=null) {
            console.log(event.target.files[0]);

            this.employeeForm.get('image')?.setValue(file);
            console.log(file);
          }
        }
      }
    onSubmit(form:any)
    {
      this.employeeForm.markAllAsTouched();
      if(this.employeeForm.errors)
      {
        return;
      }

      console.log(form.value);
      if(sessionStorage.getItem('role')== 'admin'){
        this.employeeService.add(form.value).subscribe(res=>{
          this.router.navigateByUrl('/employees');
        })
      }
      else{
        this.router.navigate(['notFound']);
      }
    }
}
