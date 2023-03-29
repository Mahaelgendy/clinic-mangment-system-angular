import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Service } from '../Models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
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

  getAll():Observable<Service[]>{
    return this.httpClient
    .get<Service[]>(`${environment.apiUrl}/service`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

 getById(id:number):Observable<Service>{
    return this.httpClient
      .get<Service>(`http://localhost:8080/service/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  add(service:Service):Observable<Service>{
    return this.httpClient
      .post<Service>(`${environment.apiUrl}/service`,JSON.stringify(service),this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  edit( service:Service){
    return this.httpClient
      .patch<Service>(`${environment.apiUrl}/service/${service._id}`,JSON.stringify(service), this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteById(id:number){
    return this.httpClient
      .delete<Service>(`${environment.apiUrl}/service/${id}`, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // baseUrl = "http://localhost:8080/service/";

  // constructor(public http: HttpClient) { }

  // getAll() {
  //   return this.http.get<Service[]>(this.baseUrl)
  // }

  // add(service:Service) {
  //   return this.http.post<Service>(this.baseUrl, service);
  // }

  // getById(id:number) {
  //   return this.http.get<Service>(this.baseUrl + id);
  // }

  // deleteById(id: number) {
  //   return this.http.delete(this.baseUrl + id);
  // }

  // edit(service: Service) {
  //   return this.http.patch(this.baseUrl + service._id, service);
  // }
}
