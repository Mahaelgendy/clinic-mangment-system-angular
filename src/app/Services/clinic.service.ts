import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClinicModels } from './../Models/clinic-models'

import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  httpOption;
  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: ''
      })
    }
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log("An error occured: ", error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened, Please try again later'));
  }

  getAll():Observable<ClinicModels[]>{
    return this.httpClient
    .get<ClinicModels[]>(`${environment.apiUrl}/clinic`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getById(id:number):Observable<ClinicModels>{
    return this.httpClient
      .get<ClinicModels>(`http://localhost:8080/clinic/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  add(clinic:ClinicModels):Observable<ClinicModels>{
    return this.httpClient
      .post<ClinicModels>(`${environment.apiUrl}/clinic`,JSON.stringify(clinic),this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  edit( clinic:ClinicModels){
    return this.httpClient
      .patch<ClinicModels>(`${environment.apiUrl}/clinic/${clinic._id}`,JSON.stringify(clinic), this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteById(id:number){
    return this.httpClient
      .delete<ClinicModels>(`${environment.apiUrl}/clinic/${id}`, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

 
}

 // baseUrl="http://localhost:8080/clinic/"
  // constructor(public http: HttpClient) {
    
  // }

 // getAll() {
  //   return this.http.get<ClinicModels[]>(this.baseUrl)
  // }

  
  // add(clinic: ClinicModels) {
  //   return this.http.post<ClinicModels>(this.baseUrl, clinic);
  // }
  // getById(id:number) {
  //   return this.http.get<ClinicModels>(this.baseUrl+id)
  // }
  // deleteById(id: number) {
  //   return this.http.delete(this.baseUrl + id);
  // }

  // edit(clinic: ClinicModels) {
  //   return this.http.patch(this.baseUrl + clinic._id, clinic);
  // }