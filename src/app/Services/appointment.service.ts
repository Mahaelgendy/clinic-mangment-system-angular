import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Appointment } from '../Models/appointment';

type NewType = Observable<Appointment[]>;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  httpOption;
  constructor(private httpClient: HttpClient) { 
    this.httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:''
      })
    }
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
  getAllAppointments(){
    return this.httpClient
    .get<Appointment[]>(`${environment.apiUrl}/appointments`,this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  getAppointmentById(id:number){
    return this.httpClient
    .get<Appointment>(`${environment.apiUrl}/appointments/${id}`,this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  deleteById(id:number){
    return this.httpClient
    .delete<Appointment>(`${environment.apiUrl}/appointments/${id}`,this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }
  edit(appointment:Appointment){
    return this.httpClient
      .put<Appointment>(`${environment.apiUrl}/appointments/${appointment._id}`,JSON.stringify(appointment),this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  add(appointment:Appointment){
    return this.httpClient
    .post<Appointment>(`${environment.apiUrl}/appointments`,JSON.stringify(appointment),this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }
}
