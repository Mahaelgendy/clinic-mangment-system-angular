import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, withJsonpSupport } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {Patients} from '../Models/patients'

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
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

  getAllPatients(): Observable<Patients[]>
  {
    return this.httpClient
    .get<Patients[]>(`${environment.apiUrl}/patients`)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }


  getPatientByEmail(patientEmail: String):Observable <Patients>{
    // const params = new HttpParams().set('email', patientEmail.toString());

    return this.httpClient
    .get<Patients>(`${environment.apiUrl}/patients/email/${patientEmail}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  getPatientByID(patientID:number |undefined):Observable <Patients>
  {
    if(patientID == undefined) patientID=-1;
    return this.httpClient
    .get<Patients>(`${environment.apiUrl}/patients/${patientID}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

  getPatientByName(fullName:string):Observable<Patients>{
    console.log("From get");
    console.log(fullName);

    return this.httpClient
      .get<Patients>(`${environment.apiUrl}/patients/fullName/${fullName}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  addPatient(newPatient:Patients): Observable <Patients>
  {
    return this.httpClient
      .post<Patients>(`${environment.apiUrl}/patients`,JSON.stringify(newPatient),this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
        );
  }

  updatePatient(patientID:number, updatedPatint:Patients)
  {
      return this.httpClient
      .patch<Patients>(`${environment.apiUrl}/patients/${patientID}`,JSON.stringify(updatedPatint),this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deletePatientByID(patientID:number |undefined)
  {
    if(patientID == undefined) patientID = -1;
      return this.httpClient
      .delete<Patients>(`${environment.apiUrl}/patients/${patientID}`,this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
        );
  }

  deleteAllPatients()
  {
    return this.httpClient
    .delete<Patients>(`${environment.apiUrl}/patients`,this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
      );
  }

}
