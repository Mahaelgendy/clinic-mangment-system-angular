import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ClinicModels} from './../Models/clinic-models'

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  baseUrl="http://localhost:8080/clinic/"
  constructor(public http: HttpClient) {
    
  }
  
  getAll() {
    return this.http.get<ClinicModels[]>(this.baseUrl)
  }
  add(clinic: ClinicModels) {
    return this.http.post<ClinicModels>(this.baseUrl, clinic);
  }
  getById(id:number) {
    return this.http.get<ClinicModels>(this.baseUrl+id)
  }
  deleteById(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  edit(clinic: ClinicModels) {
    return this.http.patch(this.baseUrl + clinic._id, clinic);
  }
}
