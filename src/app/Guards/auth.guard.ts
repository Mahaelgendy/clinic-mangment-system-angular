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
              menu == '/employees/add'||
              menu == '/employees/update/:id'||
              menu == '/employees/:id'||
              menu == '/patients' ||
              menu == '/patients/profile/:id' ||
              menu == '/patients/details/:id' ||
              menu == '/patients/update/:id' ||
              menu == '/patients/add' ||
              menu == '/doctors'||
              menu == '/doctors/add'||
              menu == '/doctors/details/:id'||
              menu == '/doctors/edit/:id'||
              menu == '/clinics'||
              menu == '/clinics/add'||
              menu == '/clinics/details/:id'||
              menu == '/invoice'||
              menu == '/invoice/add'||
              menu == '/medicine'||
              menu == '/medicine/add'||
              menu == '/medicine/edit/:id'||
              menu == '/medicine/details/:id'||
              menu == '/prescriptions'||
              menu == '/prescriptions/details/:id'||
              menu == '/prescriptions/add'||
              menu == '/prescriptions/update/:id'||
              menu == '/schedules'||
              menu == '/schedules/add'||
              menu == '/schedules/update/:id'||
              menu == '/services'||
              menu == '/services/add'||
              menu == '/services/edit/:id'||
              menu == '/appointment'||
              menu == '/appointment/edit/:id'||
              menu == '/appointment/detailsAppointment/:id'
            )&& this.authenticationService.getRole() == 'admin'
          ){
            return true
          }
          else if (
            (menu =='/employees' ||menu == '/employee/details/:id' || menu=='/employees/:id'|| menu=='/employees/update/:id' || menu== '/invoice' || menu == '/invoice/add' || menu == '/services'
            )&& this.authenticationService.getRole() =='employee'
          ){
            return true
          }
          else if (
            (
            menu == 'doctors/profile/:id'||
            menu == '/medicine'||
            menu == '/medicine/add'||
            menu == '/medicine/edit/:id'||
            menu == '/medicine/details/:id'||
            menu == '/patients' ||
            menu == '/patients/profile/:id' ||
            menu == '/patients/details/:id' ||
            menu == '/patients/update/:id' ||
            menu == '/patients/add' ||
            menu == '/prescriptions'||
            menu == '/prescriptions/details/:id'||
            menu == '/prescriptions/add'||
            menu == '/prescriptions/update/:id'||
            menu == '/schedules'||
            menu == '/schedules/add'||
            menu == '/schedules/update/:id'
            )&& this.authenticationService.getRole () == 'doctor'
            ){
              return true;
          }
          else if (
            (
            menu =='patient/details/:id'||
            menu == '/prescriptions'||
            menu == '/prescriptions/details/:id'
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
