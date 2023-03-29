import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, pipe, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Invoice } from '../Models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  httpOption;
  constructor(private httpClient:HttpClient) {
      this.httpOption = {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          Authorization:''
        })
      }
   }

   private handlerError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log("An error occured: ", error.error);
    }else{
      console.log(
        `Backend returned code ${error.status}, body was: `,error.error
      );
    }

    return throwError(()=> new Error('Something bad happened, Please try again later'));
   }

   getAllInvoices():Observable<Invoice[]>{
      return this.httpClient
      .get<Invoice[]>(`${environment.apiUrl}/invoice`)
      .pipe(
        retry(2),
        catchError(this.handlerError)
      );
   }

   getInvoiceByID(id:number):Observable<Invoice>{

    console.log("from service")
    console.log(id);
    
    return this.httpClient
    .get<Invoice>(`${environment.apiUrl}/invoice/${id}`)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
   }

  addInvoice(invoice:Invoice):Observable<Invoice>{
    return this.httpClient
      .post<Invoice>(`${environment.apiUrl}/invoice`,JSON.stringify(invoice),this.httpOption)
      .pipe(
        retry(2),
        catchError(this.handlerError)
      );
  }


  updateInvoice(id:number , invoice:Invoice):Observable<Invoice>{
    return this.httpClient
    .patch<Invoice>(`${environment.apiUrl}/invoice/${id}`, JSON.stringify(invoice), this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  deleteInvoiceById(id:number){
    return this.httpClient
    .delete<Invoice>(`${environment.apiUrl}/invoice/${id}`,
    this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    );
  }

  deleteAllInvoices(){
    return this.httpClient
    .delete<Invoice>(`${environment.apiUrl}/invoice`,
    this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handlerError)
    )
  }
}
