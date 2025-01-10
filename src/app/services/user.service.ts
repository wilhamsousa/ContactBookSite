import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5114';
  private urlPersist = this.baseUrl + "/api/User";

  constructor(private http: HttpClient) { }
  
  getHeaders(){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

  addUser(user: User): Observable<any[]>{   
    const headers = this.getHeaders(); 
    const result = this.http.post<any[]>(this.urlPersist, user, {headers});
    return result;
  }

  updateUser(user: User): Observable<any[]>{
    const headers = this.getHeaders(); 
    let result = this.http.patch<any[]>(`${this.urlPersist}/${user.id}`, user, {headers});
    return result;
  }

  deleteUser(): Observable<any[]>{
    const headers = this.getHeaders(); 
    let result = this.http.delete<any[]>(this.urlPersist, {headers});
    return result;
  }
}