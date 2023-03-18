import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../Models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl = "http://localhost:8080/service/";

  constructor(public http: HttpClient) { }

  getAll() {
    return this.http.get<Service[]>(this.baseUrl)
  }

  add(service:Service) {
    return this.http.post<Service>(this.baseUrl, service);
  }

  getById(id:number) {
    return this.http.get<Service>(this.baseUrl + id);
  }

  deleteById(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  edit(service: Service) {
    return this.http.patch(this.baseUrl + service._id, service);
  }
}
