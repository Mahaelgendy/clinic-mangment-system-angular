import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService:AuthenticationService,private router :Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authenticationService.isUserlogged())
      {
        if(route.url.length>0){
          let menu = document.location.pathname;
          if(
            ( menu == '/employees'||
              menu == '/patients' ||
              menu == '/doctor/add'||
              menu == '/employees/add'||
              menu == '/doctor/edit/:id'
            )&& this.authenticationService.getRole() == 'admin'
          ){
            return true
          }
          else if (
            (menu =='/employees' ||menu == '/employee/details/:id'
            )&& this.authenticationService.getRole() =='employee'
          ){
            return true
          }
          else if (
            (menu == '/doctor' || menu == 'doctor/details/:id'
            )&& this.authenticationService.getRole () == 'doctor'
            ){
              return true;
          }
          else if (
            (menu == '/patient' || menu =='patient/details/:id'
            ) && this.authenticationService.getRole() == 'patient'
          ){
            return true
          }
          else
          {
            return true;
          }

        }
        else{
          return true;
        }

      }
      else
      {
        this.router.navigate(['login']);
        return false;
      }
  }

}
