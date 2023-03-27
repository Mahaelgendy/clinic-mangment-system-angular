import { Component } from '@angular/core';
import {AbstractControl, FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
// import {ToastrService} from 'ngx-toastr'
import { Address } from 'src/app/Models/address';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailRagex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  imagePath = 'C:\Users\RadwaElgammal\Desktop\Screenshot 2023-03-10 145725.png';
  constructor(private builder:FormBuilder,
    private authServices:AuthenticationService,private router:Router)
  {

  }

  registerForm= this.builder.group({
    fullName:this.builder.control('',[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(10)])),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email,Validators.pattern(this.emailRagex)])),
    gender:this.builder.control(''),
    age:this.builder.control('',Validators.compose([Validators.required,Validators.min(1),Validators.max(100)])),
    role:this.builder.control('patient'),
    address:this.builder.group({
      city:['',Validators.required,Validators.maxLength(10),Validators.minLength(4)],
      street:['',Validators.required,Validators.maxLength(10),Validators.minLength(4)],
      building:['' ,Validators.min(1)]
    }),
    image: this.builder.control(this.imagePath),
    isactive:this.builder.control(false)
  });

  getControl(fullName:any): AbstractControl |null
  {
    return this.registerForm.get(fullName);
  }
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0].name;
      console.log(event.target.files[0]);
      if (file!=null) {
        console.log(event.target.files[0]);

        this.registerForm.get('image')?.setValue(file);
        console.log(file);
      }
    }
  }
  proceedRegisteration() {
    this.registerForm.markAllAsTouched();


    if (this.registerForm.errors) {
      // this.toastr.warning('Please enter valid data');
      return;
    }

    if (this.registerForm.valid) {
      this.authServices.register(this.registerForm.value).subscribe(res => {
        // this.toastr.success('Registered Successfully')
        this.router.navigate(['login'])
      });
    } else {
      // this.toastr.warning('Please enter valid data');
    }
  }
}
function get(arg0: string) {
  throw new Error('Function not implemented.');
}

