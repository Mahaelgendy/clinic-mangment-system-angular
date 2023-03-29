import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOption;
  constructor(private httpClient :HttpClient) {
  this.httpOption={
    headers: new HttpHeaders ({
      'Content-Type':'application/json',
      Autherization:''
    })
  }}

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log("An error occured: ", error.error);
    }else{
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(()=> new Error('Something bad happened, Please try again later'));

  }

  getAllUsers() : Observable<User[]>{
    return this.httpClient
      .get<User[]>(`${environment.apiUrl}/users`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getUserById(id:any):Observable<User>{
    return this.httpClient
    .get<User>(`${environment.apiUrl}/users/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getUserByEmail(userEmail: String):Observable<User[]>{
    const params = new HttpParams().set('email', userEmail.toString());

    return this.httpClient
    .get<User[]>(`${environment.apiUrl}/users`,{params})
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }
  addUser(user :User):Observable<User>{
    return this.httpClient
    .post<User>(`${environment.apiUrl}/users`,JSON.stringify(user), this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updateUser(id : number , updateduser :User){
    return this.httpClient
    .patch<User>(`${environment.apiUrl}/users`,JSON.stringify(updateduser),this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deleteUserById(id:number){
    return this.httpClient
    .delete<User>(`${environment.apiUrl}/users/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  deletAllUsers()
  {
    return this.httpClient
    .delete<User>(`${environment.apiUrl}/users`,this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}
