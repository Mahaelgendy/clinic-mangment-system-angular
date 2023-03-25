import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Doctors } from '../Models/doctors';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  httpOption;
  constructor(private httpClient:HttpClient) {
    this.httpOption= {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:''
      })
    }
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log("An error occured: ", error.error);
    }else{
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(()=> new Error('Something bad happened, Please try again later'));

  }
  getAllDoctors():Observable<Doctors[]>{
    return this.httpClient
    .get<Doctors[]>(`${environment.apiUrl}/doctors`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getDoctorByID(id:number):Observable<Doctors>{
    return this.httpClient
      .get<Doctors>(`${environment.apiUrl}/doctors/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  addDoctor(doctor:Doctors):Observable<Doctors>{
    return this.httpClient
      .post<Doctors>(`${environment.apiUrl}/doctors`,JSON.stringify(doctor),this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateDoctor(id:number, doctor:Doctors){
    return this.httpClient
      .patch<Doctors>(`${environment.apiUrl}/doctors/${id}`,JSON.stringify(doctor), this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteDoctorByID(id:number){
    return this.httpClient
      .delete<Doctors>(`${environment.apiUrl}/doctors/${id}`, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteAllDoctors(){
    return this.httpClient
      .delete<Doctors>(`${environment.apiUrl}/doctors`, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
