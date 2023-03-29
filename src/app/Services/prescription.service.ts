import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prescription } from '../Models/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  httpOption ;
  constructor(
    private httpClinet : HttpClient
  ) { 
    this.httpOption={
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        Autherization:''
      })
    }
  }
  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log("An error occured : ", error.error);
    }else{
      console.error(`Bachend returned code ${error.status},  body was : `, error.error);
    }
    return throwError(()=> new Error(`Something bad happened, please try again later`));
  }

  getAllPrescription() : Observable<Prescription[]>
  {
    return this.httpClinet
      .get<Prescription[]>(`${environment.apiUrl}/prescriptions`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  getPrescriptionById(prescriptionId:number |undefined): Observable<Prescription>{
    if(prescriptionId == undefined ) prescriptionId ==-1;
    return this.httpClinet
    .get<Prescription>(`${environment.apiUrl}/prescriptions/${prescriptionId}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  
  addPrescription(prescription :Prescription): Observable<Prescription>{
    return this.httpClinet
    .post<Prescription>(`${environment.apiUrl}/prescriptions`,JSON.stringify(prescription),this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updatePrescription(id:number |undefined , updatedPrescription:Prescription){
    if(id == undefined ) id =-1;
    return this.httpClinet
    .patch<Prescription>(`${environment.apiUrl}/prescriptions/${id}`,JSON.stringify(updatedPrescription),this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deletePrescriptionByID(id:number){
    if(id == undefined) id =-1;
    return this.httpClinet
    .delete<Prescription>(`${environment.apiUrl}/prescriptions/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deleteAllPrescription()
  {
    return this.httpClinet
    .delete<Prescription>(`${environment.apiUrl}/prescriptions`, this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

}
