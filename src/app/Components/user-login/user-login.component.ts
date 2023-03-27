import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  emailRagex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  token:any
  constructor(private builder:FormBuilder,
    private authServices:AuthenticationService,private router:Router)
  {
      sessionStorage.clear();
  }

  loginForm=this.builder.group({
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email,Validators.pattern(this.emailRagex)])),
    password:this.builder.control('',Validators.required)
  })

  getControl(email:any)
  {
    return this.loginForm.get(email);
  }
  proceedLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authServices.login(this.loginForm.value).subscribe((_token) => {
        this.token = _token;
        if (this.token) {
          console.log(this.token)
          sessionStorage.setItem('token', this.token.token);
          sessionStorage.setItem('role', this.token.message);
          this.router.navigate(['']);
        } else {
          // this.toastr.error('Invalid credentials');
        }
      });
    } else {
      // this.toastr.warning('Please enter valid data.');
    }
  }

}

