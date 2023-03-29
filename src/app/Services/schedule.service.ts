
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Schedules } from '../Models/schedules';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

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

  getAllSchedules():Observable<Schedules[]>{
    return this.httpClient
    .get<Schedules[]>(`${environment.apiUrl}/schedule`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getScheduleByID(id:number):Observable<Schedules>{
    return this.httpClient
      .get<Schedules>(`${environment.apiUrl}/schedule/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  addSchedule(schedule:Schedules):Observable<Schedules>{
    return this.httpClient
      .post<Schedules>(`${environment.apiUrl}/schedule`,JSON.stringify(schedule),this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getbyQueryString(queryParam: string){
    const url = `${environment.apiUrl}/schedule?${queryParam}`;
    return this.httpClient
      .get<Schedules[]>(url, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateSchedule(schedule:Schedules){
    // console.log("***")
    // console.log(schedule)
    return this.httpClient
      .patch<Schedules>(`${environment.apiUrl}/schedule/${schedule._id}`,JSON.stringify(schedule), this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteScheduleByID(id:number){
    return this.httpClient
      .delete<Schedules>(`${environment.apiUrl}/schedule/${id}`, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteAllSchedules(){
    return this.httpClient
      .delete<Schedules>(`${environment.apiUrl}/schedule`, this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
