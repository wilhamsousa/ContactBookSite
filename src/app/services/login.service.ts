import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:5114';
  private urlLogin = this.baseUrl + "/api/Login/login";

  constructor(private http: HttpClient) { }
  
  getHeaders(){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

  getHeadersWithoutToken(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return headers;
  }

  login(email: string, password: string): Observable<LoginResponse>{
    
    let headers = this.getHeadersWithoutToken();
    let body = 
    {
      "email": email,
      "password": password
    };

    console.log(body)

    let result = this.http.post<any>(this.urlLogin, body, {headers}).pipe(
      catchError(this.handleError)
    );

    return result;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status} Mensagem: ${error.message}`;
    }
    return throwError(() => error);
  }
}
