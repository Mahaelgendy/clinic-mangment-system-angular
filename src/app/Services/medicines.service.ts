import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicines } from '../Models/medicines';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {
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
    if(error.status ===0){
      console.log("An error occured : ", error.error);
    }else{
      console.error(`Bachend returned code ${error.status},  body was : `, error.error);
    }
    return throwError(()=> new Error(`Something bad happened, please try again later`));
  }

  getAllMedicines() : Observable<Medicines[]>
  {
    return this.httpClinet
      .get<Medicines[]>(`${environment.apiUrl}/medicines`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getMedicinesById(id:number): Observable<Medicines>{
    return this.httpClinet
    .get<Medicines>(`${environment.apiUrl}/medicines/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  addMedicines(medicine :Medicines): Observable<Medicines>{
    return this.httpClinet
    .post<Medicines>(`${environment.apiUrl}/medicines`,JSON.stringify(medicine),this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updateMedicines(id:number , updatedMedicines:Medicines){
    return this.httpClinet
    .patch<Medicines>(`${environment.apiUrl}/medicines`,JSON.stringify(updatedMedicines),this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deleteMedicinesByID(id:number){
    return this.httpClinet
    .delete<Medicines>(`${environment.apiUrl}/medicines/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deleteAllMedicines()
  {
    return this.httpClinet
    .delete<Medicines>(`${environment.apiUrl}/medicines`, this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
