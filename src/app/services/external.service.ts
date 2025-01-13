import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViaCepResponse } from '../interfaces/viaCep';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  private baseUrl = 'http://localhost:5114';
  private urlViaCep = this.baseUrl + "/api/External/ViaCep";

  constructor(private http: HttpClient) { }

  getHeaders(){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

  getCep(cep: string): Observable<ViaCepResponse>{
    
    const headers = this.getHeaders();
    const result = this.http.get<ViaCepResponse>(`${this.urlViaCep}/${cep}`, {headers});
    return result;
  }
}
