import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = environment.baseUrl;
  private urlGetAll = this.baseUrl + "/api/Contact/getall";
  private urlPersist = this.baseUrl + "/api/Contact";

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
    
    const headers = this.getHeaders();
    const result = this.http.get<any[]>(this.urlGetAll, {headers});
    return result;
  }

  addContact(contact: Contact): Observable<any[]>{   
    const headers = this.getHeaders(); 
    const result = this.http.post<any[]>(this.urlPersist, contact, {headers});
    return result;
  }

  updateContact(contact: Contact): Observable<any[]>{
    const headers = this.getHeaders(); 
    let result = this.http.patch<any[]>(`${this.urlPersist}/${contact.id}`, contact, {headers});
    return result;
  }

  deleteContact(id: string): Observable<any[]>{
    const headers = this.getHeaders(); 
    let result = this.http.delete<any[]>(`${this.urlPersist}/${id}`, {headers});
    return result;
  }
}
