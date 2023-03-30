import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import {JwtHelperService} from '@auth0/angular-jwt'
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: any;
  decodedToken: any;
  helper = new JwtHelperService();
  constructor(private htttpClint:HttpClient) { }

  login(userLogin:any)
  {
      return this.htttpClint.post(`${environment.apiUrl}/login`,userLogin)
  }
  
  isUserlogged()
  {
     return sessionStorage.getItem('token') != null;
  }
  getRole() {
    this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
    this.decodedToken = this.helper.decodeToken(this.token);
    return this.decodedToken.role;

  }
  getEmail() {
    this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
    this.decodedToken = this.helper.decodeToken(this.token);
    return this.decodedToken.email;
  }
  getId(token : any) {
    this.decodedToken = this.helper.decodeToken(token);
    console.log(this.decodedToken)
    return this.decodedToken.id;
  }
  getToken(){

    return this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
  }
  register(inputData:any)
  {
    console.log(inputData)
    return this.htttpClint.post<User>(`${environment.apiUrl}/signUp`,inputData)
  }
  
}
