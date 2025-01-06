import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:5114';
  private urlGetAll = this.baseUrl + "/api/Contact/getall";
  private urlCreate = this.baseUrl + "/api/Contact/create";
  private urldelete = this.baseUrl + "/api/Contact";

  constructor(private http: HttpClient) { }
  
  getHeaders(){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

  getAllContacts(): Observable<any[]>{
    
    let headers = this.getHeaders();
    let result = this.http.get<any[]>(this.urlGetAll, {headers});
    console.log(result);
    return result;
  }

  addContact(contact: Contact): Observable<any[]>{    
    let result = this.http.post<any[]>(this.urlCreate, contact);
    console.log(result);
    return result;
  }

  updateContact(contact: Contact): Observable<any[]>{
    let result = this.http.post<any[]>(this.urlCreate, contact);
    console.log(result);
    return result;
  }

  deleteContact(id: string): Observable<any[]>{
    let result = this.http.delete<any[]>(this.urlCreate + "/" + id);
    console.log(result);
    return result;
  }
}
