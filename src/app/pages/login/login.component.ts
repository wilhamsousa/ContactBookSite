import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../interfaces/login'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loadingDialogRef: any;
  formLogin: FormGroup;
  loginResponse: LoginResponse;
  errorMessage: string;

  constructor(
    private route: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService){
  }

  ngOnInit(){
    this.buildForm();
  }

  onInputChange(){
    this.errorMessage = "";
  }

  buildForm(){
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$') ]]
    });
  }

  login(){
    const loginDTO = this.formLogin.getRawValue();
    this.loadingDialogRef = this.loadingService.open();
    this.loginService.login(loginDTO.email, loginDTO.password).subscribe({
      next: (data) => {
          this.loginResponse = data;
          sessionStorage.setItem("email", loginDTO.email);
          sessionStorage.setItem("userName", data.userName);
          sessionStorage.setItem("token", data.accessToken);
          this.route.navigate(["home"]);
      },
      complete: () => {
        this.loadingService.close(this.loadingDialogRef);
      },
      error: (err: any) => {
        this.errorMessage = err.error.detail;
        this.loadingService.close(this.loadingDialogRef);
      }
    });    
  }
}