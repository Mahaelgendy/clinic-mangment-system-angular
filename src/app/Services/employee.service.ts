import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  httpOption;

  constructor(private httpClient:HttpClient) {
    this.httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:''
      })
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getAllEmployees():Observable<Employee[]>{
    return this.httpClient
    .get<Employee[]>(`${environment.apiUrl}/employees`,this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  getEmployeeById(id:number){
    console.log(`from emp get by id`)
    return this.httpClient
    .get<Employee>(`${environment.apiUrl}/employees/${id}`,this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  getEmployeeByName(name:string):Observable<Employee>{
    const fullName = new HttpParams().set('fullName', name);
    return this.httpClient
      .get<Employee>(`${environment.apiUrl}/employees/fullName/:${fullName}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteById(id:number){
    return this.httpClient
    .delete<Employee>(`${environment.apiUrl}/employees/${id}`,this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  edit(employee:Employee){
    return this.httpClient
      .patch<Employee>(`${environment.apiUrl}/employees/${employee._id}`,JSON.stringify(employee),this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  add(employee:Employee){
    return this.httpClient
    .post<Employee>(`${environment.apiUrl}/employees`,JSON.stringify(employee),this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }
}
