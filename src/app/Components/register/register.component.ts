import { Component } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
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

  imagePath = 'C:\Users\RadwaElgammal\Desktop\Screenshot 2023-03-10 145725.png';
  constructor(private builder:FormBuilder,
    private authServices:AuthenticationService,private router:Router)
  {

  }

  registerForm= this.builder.group({
    fullName:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.compose([Validators.required])),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    gender:this.builder.control(''),
    age:this.builder.control('',Validators.compose([Validators.required])),
    role:this.builder.control('patient'),
    address:this.builder.group({
      city:['',Validators.required],
      street:['',Validators.required],
      building:['',Validators.required]
    }),
    // image: this.builder.control(this.imagePath),
    isactive:this.builder.control(false)
  });

  // onFileSelected(event: any) {
  //   if (event.target.files && event.target.files.length) {
  //     const file = event.target.files[0].name;
  //     console.log(event.target.files[0]);
  //     if (file!=null) {
  //       console.log(event.target.files[0]);

  //       this.registerForm.get('image')?.setValue(file);
  //       console.log(file);
  //     }
  //   }
  // }
  
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

