import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private snackBar: MatSnackBar){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        console.log(error.error)
        if (error.error.detail) {
          // Erro do lado do cliente
          errorMessage = `Erro: ${error.error.detail}`;
          this.snackBar.open(errorMessage, 'Fechar', { duration: 5000, });
        } else {
          // Erro do lado do servidor
          errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
          this.snackBar.open("Ocorreu um erro de comunicação com o servidor.", 'Fechar', { duration: 5000, });
        }
        return throwError(() => error);
      })
    );
  }
}
