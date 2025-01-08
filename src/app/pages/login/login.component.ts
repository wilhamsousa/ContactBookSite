import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../interfaces/login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string;
  password: string;
  loginResponse: LoginResponse;
  errorMessage: string;

  constructor(
    private route: Router,
    private loginService: LoginService){
    console.log("constructor");
  }

  login(){
    console.log(this.email);
    console.log(this.password);
    this.loginService.login(this.email, this.password).subscribe(
      data => {
          this.loginResponse = data;
          sessionStorage.setItem("email", this.email);
          sessionStorage.setItem("userName", data.userName);
          sessionStorage.setItem("token", data.accessToken);
          this.route.navigate(["home"]);
      },
      ex => {
        this.errorMessage = ex.error.detail;
      }
    );    
  }
}
