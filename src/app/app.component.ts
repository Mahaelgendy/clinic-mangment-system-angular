import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinic-managment-system';

  ismenuerequired=false;
  isAdmin = false;
  isDoctor = false;
  isEmployee = false;
  isPatient = false;

  role!:string;

  constructor(private router:Router , private authService:AuthenticationService)
  {

  }

  ngDoCheck():void {

    let currenturl= this.router.url;
    if(currenturl=='/login'|| currenturl=='/register')
    {
      this.ismenuerequired=false;
    }
    else
    {
      this.ismenuerequired=true;
    }

  }

  getRole(){
    this.authService.getRole()
    this.role = this.authService.getRole()
    if(this.role=='admin'){
      this.isAdmin = true;
      this.router.navigate(['']);
    }else if(this.role=='doctor'){
      this.isDoctor = true;
      this.router.navigate(['']);
    }else if(this.role=='patient'){
      this.isPatient = true;
      this.router.navigate(['']);
    }else if(this.role=='employee'){
      this.isEmployee = true;
      this.router.navigate(['']);
    }
  }
}
